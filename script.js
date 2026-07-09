/* ==========================================================================
   SCRIPT.JS - SPACECRAFT DEEP SPACE LOG INTERACTIONS (VANILLA JS ONLY)
   ========================================================================== */

// ----- Force Page Scroll to Top on Load -----
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// ----- Drifting Starfield Generator -----
function initStarfield() {
    const starField = document.getElementById('stars-field');
    if (!starField) return;

    const numStars = 150; // Hundreds of tiny stars as requested
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 1.3 + 0.3; // 0.3px to 1.6px (tiny stars)
        
        // Random slow twinkle and animation timings
        const twinkleDuration = Math.random() * 4 + 4; // 4s to 8s
        const twinkleDelay = Math.random() * 6;

        // Custom properties for very slow drift
        const driftX = `${(Math.random() - 0.5) * 20}px`;
        const driftY = `${(Math.random() - 0.5) * 20}px`;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${twinkleDuration}s, 70s`; // slow drift
        star.style.animationDelay = `${twinkleDelay}s, 0s`;
        star.style.setProperty('--drift-x', driftX);
        star.style.setProperty('--drift-y', driftY);

        fragment.appendChild(star);
    }
    starField.appendChild(fragment);
}

// ----- Shooting Star Generator -----
function spawnShootingStar() {
    const spaceBg = document.querySelector('.space-bg');
    if (!spaceBg) return;

    const star = document.createElement('div');
    star.className = 'shooting-star';

    // Start in top-left region
    const startX = Math.random() * (window.innerWidth * 0.75);
    const startY = Math.random() * (window.innerHeight * 0.45);

    star.style.left = `${startX}px`;
    star.style.top = `${startY}px`;

    spaceBg.appendChild(star);

    // Force browser repaint to trigger transition
    star.getBoundingClientRect();

    // Shoot!
    star.classList.add('shoot');

    // Remove element after transition completes
    setTimeout(() => {
        star.remove();
    }, 1600);
}

// Loop to trigger shooting stars every 15-20 seconds
function initShootingStars() {
    function scheduleNext() {
        const delay = Math.random() * 5000 + 15000; // 15s to 20s
        setTimeout(() => {
            spawnShootingStar();
            scheduleNext();
        }, delay);
    }
    // First spawn after 8 seconds
    setTimeout(() => {
        spawnShootingStar();
        scheduleNext();
    }, 8000);
}

// ----- Handcrafted Typing Animation -----
function initTyping() {
    const targetText = "> Hello.";
    const typingContainer = document.getElementById('typing-hello');
    if (!typingContainer) return;

    typingContainer.textContent = ""; // Clear loader placeholder
    let charIndex = 0;

    function typeChar() {
        if (charIndex < targetText.length) {
            typingContainer.textContent += targetText.charAt(charIndex);
            charIndex++;
            
            // Random typing speed interval for natural typewriter effect (90ms to 160ms)
            const speed = Math.random() * 70 + 90;
            setTimeout(typeChar, speed);
        }
    }

    // Trigger typing after a brief delay
    setTimeout(typeChar, 600);
}

// ----- Scroll Reveal Animation Setup -----
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length === 0) return;

    const observerOption = {
        root: null,
        threshold: 0.08
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Reveal once
            }
        });
    }, observerOption);

    revealElements.forEach(el => revealObserver.observe(el));
}

// ----- Scroll Section Link Highlighter -----
function initActiveNavLinks() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let activeSectionId = '';
        const scrollPosition = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Highlight link slightly before section hits top
            if (scrollPosition >= (sectionTop - 150)) {
                activeSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeSectionId}`) {
                link.classList.add('active');
            }
        });
    });
}

// ----- Responsive Mobile Navigation Menu -----
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ----- Core Application Initializer -----
document.addEventListener('DOMContentLoaded', () => {
    initStarfield();
    initShootingStars();
    initTyping();
    initScrollReveal();
    initActiveNavLinks();
    initMobileMenu();
});
