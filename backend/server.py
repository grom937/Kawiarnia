from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse, parse_qs
import json
import sqlite3

BASE_DIR = Path(__file__).resolve().parent.parent
BACKEND_DIR = Path(__file__).resolve().parent
DB_PATH = BACKEND_DIR / "mokka.sqlite"
INIT_SQL_PATH = BACKEND_DIR / "init_db.sql"
HOST = "localhost"
PORT = 8000


def get_connection():
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def init_database():
    with get_connection() as connection:
        sql = INIT_SQL_PATH.read_text(encoding="utf-8")
        connection.executescript(sql)
        connection.commit()


def row_to_dict(row):
    item = dict(row)
    item["is_bestseller"] = bool(item["is_bestseller"])
    return item


class MokkaRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(BASE_DIR), **kwargs)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def do_GET(self):
        parsed_url = urlparse(self.path)

        if parsed_url.path == "/api/products":
            self.handle_get_products(parsed_url)
            return

        if parsed_url.path == "/api/health":
            self.send_json({"status": "ok", "database": str(DB_PATH.name)})
            return

        super().do_GET()

    def do_POST(self):
        parsed_url = urlparse(self.path)

        if parsed_url.path == "/api/contact":
            self.handle_contact_message()
            return

        self.send_error(404, "Endpoint not found")

    def handle_get_products(self, parsed_url):
        query = parse_qs(parsed_url.query)
        category = query.get("category", [None])[0]
        bestseller = query.get("bestseller", [None])[0]

        sql = "SELECT * FROM products"
        params = []
        conditions = []

        if category:
            conditions.append("category = ?")
            params.append(category)

        if bestseller in {"1", "true", "yes"}:
            conditions.append("is_bestseller = 1")

        if conditions:
            sql += " WHERE " + " AND ".join(conditions)

        sql += " ORDER BY category_order, name"

        with get_connection() as connection:
            rows = connection.execute(sql, params).fetchall()

        self.send_json([row_to_dict(row) for row in rows])

    def handle_contact_message(self):
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            payload = json.loads(self.rfile.read(content_length).decode("utf-8"))
        except (ValueError, json.JSONDecodeError):
            self.send_json({"error": "Niepoprawny format JSON."}, status=400)
            return

        name = str(payload.get("name", "")).strip()
        email = str(payload.get("email", "")).strip()
        message = str(payload.get("message", "")).strip()

        if not name or not email or not message:
            self.send_json({"error": "Pola name, email i message są wymagane."}, status=400)
            return

        with get_connection() as connection:
            cursor = connection.execute(
                "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)",
                (name, email, message),
            )
            connection.commit()

        self.send_json({"status": "saved", "id": cursor.lastrowid}, status=201)

    def send_json(self, data, status=200):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


if __name__ == "__main__":
    init_database()
    server = ThreadingHTTPServer((HOST, PORT), MokkaRequestHandler)
    print(f"Serwer działa: http://{HOST}:{PORT}")
    print(f"API produktów: http://{HOST}:{PORT}/api/products")
    server.serve_forever()
