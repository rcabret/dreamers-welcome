import React from 'react'
import { ItemWrapper, Metadata } from './styles'
import GridImage from '../UI/GridImage'
import Header from '../Typography/Header'
import BodyText from '../Typography/BodyText'

interface GridItemProps {
    propertyObj: any
}
const PropertyGridItem = ({ propertyObj }: GridItemProps) => {
    const { bannerDescriptionList, tileImage, propertyName } = propertyObj

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
                                  i < bannerDescriptionList.length - 1 ? '· ' : ''
                              }`
                          })
                        : bannerDescriptionList}
                </BodyText>
                <Header bold={false} size={2}>
                    {propertyName}
                </Header>
            </Metadata>
        </ItemWrapper>
    )
}

export default PropertyGridItem
