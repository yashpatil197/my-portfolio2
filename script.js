document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Initialize Animate On Scroll (AOS) ---
    AOS.init({
        duration: 1000,
        once: true,
    });

    // --- 2. Custom Cursor Logic ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: 'forwards' });
        });

        const hoverableElements = document.querySelectorAll('a, button, .project-card');
        hoverableElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('cursor-grow'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('cursor-grow'));
        });
    }

    // --- 3. Typing Effect ---
    const text = "A passionate Web Developer & UI/UX Designer creating modern and interactive web experiences.";
    const typingElement = document.querySelector(".typing");
    let index = 0;

    function typeEffect() {
        if (typingElement && index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeEffect, 40);
        }
    }
    // Start typing effect
    typeEffect();
});

// --- 4. Mobile Menu Toggle ---
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

/* ================= PROGRESS LOADER LOGIC ================= */
// This handles the loading bar and removing the screen
let progress = 0;
const progressBar = document.getElementById("loader-progress");
const progressText = document.getElementById("loader-percent");
const loader = document.getElementById("loader");

// Simulate loading progress
const loadingInterval = setInterval(() => {
    if (progress < 90) {
        progress += Math.floor(Math.random() * 5) + 1;
        if (progressBar) progressBar.style.width = progress + "%";
        if (progressText) progressText.textContent = progress + "%";
    }
}, 200);

// When the page actually finishes loading
window.addEventListener("load", () => {
    clearInterval(loadingInterval);
    progress = 100;
    
    if (progressBar) progressBar.style.width = "100%";
    if (progressText) progressText.textContent = "100%";

    // Small delay to show 100% before hiding
    setTimeout(() => {
        if (loader) {
            loader.classList.add("hidden"); 
        }
    }, 500);
});

/* ================= DARK / LIGHT MODE ================= */
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    body.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'light') {
        body.classList.add("light");
        if(themeToggleBtn) themeToggleBtn.innerText = '☀️';
    }
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains("light")) {
            // Switch to Dark
            body.classList.remove("light");
            body.removeAttribute('data-theme');
            themeToggleBtn.innerText = '🌙';
            localStorage.setItem('theme', 'dark');
        } else {
            // Switch to Light
            body.classList.add("light");
            body.setAttribute('data-theme', 'light');
            themeToggleBtn.innerText = '☀️';
            localStorage.setItem('theme', 'light');
        }
    });
}

/* ================= SCROLL TO TOP ================= */
const scrollBtn = document.getElementById("scrollToTop");

if (scrollBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            scrollBtn.classList.add("active");
        } else {
            scrollBtn.classList.remove("active");
        }
    });

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* ================= GITHUB API FETCH ================= */
async function fetchGitHubStats() {
    const username = 'yashpatil197';
    const repoElement = document.getElementById('repo-count');
    const starsElement = document.getElementById('stars-count');
    const followersElement = document.getElementById('followers-count');
    const langElement = document.getElementById('top-langs');

    if (!repoElement) return;

    try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();

        repoElement.innerText = userData.public_repos || 0;
        followersElement.innerText = userData.followers || 0;

        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const reposData = await reposResponse.json();

        let totalStars = 0;
        const languageMap = {};

        if (Array.isArray(reposData)) {
            reposData.forEach(repo => {
                totalStars += repo.stargazers_count;
                if (repo.language) {
                    languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
                }
            });

            starsElement.innerText = totalStars;
            const sortedLangs = Object.keys(languageMap).sort((a, b) => languageMap[b] - languageMap[a]);
            langElement.innerText = sortedLangs.slice(0, 2).join(" / ") || "N/A";
        }
    } catch (error) {
        console.error("Error fetching GitHub data:", error);
        repoElement.innerText = "Error";
    }
}

fetchGitHubStats();
