// utils/analytics.ts
// export const GA_TRACKING_ID = 'UA-252792304-1';

// // Function to log a pageview
// export const pageview = (url: string) => {
//   (window as any).gtag('config', GA_TRACKING_ID, {
//     page_path: url,
//   });
// };

// // Initialize Google Analytics
// export const initGA = () => {
//   if (typeof window !== 'undefined') {
//     (window as any).dataLayer = (window as any).dataLayer || [];
//     function gtag() {
//       (window as any).dataLayer.push(arguments);
//     }
//     gtag('js', new Date());
//     gtag('config', GA_TRACKING_ID);
//   }
// };