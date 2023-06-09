import React from 'react'
import BodyText from '../Typography/BodyText'
import GridImage from '../UI/GridImage'
import moment from 'moment'
import { ImageWrapper, ItemWrapperStyled, TopSection } from './styles'

const ReviewItem = ({ data }: any) => {
    const { name, date, text, coverImage } = data
    const stringDate = moment(date).format('DD.MMM.YYYY')

    return (
        <div style={{ border: '10px solid transparent' }}>
            <ItemWrapperStyled>
                <TopSection>
                    <ImageWrapper>
                        <GridImage  ratio={1} sizes={'5vw'} border={false} imageObj={coverImage} />
                    </ImageWrapper>
                    <section>
                        <BodyText bold size="sm"> {name} </BodyText>
                        <BodyText uppercase size="sm"> {stringDate} </BodyText>
                    </section>
                </TopSection>
                <BodyText size="sm">{text}</BodyText>
            </ItemWrapperStyled>
        </div>
    )
}

export default ReviewItem
