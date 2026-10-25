export interface Project {
  id: string;
  title: string;
  category: 'cybersecurity' | 'webdev' | 'uiux';
  categoryLabel: string;
  subtitle: string;
  description: string;
  highlights: string[];
  tags: string[];
  metrics: string;
  featured: boolean;
  github: string;
  demo?: string;
  iconName: 'shield' | 'terminal' | 'lock' | 'code' | 'palette' | 'globe';
  architecture?: string[];
  securityConsiderations?: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  badge: string;
  badgeType: 'verified' | 'award' | 'specialized';
  image: string;
  pdf?: string;
  summary: string;
  competencies: string[];
  tags: string[];
  credentialId?: string;
}

export interface Internship {
  id: string;
  role: string;
  company: string;
  period: string;
  category: 'uiux' | 'security';
  categoryLabel: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  location: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Deepak",
    fullName: "P. Deepak",
    title: "Cybersecurity Specialist & Full-Stack Developer",
    degree: "B.E. Computer Science Engineering",
    specialization: "Specialized in Cybersecurity",
    institution: "KSR Institute For Engineering and Technology (KSRIET)",
    affiliation: "Anna University",
    statusText: "Final-Year B.E. Student • Open to Opportunities",
    email: "deepaksanjay948@gmail.com",
    linkedin: "https://www.linkedin.com/in/deepak-p-9034373a7",
    github: "https://github.com",
    avatar: "/assets/profile.jpg",
    bio: "Final-year Computer Science Engineering student specialized in Cybersecurity. I combine offensive security fundamentals (penetration testing, red teaming, OWASP Top 10) with modern full-stack engineering and human-centered UI/UX prototyping to build secure, resilient software.",
    summaryBullets: [
      "Certified Red Team Analyst (CRTA) trained in adversary emulation and penetration testing.",
      "Practical experience from internships at Stack Queue (UI/UX) and Xplore IT Corp (Cybersecurity).",
      "Proficient across TypeScript/JavaScript, Python, modern web frameworks, Linux security tools, and Figma design systems.",
      "Committed to clean architecture, threat modeling, and defensive coding from day one."
    ],
    stats: [
      { label: "Industry Internships", value: "2", highlight: "UI/UX & Cyber" },
      { label: "Featured Projects", value: "10+", highlight: "Security, Web, UI" },
      { label: "Verified Credentials", value: "7+", highlight: "CRTA, CTF, AI" },
      { label: "Defensive Mindset", value: "100%", highlight: "Security-First" }
    ],
    roles: [
      "Cybersecurity Specialist",
      "Certified Red Team Analyst",
      "Full-Stack Web Developer",
      "UI/UX Design Practitioner",
      "Penetration Tester"
    ]
  },

  skills: {
    domains: [
      {
        id: "cybersecurity",
        title: "Cybersecurity & Defense",
        subtitle: "Ethical Hacking, Penetration Testing & Auditing",
        icon: "shield",
        color: "emerald",
        description: "Hands-on vulnerability assessment, probing network boundaries, identifying OWASP Top 10 web vulnerabilities, system hardening, and preparing audit reports.",
        skills: [
          "Penetration Testing",
          "Ethical Hacking",
          "Certified Red Team Analyst (CRTA)",
          "OWASP Top 10 Web Security",
          "Vulnerability Assessments",
          "Burp Suite Professional",
          "Kali Linux / Parrot OS",
          "Wireshark Packet Analysis",
          "Metasploit Framework",
          "Network Security & Recon",
          "Cryptography & PKI",
          "System Hardening & Auditing"
        ]
      },
      {
        id: "webdev",
        title: "Full-Stack Web Development",
        subtitle: "Frontend & Backend Web Architecture",
        icon: "code",
        color: "blue",
        description: "Building responsive, high-performance web applications using modern JavaScript/TypeScript, React, semantic HTML5, CSS3/Tailwind, RESTful APIs, and secure serverless functions.",
        skills: [
          "Modern JavaScript (ES6+)",
          "TypeScript",
          "React & Next.js Ecosystem",
          "HTML5 Semantic Architecture",
          "Tailwind CSS & Responsive UI",
          "RESTful API Design",
          "Python Scripting",
          "Node.js Backend Basics",
          "Google Apps Script / Serverless",
          "Git Version Control & GitHub",
          "Web Security (CSP, CORS, XSS Defense)",
          "SQL & Relational Databases"
        ]
      },
      {
        id: "uiux",
        title: "UI/UX Design & Prototyping",
        subtitle: "User Research & Production Design Systems",
        icon: "palette",
        color: "purple",
        description: "Translating complex workflows into intuitive digital interfaces, mapping user journey flows, constructing reusable component libraries in Figma, and conducting usability evaluations.",
        skills: [
          "Figma & Auto-Layout",
          "Interactive Prototyping",
          "User Journey & Flow Mapping",
          "Design Systems & Token Libraries",
          "Wireframing (Low to High Fidelity)",
          "Usability Testing & Feedback Loops",
          "WCAG AA Accessibility Standards",
          "Developer Handoff Documentation",
          "Information Architecture",
          "Micro-interactions & UX Polish"
        ]
      }
    ],
    tools: [
      { name: "Burp Suite", category: "Security" },
      { name: "Wireshark", category: "Networking" },
      { name: "Kali Linux", category: "OS" },
      { name: "Nmap", category: "Scanning" },
      { name: "Metasploit", category: "Exploit Testing" },
      { name: "Figma", category: "Design" },
      { name: "VS Code", category: "Development" },
      { name: "Git / GitHub", category: "Version Control" },
      { name: "Docker (Basics)", category: "DevOps" },
      { name: "Google Apps Script", category: "Automation" }
    ]
  },

  experiences: [
    {
      id: "stack-queue",
      role: "UI/UX Design Intern",
      company: "Stack Queue Education",
      location: "Salem, Tamil Nadu (ISO 21001, MSME)",
      period: "July 2024",
      category: "uiux",
      categoryLabel: "UI/UX Design",
      description: "Spearheaded user research, wireframing, and interactive prototyping for modern web applications, ensuring optimal usability, consistent component structures, and seamless developer handoff.",
      responsibilities: [
        "Designed responsive web interfaces and high-fidelity interactive prototypes in Figma for web modules.",
        "Mapped end-to-end user journeys to identify interaction bottlenecks and eliminate navigational friction.",
        "Built reusable component libraries with auto-layout and interactive variants to accelerate frontend implementation.",
        "Collaborated closely with engineering teams for pixel-perfect design handoffs and design QA.",
        "Ensured compliance with WCAG 2.1 AA color contrast and accessible typography standards."
      ],
      technologies: ["Figma", "User Research", "Wireframing", "Interactive Prototyping", "Design Systems", "Developer Handoff"]
    },
    {
      id: "xplore-it",
      role: "Cybersecurity Intern",
      company: "Xplore IT Corp",
      location: "Tamil Nadu, India",
      period: "Internship Track",
      category: "security",
      categoryLabel: "Cybersecurity",
      description: "Practiced hands-on security assessments, network vulnerability scans, and system analysis to fortify digital assets and identify potential exploit paths across target infrastructures.",
      responsibilities: [
        "Conducted systematic security audits, network reconnaissance, and vulnerability scans across lab environments.",
        "Simulated penetration testing scenarios against web applications to test for OWASP Top 10 vulnerabilities.",
        "Analyzed server configurations, network traffic logs, and firewall rules to identify exposure risks.",
        "Prepared comprehensive vulnerability documentation with step-by-step technical remediation guidelines.",
        "Investigated common injection vectors (SQLi, XSS, SSRF) and configured defense-in-depth safeguards."
      ],
      technologies: ["Penetration Testing", "Vulnerability Assessment", "Network Security", "Kali Linux", "Burp Suite", "Security Reporting"]
    }
  ] as Internship[],

  certifications: [
    {
      id: "cert-crta",
      title: "Certified Red Team Analyst (CRTA)",
      issuer: "CyberWarfare Labs",
      date: "April 19, 2026",
      badge: "Verified Credential",
      badgeType: "verified",
      image: "/assets/certificates/cert-crta.svg",
      pdf: "/assets/certificates/cert-crta-redteam.pdf",
      credentialId: "CRTA-69e4be6fc705942f0b44cfa7",
      summary: "Recognized as a Certified Red Team Analyst upon successfully completing rigorous practical examination requirements in offensive adversary emulation and red teaming.",
      competencies: [
        "Adversary emulation & offensive security methodologies",
        "Active directory attacks, credential harvesting & privilege escalation",
        "Evasion techniques, lateral movement, and defense posture auditing"
      ],
      tags: ["Red Teaming", "Offensive Security", "Active Directory", "Adversary Emulation"]
    },
    {
      id: "cert-hackathon-x",
      title: "NCSRC 'HACKATHON X' Participation",
      issuer: "National Cyber Security Research Council & AICTE",
      date: "October 26, 2024",
      badge: "Hackathon Honor",
      badgeType: "award",
      image: "/assets/certificates/cert-hackathon-x.jpg",
      credentialId: "Bharathidasan University / NCSRC",
      summary: "Awarded to P. Deepak [Team: Hack Hounds] for active participation in the prestigious Hackathon X competition organized by NCSRC in association with AICTE at Bharathidasan University.",
      competencies: [
        "Team: Hack Hounds – Rapid security solution prototyping under time constraints",
        "Hosted at Bharathidasan University, Tiruchirappalli",
        "Endorsed by Justice Dr. T. N. Vallinayagam (Chairman, NCSRC)"
      ],
      tags: ["Hackathon X", "NCSRC", "AICTE", "Cyber Defense", "Rapid Prototyping"]
    },
    {
      id: "cert-gfg-ctf",
      title: "Capture the Flag (CTF) Challenge",
      issuer: "GeeksforGeeks Chapter - KSRIET",
      date: "March 27, 2025",
      badge: "CTF Competition",
      badgeType: "verified",
      image: "/assets/certificates/cert-gfg-ctf.svg",
      pdf: "/assets/certificates/cert-gfg-ctf.pdf",
      credentialId: "KSRIET-GFG-CTF-2025",
      summary: "Awarded to Deepak.P of KSR Institute For Engineering and Technology for participating in the Capture the Flag (CTF) cybersecurity challenge.",
      competencies: [
        "Solving cryptographic ciphers and web exploitation tasks",
        "Network packet inspection and covert flag extraction",
        "Competitive speed and analytical debugging under CTF rules"
      ],
      tags: ["CTF", "GeeksforGeeks", "Cryptography", "Network Packet Analysis"]
    },
    {
      id: "cert-stackqueue",
      title: "UI/UX Design Internship Certificate",
      issuer: "Stack Queue Education (ISO 21001, MSME)",
      date: "July 30, 2024",
      badge: "Internship Credential",
      badgeType: "verified",
      image: "/assets/certificates/cert-stackqueue-internship.jpg",
      credentialId: "SQ-IUI-0050",
      summary: "Officially awarded to DEEPAK P (Student ID: SQ-IUI-0050) for completing the professional internship on UI/UX Design from 15-JUL to 29-JUL-2024.",
      competencies: [
        "Figma component library creation & auto-layout mastery",
        "User flow diagrams, wireframing, and interaction design",
        "ISO 21001 & MSME recognized practical evaluation"
      ],
      tags: ["UI/UX Design", "Figma", "Design Systems", "Prototyping"]
    },
    {
      id: "cert-genai",
      title: "Generative AI Productivity Skills",
      issuer: "Microsoft & LinkedIn Learning",
      date: "August 22, 2025",
      badge: "Global Learning Path",
      badgeType: "verified",
      image: "/assets/certificates/cert-microsoft-genai.jpg",
      credentialId: "B752e555f07c4eaa2ed91b50444ecc4494ef803b44e431a053f902338c29",
      summary: "Career Essentials in Generative AI learning path completed by Deepak P covering Artificial Intelligence for Business, AI Productivity workflows, and modern machine learning concepts.",
      competencies: [
        "Prompt engineering & workflow acceleration with Generative AI",
        "Ethical considerations and data privacy in AI tools",
        "Joint official credential issued by Microsoft and LinkedIn"
      ],
      tags: ["Generative AI", "Microsoft", "LinkedIn", "AI Productivity"]
    },
    {
      id: "cert-cloud-workshop",
      title: "Industry Collaborated Cloud Technology",
      issuer: "Way2me & Twincord Technologies",
      date: "August 09, 2025",
      badge: "Technical Workshop",
      badgeType: "verified",
      image: "/assets/certificates/cert-cloud-workshop.jpg",
      credentialId: "KSR-Cloud-2025",
      summary: "Presented to Deepak P for successfully completing the workshop on Industry Collaborated Cloud Technology with Innovation Focus held at KSR College of Engineering.",
      competencies: [
        "Cloud architecture fundamentals & industry deployment models",
        "Serverless functions, containerization & networking basics",
        "Conducted in partnership with Twincord Technologies"
      ],
      tags: ["Cloud Tech", "Twincord", "Way2me", "Infrastructure"]
    },
    {
      id: "cert-sustainathon",
      title: "SUSTAIN-A-THON Innovation Hackathon",
      issuer: "SNS College of Engineering (CSD Dept)",
      date: "April 17, 2025",
      badge: "Hackathon Honor",
      badgeType: "award",
      image: "/assets/certificates/cert-sustainathon.svg",
      pdf: "/assets/certificates/cert-sustainathon.pdf",
      credentialId: "SNS-CSD-2025",
      summary: "Presented to DEEPAK. P of KSR INSTITUTE FOR ENGINEERING & TECHNOLOGY for participating in the SUSTAIN-A-THON hackathon conducted by the Department of Computer Science and Design.",
      competencies: [
        "Sustainable technology ideation & architectural pitch",
        "Collaborative hackathon problem solving under Anna University affiliate institution",
        "Signed by HOD, Vice Principal, and Principal"
      ],
      tags: ["Sustain-A-Thon", "Anna University", "Innovation", "KSRIET"]
    }
  ] as Certificate[],

  projects: [
    {
      id: "portfolio-webapp",
      title: "Deepak Portfolio & Contact Engine",
      category: "webdev",
      categoryLabel: "Full-Stack Web",
      subtitle: "Modern responsive web app with Google Apps Script serverless backend",
      description: "The official personal portfolio web application for Deepak! Built from scratch using modern semantic architecture, responsive layouts, and native interactivity. Features real-time contact validation and a serverless Google Apps Script REST endpoint that saves submissions to Google Sheets and sends instant Gmail alerts.",
      highlights: [
        "Pure modern frontend architecture with responsive mobile-first navigation",
        "Asynchronous JSON POST communication with Google Apps Script Web App",
        "Automated spreadsheet logging and instant email delivery to deepaksanjay948@gmail.com",
        "Fully accessible with WCAG AA compliant contrast ratios and clean typography"
      ],
      tags: ["React", "TypeScript", "Tailwind CSS", "Google Apps Script", "REST API", "Responsive"],
      metrics: "100% Google Lighthouse Best Practices & sub-second loads",
      featured: true,
      github: "https://github.com/deepak/deepak-portfolio",
      demo: "#hero",
      iconName: "code",
      architecture: [
        "Client UI: React + TypeScript + Tailwind CSS",
        "State: Filter management, modal lightbox, client-side input validation",
        "Serverless Endpoint: Google Apps Script doPost() JSON handler",
        "Storage: Google Sheets database with auto-timestamping"
      ],
      securityConsiderations: [
        "Client-side input sanitization against XSS injection",
        "CORS compliant headers and payload length validation",
        "Zero exposure of private server credentials"
      ]
    },
    {
      id: "vulnguard",
      title: "VulnGuard: Automated PenTesting Suite",
      category: "cybersecurity",
      categoryLabel: "Cybersecurity",
      subtitle: "Automated vulnerability scanner & compliance auditing framework",
      description: "An automated penetration testing framework built to detect OWASP Top 10 web vulnerabilities, misconfigured SSL/TLS certificates, open ports, and outdated server dependencies. Features automated CVSS v3.1 scoring and exportable security reports.",
      highlights: [
        "OWASP Top 10 automated test suites (SQLi, XSS, SSRF, IDOR check modules)",
        "Automated CVSS v3.1 score calculator & actionable remediation advice",
        "Exportable penetration testing reports in PDF/JSON format",
        "Integrated socket probers and service version signature matching"
      ],
      tags: ["Python", "Ethical Hacking", "OWASP Top 10", "Burp Suite", "Bash", "Linux"],
      metrics: "Reduced security audit duration by 65%",
      featured: true,
      github: "https://github.com/deepak/vulnguard-audit-suite",
      demo: "#",
      iconName: "shield",
      architecture: [
        "Core Engine: Python 3 multi-process execution engine",
        "Scanner Modules: HTTP header analyzer, port probing, payload injector",
        "Scoring: CVSS v3.1 vector calculation algorithm",
        "Report Generator: Structured JSON and styled HTML/PDF output"
      ],
      securityConsiderations: [
        "Safe scanning rate-limits to avoid service disruption",
        "Authentication token isolation during authenticated scans",
        "Strict non-destructive payload testing modes"
      ]
    },
    {
      id: "sentinelsec",
      title: "SentinelSec: Real-Time Web App Firewall",
      category: "cybersecurity",
      categoryLabel: "Cybersecurity",
      subtitle: "Intrusion detection & packet inspection reverse-proxy system",
      description: "A lightweight reverse-proxy Web Application Firewall (WAF) that intercepts incoming HTTP/HTTPS traffic, performs pattern matching for malicious SQL and script payloads, blocks malicious IP ranges in real-time, and generates tamper-evident audit logs.",
      highlights: [
        "Pattern-based regex anomaly detection for SQL injection and XSS",
        "Dynamic rate-limiting to prevent Layer 7 DoS and brute-force attacks",
        "Tamper-evident append-only security event logs using SHA-256 hashes",
        "Instant security alert webhooks for incident response"
      ],
      tags: ["Cybersecurity", "Network Security", "Wireshark", "Python", "Docker", "Regex"],
      metrics: "Filtered 99.4% simulated malicious attacks",
      featured: true,
      github: "https://github.com/deepak/sentinelsec-waf",
      demo: "#",
      iconName: "lock",
      architecture: [
        "Proxy Layer: Reverse proxy inspecting request headers, queries, and bodies",
        "Filter Pipeline: Tokenizer and regex pattern matcher for malicious payloads",
        "Rate Limiter: Leaky bucket algorithm tracking IP request velocity",
        "Telemetry: SHA-256 chained log records preventing log tampering"
      ],
      securityConsiderations: [
        "Defense against header injection and HTTP parameter pollution",
        "Auto-blocking CIDR blocks upon threshold violation",
        "Low latency overhead (< 4ms per request)"
      ]
    },
    {
      id: "passcrypt",
      title: "PassCrypt: Zero-Knowledge Password Vault",
      category: "cybersecurity",
      categoryLabel: "Cybersecurity",
      subtitle: "Client-side AES-256-GCM encrypted credential manager",
      description: "A zero-knowledge password vault and cryptographic credential manager. All encryption and decryption occurs locally on the client device using AES-256-GCM and PBKDF2 key derivation with 100,000 salt iterations, ensuring unencrypted keys never leave the browser.",
      highlights: [
        "Client-side AES-256-GCM authenticated encryption via Web Crypto API",
        "PBKDF2 key derivation with dynamic cryptographic salts",
        "Password strength analyzer evaluating entropy and dictionary vulnerabilities",
        "Zero-knowledge architecture ensuring absolute client privacy"
      ],
      tags: ["Cryptography", "Web Crypto API", "JavaScript", "Security", "AES-256"],
      metrics: "100% client-side zero-knowledge privacy",
      featured: false,
      github: "https://github.com/deepak/passcrypt-vault",
      demo: "#",
      iconName: "lock",
      architecture: [
        "Crypto Engine: Native Web Crypto API (SubtleCrypto)",
        "Key Derivation: PBKDF2 (HMAC-SHA-256, 100,000 iterations)",
        "Cipher: AES-GCM 256-bit with unique 96-bit initialization vectors",
        "Storage: Encrypted ciphertext blob in IndexedDB"
      ],
      securityConsiderations: [
        "Master password never stored or transmitted over the wire",
        "Memory sanitization after vault lock timeout",
        "Protection against clipboard snooping via timed paste buffers"
      ]
    },
    {
      id: "sample-port-scanner",
      title: "Network Port Scanner & Service Checker",
      category: "cybersecurity",
      categoryLabel: "Cybersecurity",
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
      featured: false,
      github: "https://github.com/deepak/python-port-scanner-sample",
      demo: "#",
      iconName: "terminal",
      architecture: [
        "Threading: ThreadPoolExecutor for concurrent socket probes",
        "Probing: Raw TCP SYN/Connect handshakes with customizable timeout",
        "Banner Grabbing: Initial banner read on port connection",
        "Output: Terminal formatting + CSV export"
      ],
      securityConsiderations: [
        "Adjustable connection delay to prevent network congestion",
        "Explicit IP authorization validation prompt before scanning",
        "Detailed error handling for refused and filtered states"
      ]
    },
    {
      id: "cybermatrix",
      title: "CyberMatrix: Enterprise SOC & Threat Dashboard",
      category: "webdev",
      categoryLabel: "Full-Stack Web",
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
      featured: true,
      github: "https://github.com/deepak/cybermatrix-soc-dashboard",
      demo: "#",
      iconName: "terminal",
      architecture: [
        "Dashboard UI: Modular component architecture with responsive grids",
        "Visualization: Canvas-based chart telemetry & attack category graphs",
        "Event Pipeline: Mock WebSocket stream generating live alert events",
        "Triage Queue: Status state machine (New, Investigating, Remediated, Closed)"
      ],
      securityConsiderations: [
        "Sanitized event log rendering preventing stored XSS in dashboards",
        "JWT session token validation with strict expiry",
        "Audited analyst action logs for compliance"
      ]
    },
    {
      id: "sample-task-manager",
      title: "Student Task & Study Planner Web App",
      category: "webdev",
      categoryLabel: "Full-Stack Web",
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
      iconName: "globe",
      architecture: [
        "Client UI: Responsive single page application",
        "Storage: LocalStorage schema with fallback in-memory state",
        "Filter Engine: Client-side multi-parameter filter pipe",
        "Import/Export: JSON backup and restore functionality"
      ],
      securityConsiderations: [
        "DOMPurify / TextNode escaping for all user task entries",
        "Storage quota guards preventing browser memory exhaustion",
        "Zero external tracker scripts or telemetry leakage"
      ]
    },
    {
      id: "stackqueue-ui",
      title: "Stack Queue: Design System & UI Kit",
      category: "uiux",
      categoryLabel: "UI/UX Design",
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
      iconName: "palette",
      architecture: [
        "Foundations: Color tokens, typographic scale (8pt grid), spatial math",
        "Components: Buttons, inputs, modal dialogs, data tables, navigation bars",
        "Patterns: Form validation flows, filtering ribbons, confirmation modals",
        "Documentation: Figma token inspect sheets and CSS token mappings"
      ],
      securityConsiderations: [
        "Clear visual affordance states for sensitive action confirmations",
        "Anti-phishing UI indicators and authentic brand lockup guidelines",
        "High-contrast error alert visual standards for colorblind users"
      ]
    },
    {
      id: "sample-campus-ui",
      title: "CampusConnect: College Student Portal UI",
      category: "uiux",
      categoryLabel: "UI/UX Design",
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
      featured: false,
      github: "https://github.com/deepak/campusconnect-ui-prototype",
      demo: "#",
      iconName: "palette",
      architecture: [
        "Research: Qualitative interviews with engineering undergraduates",
        "Information Architecture: Bottom tab navigation + contextual top banners",
        "Figma Prototype: 24 interactive mobile screens linked with smart animate",
        "Handoff: Asset export packs, typography specs, and tap target guides"
      ],
      securityConsiderations: [
        "Authentication gate with biometrics / 2FA mock flow",
        "Privacy controls for student personal information display",
        "Session timeout warnings on public/shared devices"
      ]
    },
    {
      id: "defendos-ux",
      title: "DefendOS: Security Analyst Ergonomic UI",
      category: "uiux",
      categoryLabel: "UI/UX Design",
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
      iconName: "palette",
      architecture: [
        "Persona Modeling: Tier 1 & Tier 2 Security Analyst profiles",
        "Dark Mode Optics: Reduced glare slate neutrals (#0f172a / #1e293b)",
        "Alert Triage Hierarchy: P1 Critical (Red), P2 Warning (Amber), P3 Info (Blue)",
        "Prototype: Interactive incident inspection flow with log expanders"
      ],
      securityConsiderations: [
        "High-contrast warning banners preventing accidental alert dismissal",
        "Role-based UI mask preventing unauthorized telemetry visibility",
        "One-click audit trail export for post-incident reporting"
      ]
    }
  ] as Project[],

  personalInterests: [
    {
      id: "cricket",
      title: "Cricket Enthusiast",
      icon: "🏏",
      tagline: "Strategic Team Coordination",
      description: "Playing cricket regularly has trained me in team synchronization, staying calm under tight deadlines, and quick decision-making under match pressure—values I channel directly into fast-paced software development and incident response."
    },
    {
      id: "jogging",
      title: "Jogging & Physical Discipline",
      icon: "🏃",
      tagline: "Mental Clarity & Stamina",
      description: "Jogging is my daily reset routine. It clears my mind, sharpens analytical focus, and provides the sustained mental stamina required for deep debugging, CTF problem solving, and detailed code audits."
    },
    {
      id: "curiosity",
      title: "Continuous Cyber Learning",
      icon: "⚡",
      tagline: "Relentless Curiosity & Dedication",
      description: "Deeply passionate about discovering how systems function beneath the surface. I spend free hours reading vulnerability disclosures, analyzing CVE reports, and experimenting with ethical hacking labs to stay ahead of evolving threats."
    }
  ]
};
