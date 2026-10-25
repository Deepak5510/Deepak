/**
 * Deepak Portfolio - System Configuration & Web App Endpoints
 */

export const GOOGLE_APPS_SCRIPT_CONFIG = {
  WEB_APP_URL: "https://script.google.com/macros/s/AKfycbxWatuqLdU6wXc8jzhv5a6Kf7tn2mM4tqO1xbGzYVA4wl6sqIdeYaSl4UgrKIh6AnHU/exec",
  DEPLOYMENT_ID: "AKfycbxWatuqLdU6wXc8jzhv5a6Kf7tn2mM4tqO1xbGzYVA4wl6sqIdeYaSl4UgrKIh6AnHU",
  NOTIFICATION_EMAIL: "deepaksanjay948@gmail.com",
  STATUS: "ACTIVE_LIVE_DEPLOYED" as const,
};

export const getActiveGasUrl = (): string => {
  try {
    const custom = localStorage.getItem('deepak_portfolio_gas_url');
    if (custom && custom.trim().startsWith('https://script.google.com')) {
      return custom.trim();
    }
  } catch {
    // ignore
  }
  return GOOGLE_APPS_SCRIPT_CONFIG.WEB_APP_URL;
};
