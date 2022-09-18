export {}

const pathToBucket = (bucket) => {
    switch (bucket) {
        default:
        case 'puertorico':
            return 'Puerto Rico'
        case 'northcarolina':
            return 'North Carolina'
    }
}
const client = require('contentful').createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

export const getHomepage = async () => {
    const entries = await client.getEntries({
        content_type: 'homepage',
    })
    if (entries.items) {
        return entries.items[0].fields
    }
}

export const getProperty = async (slug: string) => {
    const entries = await client.getEntries({
        content_type: 'property',
        'fields.slug': slug,
        include: 5,
    })
    if (entries.items) {
        return entries.items[0].fields
    }
}

export const getAllProperties = async () => {
    const entries = await client.getEntries({
        content_type: 'property',
        include: 5,
    })
    if (entries.items) {
        return entries.items.map((x: { fields: {} }) => x.fields)
    }
}

export const getPropertiesViaBucket = async (
    bucket: 'Puerto Rico' | 'North Carolina'
) => {
    const entries = await client.getEntries({
        content_type: 'property',
        'fields.bucket': pathToBucket(bucket),
        select: 'fields.propertyName,fields.bannerDescriptionList,fields.location,fields.tileImage,fields.bookNowLink,fields.slug',
    })
    if (entries.items) {
        return entries.items[0].fields
    }
}

export const getAllPropertiesForPaths = async () => {
    const entries = await client.getEntries({
        content_type: 'property',
        select: 'fields.propertyName,fields.suites,fields.bucket,fields.slug,fields.propertyType',
        include: 1,
    })
    if (entries.items) {
        return entries.items.map((x: { fields: {} }) => x.fields)
    }
}

export const getNews = async () => {
    const entries = await client.getEntries({
        content_type: 'news',
        include: 1,
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

export const getGuides = async (bucket: string, type?: string) => {
    const entries = await client.getEntries({
        content_type: 'guide',
        'fields.bucket[in]': pathToBucket(bucket),
        'fields.type': type,
    })
    if (entries.items) {
        return entries.items.map((x: { fields: {} }) => x.fields)
    }
}

export const getGuidesPage = async (url: string) => {
    const entries = await client.getEntries({
        content_type: 'guidesPage',
        'fields.url': url,
    })
    if (entries.items) {
        return entries.items[0].fields
    }
}

export const getGuidesPages = async () => {
    const entries = await client.getEntries({
        content_type: 'guidesPage',
    })
    if (entries.items) {
        return entries.items.map((x: { fields: {} }) => x.fields)
    }
}

export const getExperiences = async (bucket: string) => {
    const entries = await client.getEntries({
        content_type: 'activity',
        'fields.bucket[in]': pathToBucket(bucket),
    })
    if (entries.items) {
        return entries.items.map((x: { fields: {} }) => x.fields)
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
