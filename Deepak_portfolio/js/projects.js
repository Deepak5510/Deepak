/**
 * =========================================================================
 * DEEPAK PORTFOLIO - PROJECT REPOSITORY
 * =========================================================================
 * 
 * 💡 HOW TO ADD OR REPLACE WITH YOUR REAL PROJECTS IN THE FUTURE:
 * 1. Find any project below (or copy one of the objects).
 * 2. Update the 'title', 'subtitle', 'description', 'highlights', and 'tags'.
 * 3. Update 'category' to: 'cybersecurity', 'webdev', or 'uiux'.
 * 4. Add your GitHub repository link and Live Demo link!
 * =========================================================================
 */

export const PROJECTS = [
  // -------------------------------------------------------------------------
  // 1. FULL-STACK WEB PROJECT (This Exact Website!)
  // -------------------------------------------------------------------------
  {
    id: "portfolio-webapp",
    title: "Deepak Portfolio & Contact Engine",
    category: "webdev",
    subtitle: "Modern responsive web app with Google Apps Script serverless backend",
    description: "The official personal portfolio web application for Deepak! Built from scratch using modern semantic HTML5, clean responsive CSS3, and native ES6+ JavaScript. Features real-time contact validation and a serverless Google Apps Script REST endpoint that saves submissions to Google Sheets and sends instant Gmail alerts.",
    highlights: [
      "Pure frontend architecture with zero build-step dependencies",
      "Asynchronous JSON POST communication with Google Apps Script Web App",
      "Automated spreadsheet logging and instant email delivery to deepaksanjay948@gmail.com",
      "Fully responsive across mobile, tablet, and desktop with accessible contrast standards"
    ],
    tags: ["Full-Stack", "JavaScript ES6+", "HTML5/CSS3", "Google Apps Script", "REST API", "Responsive"],
    metrics: "100% Google Lighthouse Best Practices & sub-second loads",
    featured: true,
    github: "https://github.com/deepak/deepak-portfolio",
    demo: "#hero",
    icon: "code"
  },

  // -------------------------------------------------------------------------
  // 2. CYBERSECURITY SAMPLE PROJECT (Student Starter Template)
  // -------------------------------------------------------------------------
  {
    id: "sample-port-scanner",
    title: "Network Port Scanner & Service Checker",
    category: "cybersecurity",
    subtitle: "Python socket tool for detecting open ports & service banners",
    description: "A lightweight, multi-threaded network scanner developed in Python. Probes target IP ranges for common open ports (21, 22, 25, 80, 443, 3306), grabs service version banners, and helps identify misconfigured network services during basic security audits.",
    highlights: [
      "Multi-threaded TCP connection scanning using Python's native socket library",
      "Service banner grabbing to identify outdated server software versions",
      "Clean CLI output with exportable audit logs in JSON and CSV formats",
      "Lightweight, standalone script easily customizable for specific lab networks"
    ],
    tags: ["Cybersecurity", "Python", "Networking", "Sockets", "Penetration Testing"],
    metrics: "Scans top 100 ports in under 3 seconds",
    featured: true,
    github: "https://github.com/deepak/python-port-scanner-sample",
    demo: "#",
    icon: "shield-alert"
  },

  // -------------------------------------------------------------------------
  // 3. UI/UX DESIGN SAMPLE PROJECT (Student Starter Template)
  // -------------------------------------------------------------------------
  {
    id: "sample-campus-ui",
    title: "CampusConnect: College Student Portal UI",
    category: "uiux",
    subtitle: "Figma mobile wireframes & interactive prototype for student workflows",
    description: "An intuitive mobile app UI/UX prototype created in Figma. Designed to streamline academic schedules, exam timetables, campus club events, and security notifications for engineering students through clean user flow mapping and accessible contrast design.",
    highlights: [
      "Conducted user interviews with 15+ classmates to understand portal friction",
      "Created complete low-fidelity wireframes and high-fidelity interactive Figma flows",
      "Designed reusable design tokens, auto-layout components, and micro-interactions",
      "Optimized navigation hierarchy for 1-click access to critical announcements"
    ],
    tags: ["UI/UX Design", "Figma", "User Research", "Wireframing", "Mobile UI"],
    metrics: "35% faster task completion in usability tests",
    featured: true,
    github: "https://github.com/deepak/campusconnect-ui-prototype",
    demo: "#",
    icon: "palette"
  },

  // -------------------------------------------------------------------------
  // 4. FULL-STACK WEB SAMPLE PROJECT (Student Starter Template)
  // -------------------------------------------------------------------------
  {
    id: "sample-task-manager",
    title: "Student Task & Study Planner Web App",
    category: "webdev",
    subtitle: "Responsive productivity manager with priority tags & local sync",
    description: "A clean, accessible full-stack productivity web application designed for engineering students. Features category tagging (Cybersecurity, Web Dev, Coursework), priority filters, interactive checklists, and local persistence with input sanitization.",
    highlights: [
      "Clean responsive user interface built with semantic HTML5 and modern CSS3",
      "LocalStorage persistence with optional REST API synchronization",
      "Strict input sanitization preventing Cross-Site Scripting (XSS) attacks",
      "Filter tasks by status, course domain, and deadline urgency"
    ],
    tags: ["Full-Stack", "JavaScript", "HTML5/CSS3", "Web Dev", "REST API"],
    metrics: "100% offline-ready local synchronization",
    featured: false,
    github: "https://github.com/deepak/student-task-manager-webapp",
    demo: "#",
    icon: "terminal"
  },

  // -------------------------------------------------------------------------
  // 5. ADVANCED CYBERSECURITY PROJECT: VulnGuard
  // -------------------------------------------------------------------------
  {
    id: "vulnguard",
    title: "VulnGuard: Automated PenTesting & Audit Suite",
    category: "cybersecurity",
    subtitle: "Automated vulnerability scanner & compliance auditing framework",
    description: "An automated penetration testing framework built to detect OWASP Top 10 web vulnerabilities, misconfigured SSL/TLS certificates, open ports, and outdated server dependencies. Features automated CVSS v3.1 scoring and exportable security reports.",
    highlights: [
      "OWASP Top 10 automated test suites (SQLi, XSS, SSRF, IDOR)",
      "Automated CVSS v3.1 score calculator & remediation advisor",
      "Exportable penetration testing reports in PDF/JSON format",
      "Integrated Nmap and Nikto wrapper modules with concurrency"
    ],
    tags: ["Python", "Ethical Hacking", "OWASP Top 10", "Burp Suite", "Bash", "Linux"],
    metrics: "Reduced security audit duration by 65%",
    featured: true,
    github: "https://github.com/deepak/vulnguard-audit-suite",
    demo: "#",
    icon: "shield-alert"
  },

  // -------------------------------------------------------------------------
  // 6. CYBERSECURITY: SentinelSec WAF
  // -------------------------------------------------------------------------
  {
    id: "sentinelsec",
    title: "SentinelSec: Real-Time Web Application Firewall",
    category: "cybersecurity",
    subtitle: "Intrusion detection & packet inspection system",
    description: "A lightweight reverse-proxy Web Application Firewall (WAF) that intercepts incoming HTTP/HTTPS traffic, performs pattern matching for malicious SQL and script payloads, blocks malicious IP ranges in real-time, and generates audit logs.",
    highlights: [
      "Pattern-based regex anomaly detection for SQL injection and XSS",
      "Dynamic rate-limiting to prevent Layer 7 DoS and brute-force attacks",
      "Tamper-evident append-only security event logs using SHA-256 hashes",
      "Instant security alert webhooks for incident response"
    ],
    tags: ["Cybersecurity", "Network Security", "Wireshark", "Python", "Docker", "Regex"],
    metrics: "Filtered 99.4% simulated malicious attacks",
    featured: false,
    github: "https://github.com/deepak/sentinelsec-waf",
    demo: "#",
    icon: "lock"
  },

  // -------------------------------------------------------------------------
  // 7. CYBERSECURITY: PassCrypt Vault
  // -------------------------------------------------------------------------
  {
    id: "passcrypt",
    title: "PassCrypt: Zero-Knowledge Password Vault",
    category: "cybersecurity",
    subtitle: "Client-side AES-256-GCM encrypted credential manager",
    description: "A zero-knowledge password vault and cryptographic credential manager. All encryption and decryption occurs locally on the client device using AES-256-GCM and PBKDF2 key derivation with 100,000 salt iterations, ensuring unencrypted keys never leave the browser.",
    highlights: [
      "Client-side AES-256-GCM authenticated encryption",
      "PBKDF2 key derivation with dynamic cryptographic salts",
      "Password strength analyzer evaluating entropy and breach databases",
      "Zero-knowledge architecture ensuring absolute client privacy"
    ],
    tags: ["Cryptography", "Web Crypto API", "JavaScript", "Security", "AES-256"],
    metrics: "100% client-side zero-knowledge privacy",
    featured: false,
    github: "https://github.com/deepak/passcrypt-vault",
    demo: "#",
    icon: "lock"
  },

  // -------------------------------------------------------------------------
  // 8. FULL-STACK: CyberMatrix SOC Dashboard
  // -------------------------------------------------------------------------
  {
    id: "cybermatrix",
    title: "CyberMatrix: Enterprise SOC & Threat Dashboard",
    category: "webdev",
    subtitle: "Security operations telemetry & live incident triage platform",
    description: "An enterprise-grade, clean SOC (Security Operations Center) monitoring dashboard. Delivers live telemetry feeds, real-time threat maps, attack surface graphs, and ticket triage workflows for cybersecurity analyst teams.",
    highlights: [
      "Real-time interactive threat intelligence telemetry visualization",
      "Role-Based Access Control (RBAC) with secure session handling",
      "Optimized frontend rendering with sub-100ms load times",
      "RESTful API backend handling high-frequency log events"
    ],
    tags: ["Full-Stack", "JavaScript ES6+", "HTML5/CSS3", "REST APIs", "Node.js", "Chart.js"],
    metrics: "< 100ms telemetry update latency",
    featured: false,
    github: "https://github.com/deepak/cybermatrix-soc-dashboard",
    demo: "#",
    icon: "terminal"
  },

  // -------------------------------------------------------------------------
  // 9. UI/UX DESIGN: Stack Queue Design System
  // -------------------------------------------------------------------------
  {
    id: "stackqueue-ui",
    title: "Stack Queue: Interactive Design System & UI Kit",
    category: "uiux",
    subtitle: "Production component library & interactive prototype system",
    description: "Crafted during internship at Stack Queue: a complete multi-tier design system and interactive prototype kit. Designed from user research and usability testing sessions, providing consistent component tokens and developer handoff specs.",
    highlights: [
      "Complete Figma component library with auto-layout and interactive states",
      "Conducted 15+ user usability interviews to streamline workflow friction",
      "WCAG 2.1 AA compliant color contrast and keyboard navigation specs",
      "Rapid developer handoff system cutting frontend implementation time by 40%"
    ],
    tags: ["UI/UX Design", "Figma", "Design Systems", "User Research", "Wireframing"],
    metrics: "40% faster developer handoff time",
    featured: true,
    github: "https://github.com/deepak/stackqueue-design-system",
    demo: "#",
    icon: "palette"
  },

  // -------------------------------------------------------------------------
  // 10. UI/UX DESIGN: DefendOS Interface
  // -------------------------------------------------------------------------
  {
    id: "defendos-ux",
    title: "DefendOS: Security Analyst Ergonomic Interface",
    category: "uiux",
    subtitle: "Human-centered UX research & UI prototype for PenTesters",
    description: "A specialized UX research and high-fidelity interface design project tailored for cybersecurity professionals. Solved visual fatigue during incident response operations through optimized contrast science and cognitive load reduction.",
    highlights: [
      "In-depth cognitive walkthroughs with ethical hackers & incident responders",
      "Ergonomic color science reducing cognitive fatigue during critical sessions",
      "Interactive high-fidelity prototypes demonstrating complex security triage",
      "Information architecture designed for high-stress, time-critical decisions"
    ],
    tags: ["UI/UX Research", "Figma", "Usability Testing", "Cybersecurity UX", "Prototyping"],
    metrics: "Reduced cognitive task completion time by 32%",
    featured: false,
    github: "https://github.com/deepak/defendos-ux-case-study",
    demo: "#",
    icon: "palette"
  }
];
