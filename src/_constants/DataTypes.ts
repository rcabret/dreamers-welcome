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
