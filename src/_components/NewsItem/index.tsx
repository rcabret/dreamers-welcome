import React from 'react'
import BodyText from '../Typography/BodyText'
import Header from '../Typography/Header'
import GridImage from '../UI/GridImage'
import moment from 'moment'
import { News } from '../../_constants/DataTypes'
import { ItemWrapperStyled, NewsTextWrapper } from './styles'
import Link from 'next/link'

const NewsItem = ({ newsObj }: { newsObj: News }) => {
    const { date, title, text, tileImage, slug } = newsObj
    const stringDate = moment(date).format('MMMM Do YYYY')

    return (
        <Link href={`/news/${slug}`} passHref>
            <a>
                <ItemWrapperStyled>
                    <div className="border">
                        <BodyText size="sm">{stringDate}</BodyText>
                        <Header size={3}>{title}</Header>
                        <NewsTextWrapper>
                            <BodyText size="sm">{text}</BodyText>
                        </NewsTextWrapper>
                        <GridImage border={false} imageObj={tileImage} />
                    </div>
                </ItemWrapperStyled>
            </a>
        </Link>
    )
}

export default NewsItem
