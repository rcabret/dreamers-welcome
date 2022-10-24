import React from 'react'
import { HighlightBlurb, SliderWrap } from './styles'
import BodyText from '../../Typography/BodyText'
import ImageGridSlider from '../../UI/Swiper'
import { ContentfulImage } from '../../../_constants/DataTypes'
import Block from '../../UI/Block'

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
    return (
        <Block
            title={title}
            fullWidth
            hideSeparator={hideSeparator}
            showOverflow
            content={
                <>
                    <SliderWrap>
                        <ImageGridSlider
                            fixedHeight={500}
                            slug={slug}
                            items={images}
                            spaceBetween={20}
                        />
                    </SliderWrap>
                    <HighlightBlurb>
                        {blurb && <BodyText size="lg">{blurb}</BodyText>}
                    </HighlightBlurb>
                </>
            }
        />
    )
}

export default Highlight
