import React from 'react'
import { BottomContainer, ItemWrapper, Location, Metadata } from './styles'
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
    } = propertyObj

    return (
        <ItemWrapper>
            <GridImage
                borderRadius={false}
                border={false}
                ratio={0.68}
                imageObj={tileImage}
            />
            <Metadata>
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
                <Header bold={false} size={2}>
                    {propertyName}
                </Header>
                <BottomContainer>
                    <Location>
                        <LocationPin />
                        <BodyText size={'sm'}>
                            {propertyType[0]}, {location}
                        </BodyText>
                    </Location>
                    <Button>BOOK NOW</Button>
                </BottomContainer>
            </Metadata>
        </ItemWrapper>
    )
}

export default PropertyGridItem
