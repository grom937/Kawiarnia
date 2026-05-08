CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  category_order INTEGER NOT NULL DEFAULT 99,
  description TEXT NOT NULL,
  price REAL NOT NULL,
  image_url TEXT NOT NULL,
  image_alt TEXT NOT NULL,
  is_bestseller INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO products (id, name, category, category_order, description, price, image_url, image_alt, is_bestseller) VALUES
(1, 'Espresso', 'Kawa', 1, 'Intensywna, klasyczna kawa na bazie świeżo mielonych ziaren.', 9, 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&q=80&w=800&h=600', 'Mała filiżanka espresso', 0),
(2, 'Americano', 'Kawa', 1, 'Delikatniejsza czarna kawa z dodatkiem gorącej wody.', 11, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800&h=600', 'Czarna kawa w filiżance', 0),
(3, 'Cappuccino', 'Kawa', 1, 'Klasyczne espresso z idealnie spienionym mlekiem.', 14, 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=800&h=600', 'Cappuccino w filiżance z kremową pianką', 1),
(4, 'Latte', 'Kawa', 1, 'Łagodna kawa mleczna z aksamitną pianką.', 16, 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800&h=600', 'Latte w szklance', 0),
(5, 'Croissant maślany', 'Na słodko', 2, 'Chrupiący wypiek z delikatnym, maślanym wnętrzem.', 10, 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800&h=600', 'Croissant maślany na talerzu', 0),
(6, 'Sernik pistacjowy', 'Na słodko', 2, 'Kremowy deser o delikatnym smaku i chrupiącym spodzie.', 18, 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=800&h=600', 'Kawałek sernika pistacjowego na talerzu', 1),
(7, 'Brownie', 'Na słodko', 2, 'Wilgotne ciasto czekoladowe z intensywnym kakao.', 15, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800&h=600', 'Kawałek brownie na talerzu', 0),
(8, 'Tarta dnia', 'Na słodko', 2, 'Codziennie inny wypiek z sezonowymi owocami.', 17, 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&q=80&w=800&h=600', 'Owocowa tarta dnia', 0),
(9, 'Lemoniada sezonowa', 'Napoje', 3, 'Lekka, orzeźwiająca i przygotowywana z naturalnych składników.', 13, 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800&h=600', 'Szklanka sezonowej lemoniady z lodem i cytryną', 1),
(10, 'Herbata zimowa', 'Napoje', 3, 'Rozgrzewający napar z cytrusami, goździkami i miodem.', 14, 'https://images.unsplash.com/photo-1547825407-2d060104b7f8?auto=format&fit=crop&q=80&w=800&h=600', 'Herbata z cytrusami w szklance', 0);
