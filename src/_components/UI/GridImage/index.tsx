import React from 'react'
import Image from 'next/image'
import { ImageMask, Container } from './styles'

interface GridImageProps {
    badge?: JSX.Element
    border?: boolean
    borderRadius?: boolean
    className?: string
    hasHover?: boolean
    ratio?: number | string
    metadata?: JSX.Element
    showMetadata?: boolean
    imageObj?: { height: number; width: number; url: string }
    fullHeight?: boolean
    disabled?: boolean
    sizes?: string
}

const GridImage = ({
    border = true,
    borderRadius = true,
    className,
    hasHover = false,
    fullHeight = false,
    metadata,
    ratio = 0.67,
    imageObj,
    sizes = '100vw',
}: GridImageProps) => {
    const imageData = imageObj

    if (!imageData) {
        return null
    }

    const { height, width } = imageData

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
                {imageData ? (
                    <>
                        <aside />
                        <Image
                            src={imageData.url || '/'}
                            layout="fill"
                            sizes={sizes}
                            objectFit={
                                ratio !== 'lightbox' ? 'cover' : 'contain'
                            }
                            //placeholder="blur"
                            //blurDataURL={`${attributes.landingImage.data.attributes.url}`}
                        />
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
