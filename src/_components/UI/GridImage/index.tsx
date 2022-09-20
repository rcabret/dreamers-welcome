import React from 'react'
import Image from 'next/image'
import { ImageMask, Container } from './styles'
import { ContentfulImage } from '../../../_constants/DataTypes'

interface GridImageProps {
    badge?: JSX.Element
    border?: boolean
    borderRadius?: boolean
    className?: string
    children?: JSX.Element
    hasHover?: boolean
    ratio?: number | string
    metadata?: JSX.Element
    showMetadata?: boolean
    imageObj: ContentfulImage
    fullHeight?: boolean
    disabled?: boolean
    sizes?: string
    widthQuery?: number
}

const GridImage = ({
    border = true,
    borderRadius = true,
    className,
    children,
    hasHover = false,
    fullHeight = false,
    metadata,
    ratio = 0.67,
    imageObj,
    sizes,
    widthQuery,
}: GridImageProps) => {
    if (!imageObj) {
        return null
    }

    const { fields } = imageObj

    const { file } = fields
    const { details, url } = file
    const { image } = details
    const { width, height } = image

    const getCorrectRatio = (
        dimensions: number[],
        ratio: number | string
    ): number | string => {
        const [h, w] = dimensions
        if (ratio === 'natural') {
            return h / w
        } else if (ratio === 'lightbox') {
            if (h > w) {
                return h / w - 1
            } else {
                return h / w
            }
        } else {
            return ratio
        }
    }

    return (
        <Container
            border={border}
            className={className}
            fullHeight={fullHeight}
        >
            <ImageMask
                borderRadius={borderRadius}
                hasHover={hasHover}
                fullHeight={fullHeight}
                ratio={getCorrectRatio([height, width], ratio)}
            >
                {imageObj ? (
                    <>
                        <aside />
                        <Image
                            src={
                                `https:${url}${
                                    widthQuery && !sizes
                                        ? `?w=${widthQuery}`
                                        : ''
                                }` || '/'
                            }
                            layout="fill"
                            sizes={sizes}
                            objectFit={
                                ratio !== 'lightbox' ? 'cover' : 'contain'
                            }
                            placeholder="blur"
                            blurDataURL={`https:${url}?q=10`}
                        />
                        {children && children}
                    </>
                ) : (
                    <aside />
                )}
            </ImageMask>
            {metadata && metadata}
        </Container>
    )
}

export default GridImage
