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
