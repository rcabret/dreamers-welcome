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
