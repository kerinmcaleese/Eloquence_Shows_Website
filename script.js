// Simple dropdown for "Work with us"
const dropdown = document.querySelector(".dropdown");
const dropdownButton = dropdown?.querySelector("button");
const dropdownMenu = dropdown?.querySelector(".menu");

if (dropdownButton && dropdownMenu) {
  dropdownButton.addEventListener("click", () => {
    const isOpen = dropdownMenu.style.display === "block";
    dropdownMenu.style.display = isOpen ? "none" : "block";
    dropdownButton.setAttribute("aria-expanded", String(!isOpen));
  });

  // close on click outside
  document.addEventListener("click", event => {
    if (!dropdown.contains(event.target)) {
      dropdownMenu.style.display = "none";
      dropdownButton.setAttribute("aria-expanded", "false");
    }
  });
}

// Newsletter → Google Sheets integration via Apps Script
// Replace with your deployed script URL
const SCRIPT_URL = "https://script.google.com/a/macros/eloquenceshows.org/s/AKfycbzTmKQZbhs1BbEv5UPeAzLW_028UCrPKgbq755yrqaWg0qeDh-R0bNZ5EUPVsKgVDn5gA/exec";

const newsletterForm = document.getElementById("newsletter-form");
const newsletterMessage = document.getElementById("newsletter-message");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(newsletterForm);
    formData.append("source", "eloquence_website_newsletter");

    newsletterMessage.textContent = "Submitting...";

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      newsletterForm.reset();
      newsletterMessage.textContent = "Thank you. You're on the list.";
    } catch (error) {
      console.error("Newsletter signup error", error);
      newsletterMessage.textContent = "Something went wrong. Please try again.";
    }
  });
}