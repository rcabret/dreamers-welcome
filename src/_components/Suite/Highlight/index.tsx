import React, { useContext, useEffect, useState } from 'react'
import { HighlightBlurb, SliderWrap } from './styles'
import ImageGridSlider from '../../UI/Swiper'
import { ContentfulImage } from '../../../_constants/DataTypes'
import Block from '../../UI/Block'
import { viewportContext } from '../../../_utils/ViewportProvider'
import MarkdownModule from '../../Typography/MarkdownModule'

interface HighlightProps {
    title: string
    blurb: string
    images: ContentfulImage[]
    hideSeparator?: boolean
    slug: string
}
const Highlight = ({
    title,
    blurb,
    images,
    hideSeparator = false,
    slug,
}: HighlightProps) => {
    const breakpoint = useContext(viewportContext)

    const getCarouselHeight = () => {
        switch (breakpoint) {
            case 'tablet':
                return 400
            case 'mobile':
                return 300
            case 'desktop':
            default:
                return 500
        }
    }

    const [height, setHeight] = useState(getCarouselHeight())

    useEffect(() => {
        setHeight(getCarouselHeight())
    }, [breakpoint])

    return (
        <Block
            title={title}
            fullWidth
            hideSeparator={hideSeparator}
            showOverflow
            noPaddingBottom
            content={
                <>
                    <SliderWrap>
                        <ImageGridSlider fixedHeight={height} slug={slug} items={images} spaceBetween={20} />
                    </SliderWrap>
                    <HighlightBlurb>
                        {blurb && <MarkdownModule data={blurb} />}
                    </HighlightBlurb>
                </>
            }
        />
    )
}

export default Highlight
