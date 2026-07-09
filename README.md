# 🌌 Spacecraft Log Portfolio | Sriram S

A minimal, premium, text-focused personal portfolio themed as a mission log file from a spacecraft drifting through deep space.

Live Version: [sriramsri.online](https://sriramsri.online)

---

## 🛰️ Design Philosophy
The design is built on a quiet, minimal, and highly professional terminal aesthetic:
* **Background Environment**: A deep navy-black space backdrop (`#030712`) featuring 150 procedurally generated tiny stars that twinkle and drift slowly, accented by comets/shooting stars crossing the viewport every 15–20 seconds.
* **Typography**: Styled in **JetBrains Mono** with wide letter-spacing, generous line-heights, and clear typographic hierarchy.
* **Colors**: High-contrast terminal output colors: Space Black (`#030712`), primary text (`#E5E7EB`), command prompt green (`#7CFF7C`), accent yellow (`#FACC15`), and link blue (`#38BDF8`).
* **Zero Overhead**: Fully custom hand-crafted code with **no external frameworks** (No Bootstrap, Tailwind, React, Vue, jQuery) and **no external animation engines** (No GSAP) to maintain absolute lightweight performance.

---

## 🛠️ Features
1. **Interactive Typewriter Sequence**: Boots with an automated typing animation simulating `> Hello.` with a blinking terminal cursor.
2. **Pulsing Telemetry Dot**: A pulsing status indicator (`● Available for Work`) representing real-time system capability.
3. **Planetary / Terminal Skills Grid**: Skill stacks rendered as command-line style modules separated by ASCII line dividers (`──────────────`).
4. **Slide-Out Mobile Navigation**: Fully responsive glass-blur navbar with a responsive slide-out drawer on tablet and mobile viewports.
5. **NASA-Style Timeline**: Tracks career growth and milestone updates.
6. **Optimized Performance**: All transitions run on GPU-accelerated CSS properties (`opacity`, `transform`) ensuring fluid 60FPS renders.

---

## 📂 Project Structure
```text
├── index.html       # Semantic HTML5 page structure
├── style.css        # Visual styling, variables, animations, and media queries
├── script.js        # Twinkle generators, typewriter effect, and scroll triggers
├── README.md        # Project documentation
└── assets/
    └── resume.pdf   # Sriram S - Professional Resume Document
```

---

## 🚀 Getting Started & Local Development
Since this project is built entirely on native web standards, you can run it locally without installing any node modules or packages.

### Option 1: File Launch
Simply double-click the `index.html` file in your directory to open it in any modern web browser.

### Option 2: Local HTTP Server (Recommended)
To prevent CORS restrictions and test file attachments cleanly, run a local web server:

**Using Node (npx):**
```bash
npx http-server
```

**Using Python:**
```bash
python -m http.server 8080
```
Then navigate to `http://localhost:8080` in your web browser.

---

## 👤 Author
* **Sriram S** - Web Developer, Android Developer, Digital Marketer, and AI Automation Enthusiast.
* **Contact**: [sriramsri1030@gmail.com](mailto:sriramsri1030@gmail.com)
* **LinkedIn**: [sriram1030](https://www.linkedin.com/in/sriram1030/)
* **GitHub**: [@sriram1030](https://github.com/sriram1030)
