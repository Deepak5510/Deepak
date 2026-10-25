/**
 * Deepak Portfolio - Contact Form & Google Apps Script Integration
 * Clean light mode validation, submission, and notifications
 */

import { CONFIG } from "./config.js";

export function initContactForm() {
  const form = document.getElementById("portfolio-contact-form");
  const submitBtn = document.getElementById("contact-submit-btn");
  const submitText = document.getElementById("submit-btn-text");
  const submitIcon = document.getElementById("submit-btn-icon");
  const inlineFeedback = document.getElementById("contact-inline-feedback");
  const copyEmailBtn = document.getElementById("copy-email-btn");
  const configGasBtn = document.getElementById("config-gas-btn");

  // Email quick-copy handler
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(CONFIG.profile.email).then(() => {
        showToast("Email address copied to clipboard!", "success");
        const originalText = copyEmailBtn.innerText;
        copyEmailBtn.innerText = "Copied ✓";
        setTimeout(() => {
          copyEmailBtn.innerText = originalText;
        }, 2200);
      }).catch(() => {
        showToast(`Email: ${CONFIG.profile.email}`, "info");
      });
    });
  }

  // Open Google Apps Script endpoint configuration modal
  if (configGasBtn) {
    configGasBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openGasConfigModal();
    });
  }

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // 1. Gather & Sanitize form inputs
    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const subjectInput = document.getElementById("contact-subject");
    const messageInput = document.getElementById("contact-message");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput ? subjectInput.value.trim() : "Portfolio Direct Inquiry";
    const message = messageInput.value.trim();

    // 2. Validate inputs
    clearFieldErrors();

    let hasErrors = false;
    if (!name || name.length < 2) {
      showFieldError(nameInput, "Please enter your name (at least 2 characters).");
      hasErrors = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      showFieldError(emailInput, "Please enter a valid email address.");
      hasErrors = true;
    }

    if (!message || message.length < 10) {
      showFieldError(messageInput, "Please enter a message of at least 10 characters.");
      hasErrors = true;
    }

    if (hasErrors) {
      showToast("Please complete the required form fields.", "error");
      return;
    }

    // 3. Prepare payload for Google Apps Script Web App
    const payload = {
      name: name,
      email: email,
      subject: subject || "Portfolio Inquiry for Deepak",
      message: message,
      timestamp: new Date().toISOString()
    };

    const targetUrl = CONFIG.getGasUrl();

    // 4. Update UI to Loading State
    setLoadingState(true);
    setInlineFeedback(null);

    // If using the placeholder URL, provide simulated success with clear notice
    if (CONFIG.isSampleUrl()) {
      await simulateGasSubmission(payload);
      setLoadingState(false);
      form.reset();
      setInlineFeedback(
        "success",
        "✓ Message verified! In demo preview mode. To connect real Google Sheets & Gmail delivery, click 'Apps Script Setup'."
      );
      showToast("Message verified! (Running in demo mode)", "success");
      return;
    }

    // 5. Send POST request to Google Apps Script Web App
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout

      const response = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      let responseData = null;
      try {
        responseData = await response.json();
      } catch (parseErr) {
        if (response.ok || response.type === "opaque") {
          responseData = { status: "success" };
        }
      }

      if (response.ok || (responseData && responseData.status === "success")) {
        setInlineFeedback(
          "success",
          "✓ Thank you! Your message has been sent successfully. Deepak will reply to " + email + " shortly."
        );
        showToast("Message sent successfully!", "success");
        form.reset();
      } else {
        throw new Error(responseData?.message || "Google Apps Script error.");
      }
    } catch (err) {
      console.error("Submission failed:", err);
      if (err.name === "AbortError") {
        setInlineFeedback("error", "Request timed out. Please check your internet connection or email directly.");
        showToast("Connection timed out.", "error");
      } else {
        setInlineFeedback(
          "warning",
          "Notice: Form sent or encountered endpoint CORS. You can also reach Deepak directly at deepaksanjay948@gmail.com."
        );
        showToast("Status: Check Apps Script setup or email directly.", "warning");
      }
    } finally {
      setLoadingState(false);
    }
  });

  function setLoadingState(isLoading) {
    if (isLoading) {
      submitBtn.disabled = true;
      submitBtn.classList.add("loading");
      if (submitText) submitText.innerText = "Sending Message...";
      if (submitIcon) {
        submitIcon.innerHTML = `<svg class="spinner-svg" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-dasharray="32" stroke-linecap="round"/></svg>`;
      }
    } else {
      submitBtn.disabled = false;
      submitBtn.classList.remove("loading");
      if (submitText) submitText.innerText = "Send Message";
      if (submitIcon) {
        submitIcon.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>`;
      }
    }
  }

  function setInlineFeedback(type, text) {
    if (!inlineFeedback) return;
    if (!type || !text) {
      inlineFeedback.className = "form-feedback-banner hidden";
      inlineFeedback.innerHTML = "";
      return;
    }
    inlineFeedback.className = `form-feedback-banner banner-${type}`;
    inlineFeedback.innerHTML = `<span>${text}</span>`;
  }

  function showFieldError(inputElement, errorMsg) {
    inputElement.classList.add("input-error");
    const parent = inputElement.closest(".field-group");
    if (parent) {
      const errEl = parent.querySelector(".field-error-msg");
      if (errEl) {
        errEl.innerText = errorMsg;
        errEl.style.display = "block";
      }
    }
  }

  function clearFieldErrors() {
    const errorInputs = form.querySelectorAll(".input-error");
    errorInputs.forEach((el) => el.classList.remove("input-error"));
    const errorTexts = form.querySelectorAll(".field-error-msg");
    errorTexts.forEach((el) => {
      el.style.display = "none";
      el.innerText = "";
    });
  }
}

function simulateGasSubmission(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Simulated Google Apps Script POST Payload:", data);
      resolve({ status: "success" });
    }, 1000);
  });
}

/**
 * Toast Notification System (Clean Light Design)
 */
export function showToast(message, type = "info") {
  let toastContainer = document.getElementById("cyber-toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "cyber-toast-container";
    toastContainer.className = "cyber-toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = `cyber-toast toast-${type} toast-enter`;

  const icons = {
    success: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#059669" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>`,
    error: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#ef4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>`,
    warning: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#d97706" stroke-width="2.5"><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>`,
    info: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#2563eb" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>`
  };

  toast.innerHTML = `
    <div class="toast-icon">${icons[type] || icons.info}</div>
    <div class="toast-content">
      <span class="toast-title">${type}</span>
      <p class="toast-msg">${message}</p>
    </div>
    <button class="toast-close" aria-label="Close Notification">&times;</button>
    <div class="toast-progress"></div>
  `;

  toastContainer.appendChild(toast);

  const closeBtn = toast.querySelector(".toast-close");
  closeBtn.addEventListener("click", () => dismissToast(toast));

  const timer = setTimeout(() => dismissToast(toast), 4500);

  function dismissToast(el) {
    clearTimeout(timer);
    el.classList.remove("toast-enter");
    el.classList.add("toast-exit");
    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 280);
  }
}

/**
 * Clean Endpoint Settings Modal
 */
export function openGasConfigModal() {
  const existingModal = document.getElementById("gas-modal");
  if (existingModal) existingModal.remove();

  const currentUrl = CONFIG.getGasUrl();
  const isDefault = CONFIG.isSampleUrl();

  const modal = document.createElement("div");
  modal.id = "gas-modal";
  modal.className = "cyber-modal-overlay active";
  modal.innerHTML = `
    <div class="cyber-modal-content">
      <div class="modal-header">
        <div class="modal-title-wrap">
          <span style="font-size: 0.78rem; font-weight: 700; color: #2563eb; text-transform: uppercase;">BACKEND SETUP</span>
          <h3>Google Apps Script Web App Endpoint</h3>
        </div>
        <button class="modal-close-btn" id="modal-close-btn">&times;</button>
      </div>

      <div class="modal-body">
        <p style="font-size: 0.95rem; color: #334155; line-height: 1.6;">
          This contact form sends submissions formatted in <strong>JSON</strong> via <code>POST</code> to your Google Apps Script Web App. It automatically saves entries to your Google Sheet and sends instant email alerts to <strong>deepaksanjay948@gmail.com</strong>.
        </p>

        <div class="endpoint-status-box ${isDefault ? 'status-demo' : 'status-live'}">
          <div>
            <strong>Current Status:</strong> ${isDefault ? 'Demo Preview Mode (Simulated verification)' : 'Connected to Custom Web App URL'}
          </div>
        </div>

        <div class="field-group" style="margin-top: 1rem;">
          <label for="gas-endpoint-input" class="field-label">Google Apps Script Web App URL:</label>
          <input 
            type="url" 
            id="gas-endpoint-input" 
            class="clean-input" 
            placeholder="https://script.google.com/macros/s/AKfycb.../exec"
            value="${isDefault ? '' : currentUrl}"
          />
          <small style="color: #64748b; font-size: 0.8rem; margin-top: 0.25rem;">Deploy your script under <code>google-apps-script/Code.gs</code> as a Web App (Who has access: <em>Anyone</em>).</small>
        </div>

        <div class="gas-quick-guide">
          <h4>Quick 2-Minute Steps:</h4>
          <ol>
            <li>Create a new spreadsheet at <a href="https://sheets.new" target="_blank" rel="noopener">sheets.new</a></li>
            <li>Go to <strong>Extensions</strong> → <strong>Apps Script</strong> and paste <code>google-apps-script/Code.gs</code>.</li>
            <li>Click <strong>Deploy</strong> → <strong>New deployment</strong> → Select <strong>Web app</strong>.</li>
            <li>Set <em>"Execute as: Me"</em> and <em>"Who has access: Anyone"</em>, then copy the URL here.</li>
          </ol>
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="modal-cancel-btn">Close</button>
        <button type="button" class="btn btn-primary" id="modal-save-btn">Save & Connect</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const close = () => {
    modal.classList.remove("active");
    setTimeout(() => modal.remove(), 200);
  };

  modal.querySelector("#modal-close-btn").addEventListener("click", close);
  modal.querySelector("#modal-cancel-btn").addEventListener("click", close);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });

  const saveBtn = modal.querySelector("#modal-save-btn");
  saveBtn.addEventListener("click", () => {
    const inputVal = modal.querySelector("#gas-endpoint-input").value.trim();
    if (inputVal && !inputVal.startsWith("https://script.google.com")) {
      showToast("URL must start with https://script.google.com", "error");
      return;
    }

    CONFIG.setGasUrl(inputVal);
    showToast(inputVal ? "Google Apps Script URL connected!" : "Reset to default endpoint.", "success");
    close();
  });
}
