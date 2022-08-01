import React from 'react'
import { HighlightBlurb, HighlightWrapper, Name, SliderWrap } from './styles'
import BodyText from '../../Typography/BodyText'
import ImageSlider from '../../UI/Swiper'
import { ContentfulImage } from '../../../_constants/DataTypes'

interface HighlightProps {
    data: {
        fields: {
            highlightName: string
            blurb: string
            images: ContentfulImage[]
        }
    }
    hideSeparator?: boolean
    propertySlug: string
}
const Highlight = ({
    data,
    hideSeparator = false,
    propertySlug,
}: HighlightProps) => {
    const { fields } = data
    const { highlightName, blurb, images } = fields
    return (
        <HighlightWrapper>
            {!hideSeparator && <div className="separator" />}
            <Name>{highlightName}</Name>
            <SliderWrap>
                {/*@ts-ignore*/}
                <ImageSlider
                    slug={propertySlug}
                    items={images}
                    slidesPerView={1}
                />
            </SliderWrap>
            <HighlightBlurb>
                {blurb && <BodyText size="lg">{blurb}</BodyText>}
            </HighlightBlurb>
        </HighlightWrapper>
    )
}

export default Highlight
