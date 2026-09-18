"use strict";

/* Menu carousel and filter*/

let allMenuItems = [];
let visibleMenuItems = [];
let currentMenuIndex = 0;

const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});

async function loadMenu() {
    const menuName = document.querySelector("#menuName");

    if (!menuName) {
        return;
    }

    try {
        const response = await fetch("menu.json");

        if (!response.ok) {
            throw new Error("Menu data could not be loaded.");
        }

        allMenuItems = await response.json();
        visibleMenuItems = allMenuItems;
        displayMenuItem();
    } catch (error) {
        menuName.textContent = "Unable to load menu";
        console.error(error);
    }
}

function displayMenuItem() {
    if (visibleMenuItems.length === 0) {
        return;
    }

    const item = visibleMenuItems[currentMenuIndex];

    document.querySelector("#menuName").textContent = item.name;
    document.querySelector("#menuDescription").textContent = item.description;
    document.querySelector("#menuCategory").textContent = item.category;
    document.querySelector("#menuPrice").textContent =
        currencyFormatter.format(item.price);

    const menuImage = document.querySelector("#menuImage");
    menuImage.src = item.img;
    menuImage.alt = item.name;
}

function prevImage() {
    if (visibleMenuItems.length === 0) {
        return;
    }

    currentMenuIndex =
        (currentMenuIndex - 1 + visibleMenuItems.length) %
        visibleMenuItems.length;

    displayMenuItem();
}

function nextImage() {
    if (visibleMenuItems.length === 0) {
        return;
    }

    currentMenuIndex =
        (currentMenuIndex + 1) % visibleMenuItems.length;

    displayMenuItem();
}

function filterMenu() {
    const selectedCategory =
        document.querySelector("#categoryFilter").value;

    if (selectedCategory === "All") {
        visibleMenuItems = allMenuItems;
    } else {
        visibleMenuItems = allMenuItems.filter(
            item => item.category === selectedCategory
        );
    }

    currentMenuIndex = 0;
    displayMenuItem();
}

document.addEventListener("DOMContentLoaded", () => {
    loadMenu();

    const previousButton = document.querySelector("#prevButton");
    const nextButton = document.querySelector("#nextButton");
    const categoryFilter = document.querySelector("#categoryFilter");

    if (previousButton) {
        previousButton.addEventListener("click", prevImage);
    }

    if (nextButton) {
        nextButton.addEventListener("click", nextImage);
    }

    if (categoryFilter) {
        categoryFilter.addEventListener("change", filterMenu);
    }
});


/*Reservation form validation*/

const reservationForm = document.querySelector("#reservationForm");

if (reservationForm) {
    reservationForm.addEventListener("submit", event => {
        event.preventDefault();

        clearFormErrors();

        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const partySize = document.querySelector("#partySize").value;
        const date = document.querySelector("#date").value;
        const time = document.querySelector("#time").value;
        const dietaryNotes =
            document.querySelector("#dietaryNotes").value.trim();
        const newsletter =
            document.querySelector("#newsletter").checked;

        const selectedSeating = document.querySelector(
            'input[name="seating"]:checked'
        );

        const seating = selectedSeating
            ? selectedSeating.value
            : "";

        let isValid = true;

        if (name.length === 0) {
            showError("nameError", "Please enter your name.");
            isValid = false;
        } else if (name.length > 20) {
            showError("nameError", "Name must be 20 characters or fewer.");
            isValid = false;
        }

        if (email.length === 0) {
            showError("emailError", "Please enter your email.");
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError("emailError", "Please enter a valid email address.");
            isValid = false;
        }

        if (partySize === "") {
            showError("partySizeError", "Please select a party size.");
            isValid = false;
        }

        if (date === "") {
            showError("dateError", "Please choose a date.");
            isValid = false;
        }

        if (time === "") {
            showError("timeError", "Please choose a time.");
            isValid = false;
        }

        if (seating === "") {
            showError("seatingError", "Please choose a seating preference.");
            isValid = false;
        }

        if (dietaryNotes.length > 30) {
            showError(
                "dietaryNotesError",
                "Dietary notes must be 30 characters or fewer."
            );
            isValid = false;
        }

        if (!isValid) {
            document.querySelector("#formMessage").textContent =
                "Please correct the highlighted fields.";
            return;
        }

        const reservationData = {
            name,
            email,
            partySize,
            date,
            time,
            seating,
            dietaryNotes,
            newsletter
        };

        console.log(JSON.stringify(reservationData));

        document.querySelector("#formMessage").textContent =
            "Reservation request submitted successfully.";

        reservationForm.reset();
    });

    reservationForm.addEventListener("reset", () => {
        clearFormErrors();

        const formMessage = document.querySelector("#formMessage");

        if (formMessage) {
            formMessage.textContent = "";
        }
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(errorId, message) {
    document.querySelector(`#${errorId}`).textContent = message;
}

function clearFormErrors() {
    document.querySelectorAll(".error-message").forEach(error => {
        error.textContent = "";
    });
}

