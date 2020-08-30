const GA_TRACKING_ID = process.env.GA_TRACKING_ID;

declare global {
  interface Window {
    gtag: (a: string, trackingId: string, { page_path: string }) => void;
  }
}

export const gtag = {
  pageView: (url: string) => {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  },
};
