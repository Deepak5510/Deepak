/**
 * Deepak Portfolio - Main Application Controller
 * Clean, lightweight, professional interactions for final-year engineering student portfolio
 */

import { CONFIG } from "./config.js";
import { PROJECTS } from "./projects.js";
import { initContactForm, showToast } from "./contact.js";

document.addEventListener("DOMContentLoaded", () => {
  // Update footer year dynamically
  const yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.innerText = new Date().getFullYear();

  // Initialize Contact Form & Google Apps Script integration
  initContactForm();

  // Initialize UI Features
  initNavbar();
  initHeroTyping();
  initProjects();
  initCertificatesModal();
  initCounters();
  initScrollEffects();
  initGlobalActions();
});

/**
 * Navbar & Scroll Spy Controller
 */
function initNavbar() {
  const header = document.getElementById("main-header");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const progressBar = document.getElementById("scroll-progress-bar");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY > 30) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }

    // Scroll reading progress
    if (progressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      progressBar.style.width = `${progress}%`;
    }

    // Active Section Spy
    const sections = document.querySelectorAll("section[id]");
    let currentId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 110;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  });

  // Mobile Menu Toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("nav-open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen);
      document.body.classList.toggle("no-scroll", isOpen);
    });

    // Close menu when clicking link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("nav-open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("no-scroll");
      });
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        const headerOffset = 76;
        const elementPosition = targetElem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}

/**
 * Hero Typing Text Effect
 */
function initHeroTyping() {
  const typingElement = document.getElementById("hero-dynamic-text");
  if (!typingElement) return;

  const roles = CONFIG.profile.roles;
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/**
 * Projects Rendering & Filtering
 */
function initProjects() {
  const container = document.getElementById("projects-grid");
  const filterBtns = document.querySelectorAll(".project-filter-btn");
  if (!container) return;

  let activeCategory = "all";

  function render(category = "all") {
    container.innerHTML = "";
    const filtered = category === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === category);

    if (filtered.length === 0) {
      container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #64748b;">No projects in this category.</div>`;
      return;
    }

    filtered.forEach((project) => {
      const card = document.createElement("article");
      card.className = "project-card";

      const categoryLabel = {
        cybersecurity: "Cybersecurity",
        webdev: "Full-Stack Web",
        uiux: "UI/UX Design"
      }[project.category] || project.category;

      const categoryClass = {
        cybersecurity: "tag-cyber",
        webdev: "tag-web",
        uiux: "tag-ux"
      }[project.category] || "tag-web";

      card.innerHTML = `
        <div class="project-top-row">
          <span class="category-tag ${categoryClass}">${categoryLabel}</span>
          <div class="project-icon-wrapper">
            ${getProjectIcon(project.icon)}
          </div>
        </div>

        <h3 class="project-main-title">${project.title}</h3>
        <p class="project-tagline">${project.subtitle}</p>
        <p class="project-body-desc">${project.description.slice(0, 130)}...</p>

        <div class="project-metrics-pill">
          <span>✓</span>
          <span>${project.metrics}</span>
        </div>

        <div class="project-tech-tags">
          ${project.tags.map((t) => `<span class="tech-pill">${t}</span>`).join("")}
        </div>

        <div class="project-card-footer">
          <button class="btn btn-sm btn-ghost view-project-btn" data-id="${project.id}">
            Project Details →
          </button>
          <div class="project-links-wrap">
            <a href="${project.github}" target="_blank" rel="noopener" class="code-link-btn" aria-label="GitHub Repository" title="View Source Code">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      `;

      const viewBtn = card.querySelector(".view-project-btn");
      viewBtn.addEventListener("click", () => openProjectModal(project));

      container.appendChild(card);
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.getAttribute("data-filter");
      render(activeCategory);
    });
  });

  render("all");
}

function getProjectIcon(name) {
  switch (name) {
    case "shield-alert":
      return `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#059669" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
    case "lock":
      return `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#059669" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
    case "terminal":
      return `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#2563eb" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`;
    case "code":
      return `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#2563eb" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
    case "palette":
      return `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#7c3aed" stroke-width="2"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`;
    default:
      return `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#2563eb" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`;
  }
}

/**
 * Open Project Details Modal (Clean Light Styling)
 */
function openProjectModal(project) {
  const existing = document.getElementById("project-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "project-modal";
  modal.className = "cyber-modal-overlay active";
  modal.innerHTML = `
    <div class="cyber-modal-content">
      <div class="modal-header">
        <div class="modal-title-wrap">
          <span style="font-size: 0.78rem; font-weight: 700; color: #2563eb; text-transform: uppercase;">${project.category}</span>
          <h3>${project.title}</h3>
        </div>
        <button class="modal-close-btn" id="project-modal-close">&times;</button>
      </div>

      <div class="modal-body">
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem 1.25rem;">
          <p style="font-size: 0.95rem; font-weight: 600; color: #0f172a; margin-bottom: 0.25rem;">${project.subtitle}</p>
          <div style="font-size: 0.85rem; color: #059669; font-weight: 700;">
            Key Impact: ${project.metrics}
          </div>
        </div>

        <div>
          <h4 style="font-size: 1rem; font-weight: 700; color: #0f172a; margin-bottom: 0.5rem;">Overview</h4>
          <p style="font-size: 0.92rem; color: #334155; line-height: 1.6;">${project.description}</p>
        </div>

        <div>
          <h4 style="font-size: 1rem; font-weight: 700; color: #0f172a; margin-bottom: 0.5rem;">Key Engineering & Security Implementations</h4>
          <ul style="display: flex; flex-direction: column; gap: 0.45rem; font-size: 0.9rem; color: #334155;">
            ${project.highlights.map((h) => `<li style="padding-left: 1.2rem; position: relative;"><span style="position: absolute; left: 0; color: #2563eb;">•</span> ${h}</li>`).join("")}
          </ul>
        </div>

        <div>
          <h4 style="font-size: 1rem; font-weight: 700; color: #0f172a; margin-bottom: 0.5rem;">Technologies Used</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
            ${project.tags.map((t) => `<span class="tech-pill">${t}</span>`).join("")}
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="project-modal-close-btn">Close</button>
        <a href="${project.github}" target="_blank" rel="noopener" class="btn btn-primary">
          View on GitHub ↗
        </a>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const close = () => {
    modal.classList.remove("active");
    setTimeout(() => modal.remove(), 200);
  };

  modal.querySelector("#project-modal-close").addEventListener("click", close);
  modal.querySelector("#project-modal-close-btn").addEventListener("click", close);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });
}

/**
 * Certificate Preview Modal Controller
 */
function initCertificatesModal() {
  document.querySelectorAll(".view-cert-trigger").forEach((el) => {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      const card = this.closest(".cert-card-standalone");
      if (!card) return;

      const imgSrc = card.getAttribute("data-cert-img") || card.querySelector("img")?.src;
      const title = card.getAttribute("data-cert-title") || card.querySelector(".cert-main-title")?.innerText;
      const issuer = card.getAttribute("data-cert-issuer") || card.querySelector(".cert-domain-label")?.innerText;
      const credId = card.getAttribute("data-cert-id") || "";

      openCertificateModal(imgSrc, title, issuer, credId);
    });
  });
}

function openCertificateModal(imgSrc, title, issuer, credId) {
  const existing = document.getElementById("certificate-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "certificate-modal";
  modal.className = "cyber-modal-overlay active";
  modal.innerHTML = `
    <div class="cyber-modal-content cert-modal-dialog">
      <div class="modal-header">
        <div class="modal-title-wrap">
          <span style="font-size: 0.78rem; font-weight: 700; color: #059669; text-transform: uppercase;">VERIFIED CREDENTIAL</span>
          <h3>${title || "Professional Certificate"}</h3>
        </div>
        <button class="modal-close-btn" id="cert-modal-close">&times;</button>
      </div>

      <div class="modal-body" style="align-items: center; text-align: center;">
        <div style="width: 100%; overflow: auto; border-radius: 8px;">
          <img src="${imgSrc}" alt="${title}" class="cert-modal-img" />
        </div>
        <div style="display: flex; justify-content: space-between; width: 100%; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.75rem;">
          <span style="font-size: 0.9rem; font-weight: 600; color: #334155;">Issuer: ${issuer || "Verified Organization"}</span>
          ${credId ? `<span style="font-family: monospace; font-size: 0.85rem; color: #059669; background: #ecfdf5; padding: 0.2rem 0.6rem; border-radius: 4px;">ID: ${credId}</span>` : ""}
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="cert-modal-close-btn">Close</button>
        <a href="${imgSrc}" target="_blank" download class="btn btn-primary">
          Open Full Resolution ↗
        </a>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const close = () => {
    modal.classList.remove("active");
    setTimeout(() => modal.remove(), 200);
  };

  modal.querySelector("#cert-modal-close").addEventListener("click", close);
  modal.querySelector("#cert-modal-close-btn").addEventListener("click", close);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });
}

/**
 * Animated Numerical Counters
 */
function initCounters() {
  const counters = document.querySelectorAll(".counter-value");
  if (!counters.length) return;

  let animated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          counters.forEach((counter) => {
            const target = parseInt(counter.getAttribute("data-target"), 10);
            const duration = 1200;
            const stepTime = 30;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                counter.innerText = target;
                clearInterval(timer);
              } else {
                counter.innerText = Math.ceil(current);
              }
            }, stepTime);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  const statsSection = document.getElementById("stats-strip");
  if (statsSection) observer.observe(statsSection);
}

/**
 * Scroll to Top & Global Scroll Effects
 */
function initScrollEffects() {
  const backToTopBtn = document.getElementById("back-to-top-btn");

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
}

/**
 * Global Actions
 */
function initGlobalActions() {
  const cvBtn = document.getElementById("view-cv-btn");
  if (cvBtn) {
    cvBtn.addEventListener("click", (e) => {
      e.preventDefault();
      showToast("Credentials & certifications are detailed below!", "info");
      const certSec = document.getElementById("certifications");
      if (certSec) {
        certSec.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}
