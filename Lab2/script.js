// script.js - MENU_ITEMS, menu rendering, formatting, reservation validation

// MENU_ITEMS array (11 items)
const MENU_ITEMS = [
    { id: 1, name: "Clockwork Breakfast Bento", description: "Steamed rice, pickled radish, braised egg & sunrise sauce.", price: 9.5, category: "Breakfast", img: "./images/menu-1.png" },
    { id: 2, name: "Gear-Griddle Bento", description: "Crisp rice, smoked tofu, brass-pepper glaze.", price: 12.5, category: "Lunch", img: "./images/Gear-Griddle Bento.png" },
    { id: 3, name: "Airship Captain's Roast", description: "Pulled pork, caramelized onions, steam-baked roll.", price: 14.0, category: "Dinner", img: "./images/Airship Captain's Roast.png" },
    { id: 4, name: "Engineer’s Katsu Box", description: "Crispy cutlet, tangy slaw, seasoned rice.", price: 13.25, category: "Lunch", img: "./images/Engineer's Katsu Box.png" },
    { id: 5, name: "Patrol Officer Porridge", description: "Savory porridge, roasted seeds, herb drizzle.", price: 8.0, category: "Breakfast", img: "./images/Patrol Officer Porridge.png" },
    { id: 6, name: "Copper Curry Bento", description: "Slow-cooked vegetables, spiced broth, steamed buns.", price: 11.75, category: "Dinner", img: "./images/Copper Curry Bento.png" },
    { id: 7, name: "Brass-Braised Greens", description: "Seasonal greens, toasted garlic, citrus finish.", price: 7.5, category: "Lunch", img: "./images/Brass-Braised Greens.png" },
    { id: 8, name: "Night Shift Noodles", description: "Stir-fried noodles, pickled chili, roasted nuts.", price: 10.0, category: "Dinner", img: "./images/Night Shift Noodles.png" },
    { id: 9, name: "Workshop Wrap", description: "Grilled vegetables, smoky spread, pressed flatbread.", price: 9.75, category: "Lunch", img: "./images/Workshop Wrap.png" },
    { id: 10, name: "Dawnlight Danish", description: "Buttery pastry, spiced fruit, morning glaze.", price: 5.5, category: "Breakfast", img: "./images/Dawnlight Danish.png" },
    { id: 11, name: "Mechanic's Miso Bento", description: "Miso glaze protein, seasonal sides.", price: 12.0, category: "Dinner", img: "./images/Mechanic's Miso Bento.png" }
];

// Currency formatter
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

//create a single card element for a menu item
function createMenuCard(item) {
    const col = document.createElement('div');
    // responsive columns + spacing
    col.className = 'col-12 col-sm-6 col-md-4 mb-4';

    const card = document.createElement('div');
    card.className = 'card h-100 shadow-sm';

    // Image wrapper to reserve space and avoid layout shift
    const imgWrap = document.createElement('div');
    imgWrap.className = 'menu-image-wrapper';

    const imgEl = document.createElement('img');
    imgEl.className = 'card-img-top';
    imgEl.alt = item.name || 'Menu item';
    imgEl.loading = 'lazy';
    // Use provided img path (placeholder) or fallback by id
    imgEl.dataset.src = item.img || `images/menu-${item.id}.jpg`;

    // Fallback if image fails to load
    imgEl.onerror = function() {
        this.src = 'images/Logo.png'; // fallback placeholder
        this.classList.add('loaded');
    };

    // Fade in when loaded
    imgEl.addEventListener('load', () => imgEl.classList.add('loaded'));

    // Start loading immediately (or use IntersectionObserver later)
    imgEl.src = imgEl.dataset.src;

    imgWrap.appendChild(imgEl);

    const body = document.createElement('div');
    body.className = 'card-body d-flex flex-column';

    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = item.name;

    const desc = document.createElement('p');
    desc.className = 'card-text text-muted mb-2';
    desc.textContent = item.description;

    const price = document.createElement('div');
    price.className = 'mt-auto fw-bold';
    price.textContent = money.format(item.price);

    const badge = document.createElement('span');
    badge.className = 'badge bg-secondary ms-2';
    badge.textContent = item.category;

    const topRow = document.createElement('div');
    topRow.className = 'd-flex justify-content-between align-items-start mb-2';
    topRow.appendChild(title);
    topRow.appendChild(badge);

    body.appendChild(topRow);
    body.appendChild(desc);
    body.appendChild(price);

    card.appendChild(imgWrap);
    card.appendChild(body);
    col.appendChild(card);

    return col;
}

// Render menu to #menuGrid (if present) using DocumentFragment for fewer reflows
function renderMenu(filterCategory = 'All') {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;

    grid.innerHTML = '';

    const items = (filterCategory === 'All')
        ? MENU_ITEMS
        : MENU_ITEMS.filter(i => i.category === filterCategory);

    const frag = document.createDocumentFragment();
    items.forEach(item => {
        const card = createMenuCard(item);
        frag.appendChild(card);
    });
    grid.appendChild(frag);

    // Optional: start observing wrappers for lazy loading (if IntersectionObserver used)
    if ('IntersectionObserver' in window) {
        observeMenuImages();
    }
}

// IntersectionObserver to defer setting src for offscreen images (improves perf)
const _menuObserver = ('IntersectionObserver' in window) ? new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target.querySelector('img[data-src]');
            if (img && !img.src) {
                img.src = img.dataset.src;
            }
            obs.unobserve(entry.target);
        }
    });
}, { rootMargin: '200px' }) : null;

function observeMenuImages() {
    if (!_menuObserver) return;
    document.querySelectorAll('.menu-image-wrapper').forEach(w => {
        // only observe wrappers that still need loading
        const img = w.querySelector('img[data-src]');
        if (img && !img.src) _menuObserver.observe(w);
    });
}

// Setup filter buttons on menu page
function setupMenuFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-category');
            renderMenu(category);
        });
    });
}

// Reservation form handling (JS-only validation)
function setupReservationForm() {
    const form = document.getElementById('reservationForm');
    if (!form) return;

    const alertArea = document.getElementById('reservationAlertArea');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Clear previous alert
        alertArea.innerHTML = '';

        const data = {
            name: form.elements['name'].value.trim(),
            email: form.elements['email'].value.trim(),
            partySize: form.elements['partySize'].value,
            date: form.elements['date'].value,
            time: form.elements['time'].value,
            seating: form.elements['seating'].value || '',
            dietaryNotes: form.elements['dietaryNotes'].value.trim(),
            newsletter: form.elements['newsletter'].checked
        };

        const errors = [];

        // Validate name: required, max 20, not empty
        if (!data.name) errors.push('Name is required.');
        else if (data.name.length > 20) errors.push('Name must be 20 characters or fewer.');

        // Validate email: basic pattern (JS)
        if (!data.email) errors.push('Email is required.');
        else {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(data.email)) errors.push('Email must be a valid email address.');
        }

        // Party size: required and between 1 and 8
        if (!data.partySize) errors.push('Party size is required.');
        else {
            const n = Number(data.partySize);
            if (!Number.isInteger(n) || n < 1 || n > 8) errors.push('Party size must be between 1 and 8.');
        }

        // Date: required and must not be in the past (local date)
        if (!data.date) errors.push('Date is required.');
        else {
            const selected = new Date(data.date + 'T00:00:00');
            const today = new Date();
            // remove time portion from today for comparison
            today.setHours(0,0,0,0);
            if (selected < today) errors.push('Date cannot be in the past.');
        }

        // Time: required (basic)
        if (!data.time) errors.push('Time is required.');

        // Seating: required
        if (!data.seating) errors.push('Seating preference is required.');

        // Dietary notes: max 30 characters
        if (data.dietaryNotes && data.dietaryNotes.length > 30) errors.push('Dietary notes must be 30 characters or fewer.');

        if (errors.length > 0) {
            const alert = document.createElement('div');
            alert.className = 'alert alert-danger';
            alert.role = 'alert';

            const ul = document.createElement('ul');
            ul.className = 'mb-0';
            errors.forEach(err => {
                const li = document.createElement('li');
                li.textContent = err;
                ul.appendChild(li);
            });
            alert.appendChild(ul);
            alertArea.appendChild(alert);
            // focus first field with error optionally
            document.getElementById('name').focus();
            return;
        }

        // Success: show success alert and log object
        const successAlert = document.createElement('div');
        successAlert.className = 'alert alert-success';
        successAlert.role = 'alert';
        successAlert.textContent = 'Reservation successful! Your details have been received.';
        alertArea.appendChild(successAlert);

        // Build object in required shape and console.log
        const reservationObject = {
            name: data.name,
            email: data.email,
            partySize: Number(data.partySize),
            date: data.date,
            time: data.time,
            seating: data.seating,
            dietaryNotes: data.dietaryNotes || null,
            newsletter: data.newsletter
        };

        console.log('Reservation submitted:', reservationObject);

        // Optionally clear form after success
        form.reset();
    });

    // Reset handler clears alerts when reset button is clicked
    form.addEventListener('reset', () => {
        const alertArea = document.getElementById('reservationAlertArea');
        if (alertArea) alertArea.innerHTML = '';
    });
}

// run appropriate initializers
document.addEventListener('DOMContentLoaded', () => {
    // If on menu page
    if (document.getElementById('menuGrid')) {
        renderMenu('All');
        setupMenuFilters();
    }

    // If on reservations page
    if (document.getElementById('reservationForm')) {
        setupReservationForm();
    }
});
