
import { log } from 'console'
import { pathToBucket } from '../_utils/Parsers'


const client = require('contentful').createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
    // environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
    host: 'cdn.contentful.com'
})

const preview = require('contentful').createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    // environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN,
    host: 'preview.contentful.com'
})

export const getLandingpage = async () => {
    const entries = await client.getEntries({
        content_type: 'landing',
        include: 1,
    })

    if (entries.items) {
        return entries.items[0].fields
    }

}

export const getHomepage = async (url: string) => {
    const entries = await client.getEntries({
        content_type: 'homepage',
        'fields.slug': url,
        select: 'fields.slug,fields.title,fields.blurb,fields.coverImage,fields.mobileCoverImage,fields.news,fields.experiences,fields.guides',
        include: 1,
    })
    if (entries.items) {
    
        return entries.items[0].fields
    }
}

export const getStaysForHomepage = async (url: string) => {
    const entries = await client.getEntries({
        content_type: 'homepage',
        'fields.slug': url,
        select: 'fields.stays',
    })

    if (entries.items) {
        return entries.items[0].fields
    }
    console.log(entries)
}

export const getProperty = async (slug: string) => {
    const entries = await client.getEntries({
        content_type: 'property',
        'fields.slug': slug,
        select: 'fields.seoMetadata,fields.slug,fields.propertyName,fields.bucket,fields.location,fields.propertyType,fields.bannerImage,fields.mobileBannerImage,fields.bannerHeader,fields.bannerDescriptionList,fields.bookNowLink,fields.blurb,fields.bottomBlurb,fields.concept,fields.suites,fields.rooms,fields.address,fields.mapUrl,fields.features,fields.thingsToKnow,fields.tileImage',
        include: 2,
    })
    if (entries.items) {
        return entries.items[0]?.fields
    }
}

// export const getMetaData = async () => {
    
//     const entries = await client.getEntries({
//         content_type: 'metaData',
//         select: 'fields.metaTitleField,fields.metaDescriptionField',
//         include: 2,
//     })
//     if (entries.items) {
//         return entries.items[0]?.fields
//     }
// }

export const getRestOfPropertyData = async (slug: string) => {
    const entries = await client.getEntries({
        content_type: 'property',
        'fields.slug': slug,
        select: 'fields.faq,fields.carouselImages,fields.otherStays,fields.news',
        include: 2,
    })
    if (entries.items) {
        return entries.items[0].fields
    }
}






export const getAllProperties = async () => {
    const entries = await client.getEntries({
        content_type: 'property',
        order: 'fields.propertyName',
        include: 1,
    })
    if (entries.items) {
        return entries.items.map((x: { fields: {} }) => x.fields)
    }
}

export const getPropertiesViaBucket = async (bucket?: string) => {
    let query: any = {
        content_type: 'property',
        order: 'fields.propertyName',
        select: 'fields.propertyName,fields.propertyType,fields.bannerDescriptionList,fields.location,fields.tileImage,fields.bookNowLink,fields.slug',
    }

    if (bucket) {
        query['fields.bucket[in]'] = pathToBucket(bucket)
    }

    const entries = await client.getEntries(query)
    if (entries.items) {
        return entries.items.map((x: { fields: {} }) => x.fields)
    }
}

export const getAllPropertiesForPaths = async () => {
    const entries = await client.getEntries({
        content_type: 'property',
        order: 'fields.propertyName',
        select: 'fields.propertyName,fields.suites,fields.bucket,fields.slug,fields.propertyType',
        include: 1,
    })
   
    if (entries.items) {
        return entries.items.map((x: { fields: {} }) => x.fields)
    }
}

export const newsPage = async () => {
    const entries = await client.getEntries({
        content_type: 'newsPage',
    })
    if (entries.items) { 
        // console.log("news page props ----",entries.items)       
        return entries.items[0] ? entries.items[0].fields : null
    }
}

export const getProperties = async () => {
    const entries = await client.getEntries({
        content_type: 'propertiesDev',
    })
    if (entries.items) {        
        // return entries.items[0] ? entries.items[0].fields : null
        return entries.items
    }
}

export const getNews = async () => {
    const entries = await client.getEntries({
        content_type: 'blog',
        include: 1,
        order: '-fields.date',
        // limit: 20, // Fetch only 20 items
    });

    if (entries.items) {
        return entries.items;
    }
};



export const getNewsForPreview = async (entryID:any) => {
    // const entries = await client.getEntries({
    //     content_type: 'blog',
    //     include: 1,
    //     order: '-fields.date',
    // })
    // if (entries.items) {
    //     return entries.items
    // }
    try {
        const entry = await preview.getEntry(entryID);
        
        return entry.fields;
    } catch (error) {
        console.error('Error fetching news entry:', error);
        throw error;
    }
}

export const getNewsEntry = async (entryID?: string) => {
    try {
        const entry = await preview.getEntry(entryID);
        
        return entry.fields;
    } catch (error) {
        console.error('Error fetching news entry:', error);
        throw error;
    }
}


export const getNewsViaProperty = async (propertySlug?: string) => {
    const entries = await client.getEntries({
        content_type: 'news',
        'metadata.tags.sys.id[in]': 'showInProperty',
        'fields.property.sys.contentType.sys.id': 'property',
        'fields.property.fields.slug': propertySlug,
        include: 5,
    })
    if (entries.items) {
        return entries.items.map((x: { fields: {} }) => x.fields)
    }
}

export const getAbout = async () => {
    const entries = await client.getEntries({
        content_type: 'about',
        include: 3,
    })
    if (entries.items) {
        return entries.items[0].fields
    }
}

export const getGuide = async (slug: string) => {
    const entries = await client.getEntries({
        content_type: 'guide',
        'fields.slug': slug,
    })
    if (entries.items) {
        return entries.items[0].fields
    }
}

export const getGuides = async (bucket?: string) => {
    let query: any = {
        content_type: 'guide',
    }
    if (bucket) {
        query['fields.bucket[in]'] = pathToBucket(bucket)
    }

    const entries = await client.getEntries(query)

    if (entries.items) {
        return entries.items
    }
}

export const getGuidesPage = async (bucket: string) => {
    const entries = await client.getEntries({
        content_type: 'guidesPage',
        'fields.bucket[in]': pathToBucket(bucket),
    })
    if (entries.items) {
        return entries.items[0].fields
    }
}

export const getExperiences = async (bucket?: string) => {
    const query: any = {
        content_type: 'activity',
        select: 'fields.title,fields.slug,fields.tileImage,fields.price,fields.tileText,fields.includedWithStay,metadata',
    }

    if (bucket) {
        query['fields.bucket[in]'] = pathToBucket(bucket)
    }
    const entries = await client.getEntries(query)
    if (entries.items) {
        return entries.items
    }
}

export const getExperiencesPage = async (bucket: string) => {
    const entries = await client.getEntries({
        content_type: 'activitiesPage',
        'fields.bucket[in]': pathToBucket(bucket),
    })
    if (entries.items) {
        return entries.items[0] ? entries.items[0].fields : null
    }
}

export const getExperience = async (slug: string) => {
    const entries = await client.getEntries({
        content_type: 'activity',
        'fields.slug': slug,
        include: 1,
    })
    if (entries.items) {
        return entries.items[0].fields
    }
}

export const getOtherExperiences = async (slug: string) => {
    const entries = await client.getEntries({
        content_type: 'activity',
        'fields.slug': slug,
        select: 'fields.otherExperiences',
        include: 2,
    })

    if (entries.items) {
        return entries.items.map((x: { fields: any }) => x.fields)
    }
}

export const getFaq = async (slug: string) => {
    const entries = await client.getEntries({
        content_type: 'faq',
        'fields.slug': slug,
        include: 1,
    })
    if (entries.items) {
        return entries.items[0].fields
    }
}

export const getFaqs = async () => {
    const entries = await client.getEntries({
        content_type: 'faq',
        order: 'fields.title',
    })
    if (entries.items) {
        return entries.items.map((x: { fields: {} }) => x.fields)
    }
}

export const getSlug = async (slug:string) => {
    const entries = await client.getEntries({
        content_type: 'blog',
        'fields.slug': slug,
    })
    if (entries.items) {
        
        return entries.items[0] ? entries.items[0].fields : null
    }
}


export const getTestSlugs = async () => {
    try {
        const entries = await client.getEntries({
            content_type: 'blog',
            select: 'fields.slug,sys.id',
        });
        console.log('entries:', entries);

        const slugs = entries.items.map(item => {
            if (item.fields && item.fields.slug && item.fields.slug.startsWith('https')) {
                // If fields exist and the slug starts with "https", return the full slug
                return item.fields.slug;
            } else if (item.fields && item.fields.slug) {
                // If fields exist but the slug does not start with "https", construct the URL using it
                return item.fields.slug;
            } else {
                // If fields do not exist or there is no slug in fields, use the entry ID
                return item.sys.id
            }
        });
         console.log('test ---------------------',slugs)
        return slugs;
    } catch (error) {
        console.error("Error fetching all slugs:", error);
        return [];
    }
};



export const getAllNewsSlugs = async () => {
    const entries = await client.getEntries({
        content_type: 'blog',
        select: 'fields.slug',
    });
    return entries.items.map(item => item.sys.id||item.fields.slug);
};


export const getFaqPage = async () => {
    const entries = await client.getEntries({
        content_type: 'faqsPage',
    })
    if (entries.items) {
        return entries.items[0] ? entries.items[0].fields : null
    }
}




export const getPage = async (slug: string) => {
    const entries = await client.getEntries({
        content_type: 'title',
        'fields.slug': slug,
    })

    if (entries.items) {
        return entries.items[0].fields
    }
}

export const getPolicies = async () => {
    const entries = await client.getEntries({
        content_type: 'policy',
        include: 1,
    })

    if (entries.items) {
        return entries.items.map((x:any) => x.fields)
    }
}

export const getPolicy = async (slug: string) => {
    const entries = await client.getEntries({
        content_type: 'policy',
        'fields.slug': slug,
        include: 1,
    })

    if (entries.items) {
        return entries.items[0].fields
    }
}
