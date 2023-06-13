import { pathToBucket } from '../_utils/Parsers'

export {}

const client = require('contentful').createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
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
}

export const getProperty = async (slug: string) => {
    const entries = await client.getEntries({
        content_type: 'property',
        'fields.slug': slug,
        select: 'fields.slug,fields.propertyName,fields.bucket,fields.location,fields.propertyType,fields.bannerImage,fields.mobileBannerImage,fields.bannerHeader,fields.bannerDescriptionList,fields.bookNowLink,fields.blurb,fields.bottomBlurb,fields.concept,fields.suites,fields.rooms,fields.address,fields.mapUrl,fields.features,fields.thingsToKnow,fields.tileImage',
        include: 2,
    })
    if (entries.items) {
        return entries.items[0].fields
    }
}

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

export const getNews = async () => {
    const entries = await client.getEntries({
        content_type: 'news',
        include: 1,
        order: '-fields.date',
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
