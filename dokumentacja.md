# Dokumentacja projektu — Mokka

## Opis projektu
Projekt „Mokka” to responsywna strona internetowa typu one-page dla małej kawiarni. Strona prezentuje podstawowe informacje o marce, ofercie, bestsellerach oraz dane kontaktowe. Projekt został rozszerzony o backend, bazę danych SQLite i komunikację z API.

## Struktura folderów projektu
- `index.html` — główny plik strony
- `styles.css` — plik ze stylami
- `script.js` — logika JavaScript, pobieranie danych z API i renderowanie elementów
- `backend/server.py` — serwer HTTP, endpointy API i obsługa bazy danych
- `backend/init_db.sql` — skrypt tworzący tabele i dodający dane startowe
- `backend/mokka.sqlite` — plik bazy danych tworzony automatycznie po uruchomieniu serwera

## Backend
Backend został napisany w Pythonie z użyciem wbudowanych modułów:
- `http.server` do obsługi zapytań HTTP,
- `sqlite3` do komunikacji z bazą danych,
- `json` do zwracania odpowiedzi w formacie JSON.

Serwer obsługuje pliki statyczne frontendu oraz endpointy API.

## Baza danych
Projekt korzysta z SQLite. Baza zawiera tabelę `products` z 10 rekordami oraz tabelę `contact_messages` do zapisywania wiadomości z formularza.

Najważniejsze pola tabeli `products`:
- `id`
- `name`
- `category`
- `description`
- `price`
- `image_url`
- `image_alt`
- `is_bestseller`

## Endpointy API
### `GET /api/products`
Pobiera produkty z bazy danych i zwraca je jako JSON.

Obsługiwane parametry:
- `bestseller=1` — zwraca tylko bestsellery,
- `category=Kawa` — zwraca produkty z wybranej kategorii.

### `POST /api/contact`
Zapisuje wiadomość z formularza kontaktowego w bazie danych.

## Integracja frontend–backend
Frontend wykorzystuje `fetch()` w pliku `script.js`:
1. wysyła zapytanie HTTP do `/api/products`,
2. odbiera dane JSON,
3. renderuje sekcję „Nasze bestsellery”,
4. renderuje sekcję „Menu” z podziałem na kategorie.

Formularz kontaktowy wysyła dane metodą `POST` do `/api/contact`.

## Instrukcja uruchomienia
1. Wejdź do folderu projektu:
   ```bash
   cd mokka-project
   ```
2. Uruchom serwer:
   ```bash
   python backend/server.py
   ```
   lub:
   ```bash
   python3 backend/server.py
   ```
3. Otwórz w przeglądarce:
   ```text
   http://localhost:8000
   ```
4. Sprawdź API:
   ```text
   http://localhost:8000/api/products
   ```
