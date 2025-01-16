import React, { useContext, useEffect, useState } from 'react'
import { HighlightBlurb, SliderWrap } from './styles'
import BodyText from '../../Typography/BodyText'
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
    const getCarouselSlides = () => {
        switch (breakpoint) {
            case 'tablet':
                return 'auto'
            case 'mobile':
                return 1
            case 'desktop':
            default:
                return 'auto'
        }
    }

    const [height, setHeight] = useState(getCarouselHeight())
    const [slides, setSlides] = useState(getCarouselSlides())
    


    
    useEffect(() => {
        setHeight(getCarouselHeight())
        setSlides(getCarouselSlides())
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
                    <SliderWrap className='slider_wrapper'>
                        <ImageGridSlider
                            fixedHeight={height}
                            slug={slug}
                            items={images}
                            spaceBetween={20}
                            slidesPerView={slides}
                            centeredSlides={true}
                        />
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
