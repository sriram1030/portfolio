// ----- Custom Starfield -----
function initStarfield() {
    const starField = document.getElementById('stars-field');
    if (!starField) return;
    
    const numStars = 50;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 1.5 + 0.5;
        const duration = Math.random() * 3 + 3; // 3s to 6s
        const delay = Math.random() * 5;
        
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;
        
        fragment.appendChild(star);
    }
    starField.appendChild(fragment);
}

// ----- Initial Linux Boot Sequence -----
const bootSequence = [
    { text: "Loading Kernel.............................OK", delay: 250 },
    { text: "Loading Graphics Driver....................OK", delay: 350 },
    { text: "Checking Network...........................OK", delay: 150 },
    { text: "Connecting to Chennai Node.................OK", delay: 400 },
    { text: "Loading Developer Profile..................OK", delay: 200 },
    { text: "Fetching Experience........................OK", delay: 300 },
    { text: "Loading Projects...........................OK", delay: 250 },
    { text: "Mounting Portfolio.........................OK", delay: 350 },
    { text: "Authentication.............................SUCCESS", delay: 200, isSuccess: true },
    { text: "Welcome Sriram.", delay: 400 }
];

function runBootSequence() {
    const commandText = "./initialize_portfolio";
    const commandEl = document.getElementById('boot-command');
    const logsEl = document.getElementById('boot-logs');
    let charIndex = 0;

    // 1. Simulate typing the initial command
    function typeCommand() {
        if (charIndex < commandText.length) {
            commandEl.textContent += commandText.charAt(charIndex);
            charIndex++;
            setTimeout(typeCommand, Math.random() * 80 + 40); // Natural typing speed
        } else {
            // Typing finished, start outputting logs
            setTimeout(printLogs, 600);
        }
    }

    // 2. Output logs line by line
    let logIndex = 0;
    function printLogs() {
        if (logIndex < bootSequence.length) {
            const step = bootSequence[logIndex];
            const logLine = document.createElement('div');
            logLine.className = 'boot-log-line';
            if (step.isSuccess) logLine.classList.add('success');
            logLine.textContent = step.text;
            logsEl.appendChild(logLine);
            
            // Auto-scroll boot screen
            const overlay = document.getElementById('boot-overlay');
            overlay.scrollTop = overlay.scrollHeight;

            logIndex++;
            setTimeout(printLogs, step.delay + (Math.random() * 100 - 50));
        } else {
            // All logs finished, blink cursor then load portfolio
            setTimeout(() => {
                document.body.classList.add('boot-complete');
                document.body.classList.remove('booting');
            }, 700);
        }
    }

    // Trigger typing after brief initial pause
    setTimeout(typeCommand, 800);
}

// ----- Interactive Command Console -----
const cliInput = document.getElementById('cli-input');
const cliOutputList = document.getElementById('cli-output-list');
const cliConsole = document.getElementById('cli-console');

const commandHistory = [];

const commands = {
    help: `Supported commands:<br>
    - <span class="highlight">whoami</span>      : Display current developer profile<br>
    - <span class="highlight">about</span>       : First person biography<br>
    - <span class="highlight">skills</span>      : List technology directories<br>
    - <span class="highlight">projects</span>    : Show details of engineered projects<br>
    - <span class="highlight">experience</span>  : Career timeline history log<br>
    - <span class="highlight">contact</span>     : Display live transmission details<br>
    - <span class="highlight">resume</span>      : Download current curriculum vitae<br>
    - <span class="highlight">social</span>      : Print developer profiles (GitHub, LinkedIn)<br>
    - <span class="highlight">clear</span>       : Purge CLI screen history`,
    
    whoami: `SRIRAM S<br>
    -------------------------------------------------<br>
    Web Developer | Android Developer | Digital Marketer | AI Automation Enthusiast`,
    
    about: `I'm Sriram, a Web & Mobile Developer from Chennai with over two years of professional experience building websites, Android applications, and digital marketing solutions. I enjoy taking projects from concept to deployment, utilizing WordPress, Kotlin, Linux servers, SEO optimization, and n8n/AI automations.`,
    
    skills: `📁 Frontend: HTML, CSS, JavaScript, WordPress, Elementor<br>
    📁 Mobile: Kotlin, Java, Android Studio<br>
    📁 Marketing: Google Ads, SEO, Meta Ads<br>
    📁 Backend: REST APIs, Supabase, Firebase<br>
    📁 Infrastructure: Docker, Linux, Hosting, Domains<br>
    📁 Automation: n8n, AI, API Integration`,
    
    projects: `Project 01: Church Sermon Android App - Streams sermons with REST APIs & Gemini AI.<br>
    Project 02: Weather Satellite App - Displays weather satellite imagery for India.<br>
    Project 03: Grafikos Websites - Multiple business WordPress & Elementor builds.<br>
    Project 04: AI Workflow Automation - Streamlining repetitive tasks using n8n & API keys.<br>
    Project 05: Space Portfolio - Lightweight terminal command portfolio.`,
    
    experience: `history log:<br>
    2023 > Joined Grafikos<br>
    - Designed websites & built Android apps<br>
    - Managed VPS hosting servers & sitemap SEO<br>
    - Created Google Ads and managed campaigns<br>
    - Client Support & AI-assisted development integration`,
    
    contact: `Location : Chennai, Tamil Nadu, India<br>
    Phone    : +91 8270852959<br>
    Email    : sriramsri1030@gmail.com<br>
    GitHub   : https://github.com/sriram1030<br>
    LinkedIn : https://www.linkedin.com/in/sriram1030/`,
    
    resume: `Initializing resume download...<br>
    Target path: assets/resume.pdf`,
    
    social: `GitHub   : https://github.com/sriram1030<br>
    LinkedIn : https://www.linkedin.com/in/sriram1030/`
};

function handleCliInput(e) {
    if (e.key === 'Enter') {
        const fullInput = cliInput.value.trim();
        const cmd = fullInput.toLowerCase();
        
        // Output prompt echo
        const echoLine = document.createElement('div');
        echoLine.className = 'cli-line';
        echoLine.innerHTML = `<span class="prompt">root@sriram:~$</span> <span class="cmd-history-item">${fullInput}</span>`;
        cliOutputList.appendChild(echoLine);

        if (cmd !== "") {
            const replyLine = document.createElement('div');
            replyLine.className = 'cli-line';

            if (cmd === 'clear') {
                cliOutputList.innerHTML = '';
            } else if (commands.hasOwnProperty(cmd)) {
                replyLine.innerHTML = commands[cmd];
                cliOutputList.appendChild(replyLine);
                
                // Extra handler for resume download action
                if (cmd === 'resume') {
                    setTimeout(() => {
                        window.open('assets/resume.pdf', '_blank');
                    }, 500);
                }
            } else {
                replyLine.innerHTML = `<span class="error">Command not found. Type "help"</span>`;
                cliOutputList.appendChild(replyLine);
            }
        }

        cliInput.value = '';
        
        // Auto scroll console
        cliConsole.scrollTop = cliConsole.scrollHeight;
    }
}

// ----- Scroll Reveal Animation -----
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const visibleBuffer = 100;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - visibleBuffer) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    checkReveal();
}

// ----- Navigation Links Highlighting -----
function initNavHighlight() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 160)) {
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

// ----- Set Current Year Dynamically -----
function initDynamicYear() {
    const copyrightEl = document.querySelector('.copyright');
    if (copyrightEl) {
        const currentYear = new Date().getFullYear();
        copyrightEl.innerHTML = `&copy; ${currentYear} SRIRAM S`;
    }
}

// ----- Main Launch -----
document.addEventListener('DOMContentLoaded', () => {
    initStarfield();
    runBootSequence();
    initScrollReveal();
    initNavHighlight();
    initDynamicYear();

    if (cliInput) {
        cliInput.addEventListener('keydown', handleCliInput);
    }

    if (cliConsole) {
        cliConsole.addEventListener('click', () => {
            cliInput.focus();
        });
    }
});
