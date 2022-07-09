import React from 'react'
import { HighlightBlurb, HighlightWrapper, Name } from './styles'
import BodyText from '../../Typography/BodyText'

interface HighlightProps {
    data: {
        fields: {
            highlightName: string
            highlightBlurb: string
            images: []
        }
    }
}
const Hightlight = ({ data }: HighlightProps) => {
    const { fields } = data
    const { highlightName, highlightBlurb, images } = fields
    return (
        <HighlightWrapper>
            <Name>{highlightName}</Name>
            <HighlightBlurb>
                {highlightBlurb && <BodyText>{highlightBlurb}</BodyText>}
            </HighlightBlurb>
        </HighlightWrapper>
    )
}

export default Hightlight
