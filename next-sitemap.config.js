const client = require('contentful').createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  // environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
  host: 'cdn.contentful.com'
})
const getAllNewsSlugs = async () => {
const entries = await client.getEntries({
    content_type: 'blog',
    select: 'fields.slug',
});
console.log('entrinesss-------------',entries)
return entries.items.map(item => item.sys.id||item.fields.slug);
};

module.exports = {
 
  siteUrl: process.env.SITE_URL || 'https://dreamerswelcome.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  outDir: './public', 
  // exclude: ['/secret-page'], 
  additionalPaths: async (config) => {
    const id = await getAllNewsSlugs();

    // Generate paths for news articles
    const newsPaths = id.map((id) => ({
      loc: `${config.siteUrl}/news/field?Id=${id}`,
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
