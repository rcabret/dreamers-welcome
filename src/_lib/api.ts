import { EntryCollection } from 'contentful'

export {}

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
        'fields.bucket': bucket,
        select: 'fields.propertyName,fields.bannerDescriptionList,fields.location,fields.tileImage,fields.bookNowLink,fields.slug',
    })
    if (entries.items) {
        return entries.items[0].fields
    }
}

export const getAllPropertiesForPaths = async () => {
    const entries = await client.getEntries({
        content_type: 'property',
        select: 'fields.propertyName,fields.suites,fields.bucket,fields.slug',
        include: 1,
    })
    if (entries.items) {
        return entries.items.map((x: { fields: {} }) => x.fields)
    }
}
