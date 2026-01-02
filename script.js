/* =========================================
   1. LOADER LOGIC (FIX FOR STUCK LOADING)
   ========================================= */
window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    const loaderProgress = document.getElementById("loader-progress");
    const loaderPercent = document.getElementById("loader-percent");

    // Simulate loading progress
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            // Hide Loader when 100%
            setTimeout(() => {
                if(loader) {
                    loader.style.opacity = "0";
                    loader.style.pointerEvents = "none"; 
                }
            }, 500);
        } else {
            width++;
            if(loaderProgress) loaderProgress.style.width = width + "%";
            if(loaderPercent) loaderPercent.innerText = width + "%";
        }
    }, 20); // Speed of loader
});

/* =========================================
   2. INITIALIZE AOS (ANIMATIONS)
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            offset: 100,
            once: true
        });
    }
});

/* =========================================
   3. CUSTOM CURSOR
   ========================================= */
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    if(cursorDot) {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
    }

    if(cursorOutline) {
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: 'forwards' });
    }
});

/* =========================================
   4. TYPING EFFECT (HERO SECTION)
   ========================================= */
const typingText = document.querySelector(".typing");
const words = ["Frontend Developer", "UI/UX Designer", "Tech Enthusiast", "Computer Engineer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    if (!typingText) return; 

    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 2000); 
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 100 : 200);
    }
}
document.addEventListener('DOMContentLoaded', type);

/* =========================================
   5. MOBILE MENU TOGGLE
   ========================================= */
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

/* =========================================
   6. THEME TOGGLE LOGIC (LIGHT/DARK MODE)
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    if (!themeToggleBtn) return;

    // Check saved theme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
        themeToggleBtn.innerText = currentTheme === 'light' ? '☀️' : '🌙';
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'light') {
            body.removeAttribute('data-theme');
            themeToggleBtn.innerText = '🌙';
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            themeToggleBtn.innerText = '☀️';
            localStorage.setItem('theme', 'light');
        }
    });
});

/* =========================================
   7. GITHUB API STATS (AUTO UPDATE)
   ========================================= */
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

        repoElement.innerText = userData.public_repos || "10+";
        followersElement.innerText = userData.followers || "5+";

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
        }

        starsElement.innerText = totalStars;

        const sortedLangs = Object.keys(languageMap).sort((a, b) => languageMap[b] - languageMap[a]);
        const topLangs = sortedLangs.slice(0, 2).join(" / ");
        langElement.innerText = topLangs || "JS / C";

    } catch (error) {
        console.error("GitHub Fetch Error:", error);
        if(repoElement) repoElement.innerText = "15+"; 
    }
}

fetchGitHubStats();

/* =========================================
   8. SCROLL TO TOP BUTTON
   ========================================= */
const scrollToTopBtn = document.getElementById("scrollToTop");

if(scrollToTopBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    });

    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
