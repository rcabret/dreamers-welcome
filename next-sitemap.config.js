const client = require('contentful').createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  host: 'cdn.contentful.com'
})


module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://dreamerswelcome.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  outDir: './public', 
  additionalPaths: async (config) => {
    const getAllNewsSlugs = async () => {
      const entries = await client.getEntries({
        content_type: 'blog',
        select: 'fields.slug,sys.id',
    });
  
    
    const slugs = entries.items.map(item => {
        if (item.fields && item.fields.slug && item.fields.slug.startsWith('https')) { 
          return item.fields.slug;
        } else if (item.fields && item.fields.slug) {   
          return `${config.siteUrl}/news/${item.fields.slug}`;
        } else {   
          return `${config.siteUrl}/news/field?Id=${item.sys.id}`;
        }
    });
     
    return slugs;
    };
    const slugs = await getAllNewsSlugs();


    const newsPaths = slugs.map((slugs) => ({
      loc: slugs,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }));

    return [...newsPaths];
  },
};
