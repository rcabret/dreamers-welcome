export interface ContentfulImage {
    fields: {
        file: {
            url: string
            details: {
                image: {
                    width: number
                    height: number
                }
            }
        }
    }
    description: string
    title: string
}

export interface News {
    title: string
    text: string
    titleImage: ContentfulImage
    tileImage: ContentfulImage
    slug: string
    date: Date
    test: string
    // description: string
}

export interface SeoData {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: any;
}
