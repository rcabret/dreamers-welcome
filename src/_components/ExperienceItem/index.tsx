import React, { useContext } from 'react'
import Link from 'next/link'
import GridImage from '../UI/GridImage'
import Header from '../Typography/Header'
import { PriceText } from '../../styles/experiences/styles'
import BodyText from '../Typography/BodyText'
import { GuidesMetadata } from '../GuideItem/styles'
import { parseMoneyOrTime } from '../../_utils/Parsers'
import { viewportContext } from '../../_utils/ViewportProvider'

const ExperienceItem = ({ data }: any) => {
    const { title, slug, tileImage, price, tileText, includedWithStay } = data
    const breakpoint = useContext(viewportContext)
    return (
        <Link key={title} href={`/experience/${slug}`} passHref>
            <a>
                <GridImage
                    sizes={'33vw'}
                    imageObj={tileImage}
                    metadata={
                        <GuidesMetadata>
                            <Header size={3}>{title}</Header>
                            {!includedWithStay ? (
                                <PriceText>
                                    <Header size={2}>
                                        {parseMoneyOrTime(price)}
                                    </Header>
                                    <span> per person</span>
                                </PriceText>
                            ) : (
                                <PriceText>
                                    <Header size={4}>Included with stay</Header>
                                </PriceText>
                            )}
                            {breakpoint !== 'mobile' && (
                                <BodyText size="sm">{tileText}</BodyText>
                            )}
                        </GuidesMetadata>
                    }
                />
            </a>
        </Link>
    )
}

export default ExperienceItem
