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
    title: string
}

export interface News {
    title: string
    text: string
    tileImage: ContentfulImage
    slug: string
    date: Date
}
