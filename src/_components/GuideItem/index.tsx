import React from 'react'
import Link from 'next/link'
import GridImage from '../UI/GridImage'
import { GuidesMetadata } from './styles'
import Header from '../Typography/Header'
import BodyText from '../Typography/BodyText'

const GuideItem = ({ data }: any) => {
    const { title, slug, tileImage, description } = data

    return (
        <Link key={title} href={`/guide/${slug}`} passHref>
            <a>
                <GridImage
                    sizes={'33vw'}
                    imageObj={tileImage}
                    metadata={
                        <GuidesMetadata>
                            {/*<BodyText size="sm">
                                                      {guide.labels[0]}
                                                  </BodyText>*/}
                            <Header size={3}>{title}</Header>
                            <BodyText size="sm">{description}</BodyText>
                        </GuidesMetadata>
                    }
                />
            </a>
        </Link>
    )
}

export default GuideItem
