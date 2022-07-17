import React from 'react'
import Link from 'next/link'

import {
    BottomContainer,
    ItemWrapper,
    Location,
    Metadata,
    TopContainer,
} from './styles'
import GridImage from '../UI/GridImage'
import Header from '../Typography/Header'
import BodyText from '../Typography/BodyText'
import LocationPin from '../UI/Icons/LocationPin'
import Button from '../UI/Buttons/Button'

interface GridItemProps {
    propertyObj: any
}
const PropertyGridItem = ({ propertyObj }: GridItemProps) => {
    const {
        bannerDescriptionList,
        tileImage,
        propertyName,
        location,
        propertyType,
        bucket,
        slug,
        bookNowLink,
    } = propertyObj

    const url = slug
        ? `/${bucket[0].toLowerCase().replace(/\s/g, '')}/${slug}`
        : '/'

    return (
        <ItemWrapper>
            <Link href={url} passHref>
                <a>
                    <GridImage
                        borderRadius={false}
                        border={false}
                        ratio={0.68}
                        imageObj={tileImage}
                    />
                </a>
            </Link>
            <Metadata>
                <TopContainer>
                    <BodyText size="sm">
                        {Array.isArray(bannerDescriptionList)
                            ? bannerDescriptionList.map((x, i) => {
                                  return `${x} ${
                                      i < bannerDescriptionList.length - 1
                                          ? '· '
                                          : ''
                                  }`
                              })
                            : bannerDescriptionList}
                    </BodyText>
                    <BodyText className="share" size="sm">
                        Share
                    </BodyText>
                </TopContainer>
                <Link href={url} passHref>
                    <a>
                        <Header bold={false} size={2}>
                            {propertyName}
                        </Header>
                    </a>
                </Link>
                <BottomContainer>
                    <Location>
                        <LocationPin />
                        <BodyText size={'sm'}>
                            {propertyType[0]}, {location}
                        </BodyText>
                    </Location>
                    <Button href={bookNowLink}>BOOK NOW</Button>
                </BottomContainer>
            </Metadata>
        </ItemWrapper>
    )
}

export default PropertyGridItem
