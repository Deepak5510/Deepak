/**
 * Deepak Portfolio - Profile & App Configuration
 */

const STORAGE_KEY_GAS_URL = "deepak_portfolio_gas_url";

export const CONFIG = {
  profile: {
    name: "Deepak",
    tagline: "Building Secure Web Applications • Designing Intuitive Interfaces",
    qualification: "Final-Year B.E. Computer Science Engineering (Specialized in Cybersecurity)",
    roles: [
      "Cybersecurity Specialist",
      "Full-Stack Web Developer",
      "UI/UX Design Practitioner",
      "Security Auditor & PenTester"
    ],
    email: "deepaksanjay948@gmail.com",
    linkedin: "https://www.linkedin.com/in/deepak-p-9034373a7",
    github: "https://github.com",
    statusText: "🎓 Final-Year Student • Open for Full-Time Roles & Internships",
    bio: "Final-year Computer Science Engineering student with dedicated specialization in Cybersecurity. I bridge the gap between defensive engineering, modern full-stack web development, and human-centered design.",
  },

  // Google Apps Script Web App endpoint URL
  GOOGLE_APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbxWatuqLdU6wXc8jzhv5a6Kf7tn2mM4tqO1xbGzYVA4wl6sqIdeYaSl4UgrKIh6AnHU/exec",

  /**
   * Get active Google Apps Script URL (prioritizes localStorage)
   */
  getGasUrl() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_GAS_URL);
      if (stored && stored.trim().startsWith("https://script.google.com")) {
        return stored.trim();
      }
    } catch (e) {
      console.warn("Could not read from localStorage:", e);
    }
    return this.GOOGLE_APPS_SCRIPT_URL;
  },

  /**
   * Save custom Google Apps Script URL
   */
  setGasUrl(url) {
    try {
      if (url && url.trim()) {
        localStorage.setItem(STORAGE_KEY_GAS_URL, url.trim());
      } else {
        localStorage.removeItem(STORAGE_KEY_GAS_URL);
      }
      return true;
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
      return false;
    }
  },

  /**
   * Check if current GAS URL is placeholder
   */
  isSampleUrl() {
    const url = this.getGasUrl();
    return !url || url.includes("SAMPLE_DEPLOYMENT_URL");
  }
};
