import React, { useState } from 'react'
import Link from 'next/link'

import {
    BottomContainer,
    Location,
    Metadata,
    StyledButton,
    TopContainer,
} from './styles'
import GridImage from '../UI/GridImage'
import Header from '../Typography/Header'
import BodyText from '../Typography/BodyText'
import LocationPin from '../UI/Icons/LocationPin'
import Share from '../UI/Icons/Share'
import { ItemWrapper } from '../../styles/global'

interface GridItemProps {
    propertyObj: any
    collapsed?: boolean
}
const PropertyGridItem = ({
    propertyObj,
    collapsed = false,
}: GridItemProps) => {
    const {
        bannerDescriptionList,
        tileImage,
        propertyName,
        location,
        propertyType,
        slug,
        bookNowLink,
    } = propertyObj

    const [copiedToClipboard, setClipboard] = useState(false)

    const copyToClipboard = () => {
        const copyText = `${window.location.host}/${slug}`
        navigator.clipboard.writeText(copyText)
        setClipboard(true)

        setTimeout(() => {
            setClipboard(false)
        }, 1000)
    }

    return (
        <ItemWrapper>
            <div className="border">
                <div>
                    <Link href={`/${slug}`} passHref shallow={false}>
                        <a>
                            <GridImage
                                sizes={'50vw'}
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
                                              i <
                                              bannerDescriptionList.length - 1
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
                        <Link href={`/${slug}`} passHref>
                            <a>
                                <Header bold={false} size={2}>
                                    {propertyName}
                                </Header>
                            </a>
                        </Link>
                        <BottomContainer>
                            <Location collapsed={collapsed}>
                                <LocationPin />
                                <BodyText size={'sm'}>
                                    {propertyType[0] === 'Suites'
                                        ? 'Apartments+'
                                        : propertyType[0]}
                                    , {location}
                                </BodyText>
                            </Location>
                            <StyledButton
                                collapsed={collapsed}
                                href={bookNowLink}
                                outsideLink
                            >
                                BOOK NOW
                            </StyledButton>
                        </BottomContainer>
                    </Metadata>
                </div>
            </div>
        </ItemWrapper>
    )
}

export default PropertyGridItem
