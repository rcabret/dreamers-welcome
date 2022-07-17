import React from 'react'
import { ItemWrapper, Metadata } from './styles'
import GridImage from '../UI/GridImage'

interface GridItemProps {
    propertyObj: any
}
const PropertyGridItem = ({ propertyObj }: GridItemProps) => {
    console.log(propertyObj)
    return (
        <ItemWrapper>
            <GridImage
                borderRadius={false}
                border={false}
                ratio={0.68}
                imageObj={propertyObj.tileImage}
            />
            <Metadata>Test</Metadata>
        </ItemWrapper>
    )
}

export default PropertyGridItem
