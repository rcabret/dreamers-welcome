import React, { useState } from 'react'
import Link from 'next/link'

import { BottomContainer, Location, Metadata, TopContainer } from './styles'
import GridImage from '../UI/GridImage'
import Header from '../Typography/Header'
import BodyText from '../Typography/BodyText'
import LocationPin from '../UI/Icons/LocationPin'
import Button from '../UI/Buttons/Button'
import Share from '../UI/Icons/Share'
import { ItemWrapper } from '../../styles/global'

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

    const [copiedToClipboard, setClipboard] = useState(false)

    const copyToClipboard = () => {
        const copyText = `https://www.dreamerswelcome.com${url}`
        navigator.clipboard.writeText(copyText)
        setClipboard(true)

        setTimeout(() => {
            setClipboard(false)
        }, 3000)
    }

    return (
        <ItemWrapper>
            <div className="border">
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
                        <div
                            className="share"
                            onClick={() => copyToClipboard()}
                        >
                            {!copiedToClipboard ? (
                                <>
                                    <Share />
                                    <BodyText size="sm">Share</BodyText>
                                </>
                            ) : (
                                <BodyText size="sm">
                                    Copied to clipboard
                                </BodyText>
                            )}
                        </div>
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
            </div>
        </ItemWrapper>
    )
}

export default PropertyGridItem
