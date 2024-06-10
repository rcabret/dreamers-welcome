const { getAllNewsSlugs } = require('./src/_lib/api');

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.dreamerswelcome.com/',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  outDir: './public', // Directory where sitemap files will be generated
  exclude: ['/secret-page'], // Exclude specific internal pages if needed
  additionalPaths: async (config) => {
    const slugs = await getAllNewsSlugs();

    // Generate paths for news articles
    const newsPaths = slugs.map((slug) => ({
      loc: `${config.siteUrl}/news/${slug}`,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }));

    // External URLs to be added
    const externalUrls = [
      'https://externalwebsite.com/page1',
      'https://externalwebsite.com/page2',
    ];

    // Generate paths for external URLs
    const externalPaths = externalUrls.map((url) => ({
      loc: url,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }));

    // Combine newsPaths and externalPaths
    return [...newsPaths, ...externalPaths];
  },
};
