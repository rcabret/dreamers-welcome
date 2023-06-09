import React, { useContext } from 'react'
import BodyText from '../Typography/BodyText'
import Header from '../Typography/Header'
import GridImage from '../UI/GridImage'
import moment from 'moment'
import { News } from '../../_constants/DataTypes'
import { ItemWrapperStyled, NewsTextWrapper } from './styles'
import { viewportContext } from '../../_utils/ViewportProvider'

const NewsItem = ({ newsObj }: { newsObj: News }) => {
    const { date, title, text, tileImage, slug } = newsObj
    const stringDate = moment(date).format('MMMM Do YYYY')
    const breakpoint = useContext(viewportContext)

    return (
        <a href={slug} target="_blank">
            <ItemWrapperStyled>
                <div className="border">
                    <BodyText size="sm">{stringDate}</BodyText>
                    <Header size={3}>{title}</Header>
                    {breakpoint !== 'mobile' && (
                        <NewsTextWrapper>
                            <BodyText size="sm">{text}</BodyText>
                        </NewsTextWrapper>
                    )}
                    <GridImage border={false} imageObj={tileImage} />
                </div>
            </ItemWrapperStyled>
        </a>
    )
}

export default NewsItem
