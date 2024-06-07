/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://www.dreamerswelcome.com',
    generateRobotsTxt: true, 
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
          disallow: '/_next/',
        },
      ],
      additionalSitemaps: [
        'https://www.dreamerswelcome.com/sitemap.xml', 
        'https://www.dreamerswelcome.com/sitemap-0.xml'
      ],
    },
    
    exclude: ['/server-sitemap.xml'], 
    
    alternateRefs: [
      {
        href: 'https://www.dreamerswelcome.com',
        hreflang: 'en',
      },
    ],
  };
  