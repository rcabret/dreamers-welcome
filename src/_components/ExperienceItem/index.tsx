import React from 'react'
import Link from 'next/link'
import GridImage from '../UI/GridImage'
import Header from '../Typography/Header'
import { PriceText } from '../../styles/experiences/styles'
import BodyText from '../Typography/BodyText'
import { GuidesMetadata } from '../GuideItem/styles'
import {parseMoneyOrTime} from "../../_utils/Parsers";

const ExperienceItem = ({ data }: any) => {
    const { title, slug, tileImage, price, tileText } = data
    return (
        <Link key={title} href={`/experience/${slug}`} passHref>
            <a>
                <GridImage
                    imageObj={tileImage}
                    metadata={
                        <GuidesMetadata>
                            <Header size={3}>{title}</Header>
                            <PriceText>
                                <Header size={2}>{parseMoneyOrTime(price)}</Header>
                                <span> per person</span>
                            </PriceText>
                            <BodyText size="sm">{tileText}</BodyText>
                        </GuidesMetadata>
                    }
                />
            </a>
        </Link>
    )
}

export default ExperienceItem
