import { pathToBucket } from '../_utils/Parsers'

export {}

const client = require('contentful').createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

export const getLandingpage = async () => {
    const entries = await client.getEntries({
        content_type: 'landing',
        include: 3,
    })

    if (entries.items) {
        return entries.items[0].fields
    }
}

export const getHomepage = async (url: string) => {
    const entries = await client.getEntries({
        content_type: 'homepage',
        'fields.url': url,
        include: 3,
    })

    if (entries.items) {
        return entries.items[0].fields
    }
}

export const getProperty = async (slug: string) => {
    const entries = await client.getEntries({
        content_type: 'property',
        'fields.slug': slug,
        include: 8,
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

export const getPropertiesViaBucket = async (bucket?: string) => {
    let query: any = {
        content_type: 'property',
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

export const getGuides = async (bucket: string, type?: string) => {
    const entries = await client.getEntries({
        content_type: 'guide',
        'fields.bucket[in]': pathToBucket(bucket),
        'fields.type': type,
    })
    if (entries.items) {
        return entries.items
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

export const getExperiences = async (bucket?: string) => {
    const query: any = {
        content_type: 'activity',
    }

    if (bucket) {
        query['fields.bucket[in]'] = pathToBucket(bucket)
    }
    const entries = await client.getEntries(query)
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

export const getExperience = async (slug: string) => {
    const entries = await client.getEntries({
        content_type: 'activity',
        'fields.url': slug,
    })
    if (entries.items) {
        return entries.items[0].fields
    }
}
