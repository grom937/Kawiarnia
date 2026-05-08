const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const form = document.querySelector('.contact-form');
const formNote = document.querySelector('.form-note');
const bestsellersList = document.querySelector('#bestsellers-list');
const menuList = document.querySelector('#menu-list');
const API_PRODUCTS_URL = '/api/products';
const API_CONTACT_URL = '/api/contact';

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('is-open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('is-open');
    });
  });
}

const formatPrice = (price) => `${Number(price).toFixed(0)} zł`;

const escapeHTML = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

function createProductCard(product) {
  return `
    <article class="product-card">
      <img src="${escapeHTML(product.image_url)}" alt="${escapeHTML(product.image_alt)}" width="360" height="260">
      <div class="product-content">
        <div class="product-topline">
          <h3>${escapeHTML(product.name)}</h3>
          <p class="price">${formatPrice(product.price)}</p>
        </div>
        <p>${escapeHTML(product.description)}</p>
        <a class="button button-tertiary" href="#menu">Zobacz</a>
      </div>
    </article>
  `;
}

function renderBestsellers(products) {
  if (!bestsellersList) return;

  const bestsellers = products.filter((product) => product.is_bestseller);

  if (bestsellers.length === 0) {
    bestsellersList.innerHTML = '<p class="state-message">Brak bestsellerów w bazie danych.</p>';
    return;
  }

  bestsellersList.innerHTML = bestsellers.map(createProductCard).join('');
}

function renderMenu(products) {
  if (!menuList) return;

  const groupedProducts = products.reduce((groups, product) => {
    if (!groups[product.category]) {
      groups[product.category] = [];
    }

    groups[product.category].push(product);
    return groups;
  }, {});

  menuList.innerHTML = Object.entries(groupedProducts).map(([category, items]) => `
    <article class="menu-card">
      <h3>${escapeHTML(category)}</h3>
      <ul>
        ${items.map((item) => `
          <li>
            <span>${escapeHTML(item.name)}</span>
            <strong>${formatPrice(item.price)}</strong>
          </li>
        `).join('')}
      </ul>
    </article>
  `).join('');
}

async function loadProducts() {
  try {
    const response = await fetch(API_PRODUCTS_URL);

    if (!response.ok) {
      throw new Error('Nie udało się pobrać danych z API.');
    }

    const products = await response.json();
    renderBestsellers(products);
    renderMenu(products);
  } catch (error) {
    const message = 'Nie można połączyć się z backendem. Uruchom serwer poleceniem: python backend/server.py';

    if (bestsellersList) {
      bestsellersList.innerHTML = `<p class="state-message state-error">${message}</p>`;
    }

    if (menuList) {
      menuList.innerHTML = `<p class="state-message state-error">${message}</p>`;
    }
  }
}

if (form && formNote) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    if (!payload.name || !payload.email || !payload.message) {
      formNote.textContent = 'Uzupełnij wszystkie pola formularza.';
      return;
    }

    try {
      const response = await fetch(API_CONTACT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Błąd zapisu wiadomości.');
      }

      form.reset();
      formNote.textContent = 'Wiadomość została zapisana w bazie danych.';
    } catch (error) {
      formNote.textContent = 'Nie udało się wysłać wiadomości. Sprawdź, czy backend jest uruchomiony.';
    }
  });
}

loadProducts();
