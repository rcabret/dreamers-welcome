const client = require('contentful').createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  host: 'cdn.contentful.com'
})

const excludedUrls = [
  "https://eluxemagazine.com/travel/10-fully-vegan-hotels-around-the-world",
  "https://inmagazine.ca/2023/11/welcome-to-san-juan",
  "https://www.revistalternativa.com/noticias-estilo-de-vida/asi-son-los-lugares-mas-originales-para-alojarse-en-puerto-rico-39676",
  "https://www.greenmatters.com/community/green-city-guide-san-juan-puerto-rico",
  "https://www.luxurylifestylemag.co.uk/travel/5-top-luxury-hotels-and-resorts-in-puerto-rico-to-book-right-now/?fbclid=PAAabfEvoIFw3lQYb7N3PJWhx62YJvuPB5oJDCwMDRq_n4_xreNv7RVpPYIQw",
  "https://www.insider.com/where-to-stay-in-san-juan-puerto-rico-best-hotels#dreamcatcher-by-dw-6",
  "https://www.insider.com/guides/travel/best-hotels-cheap-luxury-bathrooms#the-dreamcatcher-1",
  "https://www.insider.com/guides/travel/best-hotels-puerto-rico#the-dreamcatcher-1",
  "https://hotelsabovepar.com/the-best-boutique-hotels-in-north-carolina",
  "https://www.brit.co/best-places-to-visit",
  "https://hotelsabovepar.com/the-coolest-affordable-boutique-hotels-in-puerto-rico-2",
  "https://www.axios.com/local/raleigh/2022/08/19/guide-weekend-visit-wilmington-nc",
  "https://www.lonelyplanet.com/articles/best-weekend-getaways-for-us-couples",
  "https://www.cbsnews.com/essentials/great-new-hotels-to-book-in-2022-in-the-united-states",
  "https://www.architecturaldigest.com/story/the-7-most-satisfying-renovation-instagram-accounts-to-follow-right-now",
  "https://www.culturedmag.com/article/2022/01/25/a-self-made-spirit-and-a-hefty-dose-of-creativity-have-made-san-juan-puerto-rico-a-must-see-art-destination",
  "https://www.domino.com/content/dreamers-welcome-wilmington",
  "https://vegnews.com/vegan-travel/vegan-hotels-in-america",
  "https://pursuitist.com/4-reasons-to-visit-eco-friendly-puerto-rico",
  "https://www.lonelyplanet.com/articles/best-lgbtq-spots-in-san-juan",
  "https://www.thetravel.com/budget-friendly-hotels-in-puerto-rico",
  "https://drifttravel.com/city-guide-san-juan-puerto-rico",
  "https://www.travelandleisure.com/weekend-getaways-in-the-south-7098671",
  "https://togo.hotelbusiness.com/article/dreamers-welcome-offers-inclusivity-and-authenticity",
  "https://www.cntraveler.com/gallery/best-airbnbs-in-puerto-rico",
  "https://www.dezeen.com/2023/12/30/verde-guesthouse-dreamers-welcome-san-juan-puerto-rico",
  "https://hotelsabovepar.com/the-best-affordable-boutique-hotels-in-the-caribbean",
  "https://upgradedpoints.com/travel/hotels/best-boutique-hotels-in-puerto-rico",
  "https://www.trazeetravel.com/10-budget-friendly-high-design-airbnbs-in-san-juan-puerto-rico",
  "https://vegnews.com/vegan-travel/vegan-hotels-in-america",
  "https://www.vogue.com/article/an-insiders-guide-to-san-juan-puerto-rico",
  "https://pursuitist.com/5-places-to-experience-first-class-wellness-in-puerto-rico",
  "https://passportmagazine.com/explore-lgbtq-san-juan-puerto-rico",
  "https://www.theglobeandmail.com/life/travel/article-i-wanted-more-than-a-boring-beach-vacation-so-i-took-my-family-to",
  "https://www.townandcountrymag.com/leisure/travel-guide/a63225670/san-juan-puerto-rico-travel-guide",
  "https://www.dreamerswelcome.com/dreamers-nc",
  "https://dreamerswelcome.com/dreamers-nc/suites",
  "https://dreamerswelcome.com/dreamers-nc/rooms",
  "https://dreamerswelcome.com/booking-policy/dreamers",
  "https://dreamerswelcome.com/northcarolina",
  "https://dreamerswelcome.com/experiences/northcarolina",
  "https://dreamerswelcome.com/guidebooks/northcarolina",
  "https://dreamerswelcome.com/stays/northcarolina"
];


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
  
    
    const slugs = entries.items
    .map(item => {
        if (item.fields && item.fields.slug && item.fields.slug.startsWith('https')) { 
          return item.fields.slug;
        } else if (item.fields && item.fields.slug) {   
          return `${config.siteUrl}/news/${item.fields.slug}`;
        } else {   
          return `${config.siteUrl}/news/field?Id=${item.sys.id}`;
        }
    })
    .filter(slug => !excludedUrls.some(url => slug.startsWith(url)));
     
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
