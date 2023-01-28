import React from 'react'
import Link from 'next/link'
import GridImage from '../UI/GridImage'
import { GuidesMetadata } from './styles'
import Header from '../Typography/Header'
import BodyText from '../Typography/BodyText'

const GuideItem = ({ data }: any) => {
    const { title, slug, tileImage, description } = data

    return (
        <Link key={title} href={`/guidebook/${slug}`} passHref>
            <a>
                <GridImage
                    sizes={'33vw'}
                    imageObj={tileImage}
                    metadata={
                        <GuidesMetadata>
                            <Header size={3}>{title}</Header>
                            <BodyText size="sm">
                                {description.substring(0, 300)}
                                {description.length > 300 && '... (Read More)'}
                            </BodyText>
                        </GuidesMetadata>
                    }
                />
            </a>
        </Link>
    )
}

export default GuideItem
