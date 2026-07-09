/* ==========================================================================
   SCRIPT.JS - SPACE OBSERVATORY INTERACTIONS (VANILLA JS ONLY)
   ========================================================================== */

// ----- Force Page Scroll to Top on Load -----
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// For page-reload override
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    
    // Trigger telemetry count-up observer
    initTelemetryObserver();
});

// ----- Custom Starfield Generator -----
function initStarfield() {
    const starField = document.getElementById('stars-field');
    if (!starField) return;
    
    const numStars = 60;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 1.8 + 0.4; // 0.4px to 2.2px
        const duration = Math.random() * 3 + 3; // 3s to 6s twinkling
        const delay = Math.random() * 5;
        
        // Random drift coordinates for CSS custom properties
        const driftX = `${(Math.random() - 0.5) * 40}px`;
        const driftY = `${(Math.random() - 0.5) * 40}px`;
        
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;
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
    
    // Pick a starting point in the top-left area
    const startX = Math.random() * (window.innerWidth * 0.7);
    const startY = Math.random() * (window.innerHeight * 0.4);
    
    star.style.left = `${startX}px`;
    star.style.top = `${startY}px`;
    
    spaceBg.appendChild(star);
    
    // Force browser reflow to enable transition trigger
    star.getBoundingClientRect();
    
    // Add the shoot class to trigger CSS transition
    star.classList.add('shoot');
    
    // Remove element after transition completes
    setTimeout(() => {
        star.remove();
    }, 1300);
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
    // Spawn initial shooting star after 6s
    setTimeout(() => {
        spawnShootingStar();
        scheduleNext();
    }, 6000);
}

// ----- Parallax Background Shift on Mouse Move -----
function initMouseParallax() {
    const spaceBg = document.querySelector('.space-bg');
    if (!spaceBg) return;

    document.addEventListener('mousemove', (e) => {
        // Calculate offset percentage relative to screen center
        const xOffset = (e.clientX / window.innerWidth - 0.5) * 25; // max 12.5px shift
        const yOffset = (e.clientY / window.innerHeight - 0.5) * 25;
        
        spaceBg.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
}

// ----- Cursor Star Trail -----
function initCursorTrail() {
    let lastTrailTime = 0;
    
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTrailTime < 60) return; // Throttling star spawns (approx. 16 per sec)
        lastTrailTime = now;
        
        const star = document.createElement('div');
        star.className = 'cursor-star';
        star.style.left = `${e.pageX}px`;
        star.style.top = `${e.pageY}px`;
        
        document.body.appendChild(star);
        
        // Random drift offset coordinates
        const driftX = (Math.random() - 0.5) * 45;
        const driftY = (Math.random() - 0.5) * 45 + 15; // drift downwards slightly
        
        // Force reflow
        star.getBoundingClientRect();
        
        // Transition down and fade out
        setTimeout(() => {
            star.style.transform = `translate(calc(-50% + ${driftX}px), calc(-50% + ${driftY}px)) scale(0.1)`;
            star.style.opacity = '0';
        }, 50);
        
        // Cleanup element
        setTimeout(() => {
            star.remove();
        }, 850);
    });
}

// ----- Scroll Progress Orbital Ring Update -----
function initOrbitalProgress() {
    const fillCircle = document.querySelector('.orbital-ring-fill');
    const progressText = document.querySelector('.orbital-progress-text');
    if (!fillCircle) return;

    function updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        let scrollPercent = 0;
        if (docHeight > 0) {
            scrollPercent = Math.min(Math.round((scrollTop / docHeight) * 100), 100);
        }
        
        // Dynamic circumference calculation based on current SVG size
        const radius = fillCircle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        
        // Calculate stroke offset
        const offset = circumference - (scrollPercent / 100) * circumference;
        
        fillCircle.style.strokeDasharray = `${circumference}`;
        fillCircle.style.strokeDashoffset = `${offset}`;
        
        if (progressText) {
            progressText.textContent = `${scrollPercent}%`;
        }
    }

    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    updateProgress();
}

// ----- Intersection Observer for Scroll Reveals -----
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // trigger animation once
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
}

// ----- Active Section Navbar Highlighting -----
function initNavHighlight() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 180)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ----- Telemetry Count Up Animator -----
function animateNumber(element, targetVal) {
    let startVal = 0;
    const duration = 1500; // 1.5 seconds
    const startTime = performance.now();
    
    function updateNum(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function: easeOutQuad
        const easedProgress = progress * (2 - progress);
        const currentVal = Math.floor(startVal + easedProgress * (targetVal - startVal));
        
        element.textContent = `${currentVal}+`;
        if (targetVal === 2) {
            element.textContent = `${currentVal}+ Years`;
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateNum);
        } else {
            element.textContent = `${targetVal}+`;
            if (targetVal === 2) {
                element.textContent = `2+ Years`;
            }
        }
    }
    
    requestAnimationFrame(updateNum);
}

function initTelemetryObserver() {
    const statsSection = document.querySelector('.statistics-section');
    if (!statsSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNums = document.querySelectorAll('.stat-num');
                statNums.forEach(numEl => {
                    const target = parseInt(numEl.getAttribute('data-target'), 10);
                    if (!isNaN(target)) {
                        animateNumber(numEl, target);
                    }
                });
                observer.unobserve(statsSection); // animate once
            }
        });
    }, { threshold: 0.2 });

    observer.observe(statsSection);
}

// ----- Core Application Launch -----
document.addEventListener('DOMContentLoaded', () => {
    initStarfield();
    initShootingStars();
    initMouseParallax();
    initCursorTrail();
    initOrbitalProgress();
    initScrollReveal();
    initNavHighlight();
});
