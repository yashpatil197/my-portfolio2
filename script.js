// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // Initialize Animate On Scroll (AOS)
    AOS.init({
        duration: 1000, // values from 0 to 3000, with step 50ms
        once: true,     // whether animation should happen only once - while scrolling down
    });

    // Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Position the dot directly at the cursor's location
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Animate the outline to follow the cursor
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: 'forwards' });
    });

    // Add cursor grow effect on hoverable elements
    const hoverableElements = document.querySelectorAll('a, button, .project-card');
    
    hoverableElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('cursor-grow');
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('cursor-grow');
        });
    });

});

const text = "A passionate Web Developer & UI/UX Designer creating modern and interactive web experiences.";
let index = 0;

function typeEffect() {
    if (index < text.length) {
        document.querySelector(".typing").textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 40);
    }
}

window.addEventListener("load", typeEffect);

// Hide loader after page loads
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.classList.add("hidden");
    }
});
// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});
/* ================= PROGRESS LOADER ================= */
let progress = 0;
const progressBar = document.getElementById("loader-progress");
const progressText = document.getElementById("loader-percent");
const loader = document.getElementById("loader");

const loadingInterval = setInterval(() => {
    if (progress < 90) {
        progress += Math.floor(Math.random() * 5) + 1;
        progressBar.style.width = progress + "%";
        progressText.textContent = progress + "%";
    }
}, 200);

window.addEventListener("load", () => {
    clearInterval(loadingInterval);
    progress = 100;
    progressBar.style.width = "100%";
    progressText.textContent = "100%";

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 500);
});
/* ===== DARK / LIGHT MODE ===== */
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Load saved theme
if (localStorage.getItem("theme") === "light") {
    body.classList.add("light");
    themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
    body.classList.toggle("light");

    if (body.classList.contains("light")) {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "🌙";
    }
});
const scrollBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
    // Show button if scrolled down more than 500px
    if (window.scrollY > 500) {
        scrollBtn.classList.add("active");
    } else {
        scrollBtn.classList.remove("active");
    }
});

// Smooth scroll to top when clicked
scrollBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
