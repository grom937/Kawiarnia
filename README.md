# Mokka — strona dynamiczna z backendem

## Opis projektu
Mokka to responsywna, jednopodstronowa strona internetowa dla małej kawiarni. Projekt został rozszerzony o prosty backend, bazę danych SQLite oraz komunikację frontend–backend.

Frontend pobiera listę produktów z endpointu API i dynamicznie wyświetla bestsellery oraz menu na stronie. Formularz kontaktowy zapisuje wiadomości w bazie danych.

## Technologie
- HTML5
- CSS3
- JavaScript `fetch()`
- Python 3
- SQLite

## Funkcjonalności
- responsywny układ strony one-page,
- mobilne menu typu hamburger,
- backend HTTP w Pythonie,
- baza danych SQLite,
- endpoint API zwracający dane JSON,
- dynamiczne renderowanie bestsellerów i menu z bazy danych,
- zapis wiadomości z formularza kontaktowego w bazie danych.

## Struktura projektu
```text
mokka-project/
├── backend/
│   ├── init_db.sql      # struktura i dane startowe bazy
│   └── server.py        # serwer HTTP + API + SQLite
├── index.html           # główny plik strony
├── script.js            # logika frontendu i komunikacja z API
├── styles.css           # style strony
├── dokumentacja.md
├── analiza-ux.md
└── README.md
```

## Endpointy API
### `GET /api/products`
Zwraca listę produktów z bazy danych w formacie JSON.

Przykład odpowiedzi:
```json
[
  {
    "id": 3,
    "name": "Cappuccino",
    "category": "Kawa",
    "price": 14,
    "is_bestseller": true
  }
]
```

Dodatkowe filtry:
- `GET /api/products?bestseller=1`
- `GET /api/products?category=Kawa`

### `POST /api/contact`
Zapisuje wiadomość z formularza kontaktowego w tabeli `contact_messages`.

## Uruchomienie projektu
1. Upewnij się, że masz zainstalowany Python 3.
2. Wejdź do folderu projektu:
   ```bash
   cd mokka-project
   ```
3. Uruchom backend:
   ```bash
   python backend/server.py
   ```
   W systemach, gdzie polecenie `python` wskazuje na starszą wersję, użyj:
   ```bash
   python3 backend/server.py
   ```
4. Otwórz stronę w przeglądarce:
   ```text
   http://localhost:8000
   ```
5. Endpoint API jest dostępny pod adresem:
   ```text
   http://localhost:8000/api/products
   ```

## Baza danych
Baza danych SQLite tworzy się automatycznie przy pierwszym uruchomieniu serwera jako plik:

```text
backend/mokka.sqlite
```

Plik `backend/init_db.sql` zawiera strukturę tabel i 10 rekordów startowych dla menu kawiarni.

## Uwagi
Strony nie należy uruchamiać przez bezpośrednie otwarcie pliku `index.html`, ponieważ wtedy przeglądarka nie połączy się poprawnie z endpointami API. Należy korzystać z adresu `http://localhost:8000` po uruchomieniu backendu.
"# Kawiarnia" 
