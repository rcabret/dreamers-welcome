// next-sitemap.config.js
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.dreamerswelcome.com/',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  outDir: './public', // Directory where sitemap files will be generated
  // exclude: ['/secret-page'], // Exclude specific internal pages if needed
  additionalPaths: async (config) => {
    const externalUrls = [
      'https://externalwebsite.com/page1',
      'https://externalwebsite.com/page2',
    ];

    return externalUrls.map((url) => ({
      loc: url,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }));
  },
};
