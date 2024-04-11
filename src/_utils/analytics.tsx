// utils/analytics.ts

import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module';

export const initializeGA = (trackingID: string) => {
  try {
  
    TagManager.initialize({ gtmId: "GTM-KC6QD2H" });
    // console.log(`Google Analytics initialized with ID: ${"UA-252792304-1"}`);
  } catch (error) {
    console.error('Error initializing Google Analytics:', error);
  }
};

export const trackPageView = (pagePath: string) => {
  try {
   
    ReactGA.pageview(pagePath);
    console.log(`Page view tracked for path: ${pagePath}`);
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};


declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
