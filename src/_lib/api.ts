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

export const getProperty = async (propertyName: string) => {
    const entries = await client.getEntries({
        content_type: 'property',
        'fields.propertyName': propertyName,
        include: 5,
    })
    if (entries.items) {
        return entries.items[0].fields
    }
}

export const getPropertiesViaBucket = async (
    bucket: 'Puerto Rico' | 'North Carolina'
) => {
    const entries = await client.getEntries({
        content_type: 'property',
        'fields.bucket': bucket,
        select: 'fields.propertyName,fields.bannerDescriptionList,fields.location,fields.tileImage,fields.bookNowLink',
    })
    if (entries.items) {
        return entries.items[0].fields
    }
}

export const getAllPropertiesForPaths = async () => {
    const entries = await client.getEntries({
        content_type: 'property',
        select: 'fields.propertyName,fields.suites',
        include: 1
    })
    if (entries.items) {
        return entries.items.map((x: { fields: {} }) => x.fields)
    }
}
