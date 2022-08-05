import React, { useContext, useEffect } from 'react'

import { Content, GridModule, GridWrapper } from '../../styles/globla'
import { viewportContext } from '../../_utils/ViewportProvider'
import PropertyGridItem from '../../_components/PropertyGridItem'
import { getAllProperties } from '../../_lib/api'

interface Props {
    properties: any
    setNavTheme: any
    setBucket: any
}

const Stays = ({ properties, setNavTheme, setBucket }: Props) => {
    const breakpoint = useContext(viewportContext)

    useEffect(() => {
        setNavTheme('dark')
        setBucket('Puerto Rico')
    })

    if (!properties.length) {
        return null
    }

    return (
        <Content padding>
            <GridWrapper border={false} padding>
                <GridModule columns={3} sideScrollOnMobile={false}>
                    {properties &&
                        properties.map(
                            (property: { slug: string }, i: number) => (
                                <PropertyGridItem
                                    key={property.slug + i}
                                    propertyObj={property}
                                />
                            )
                        )}
                </GridModule>
            </GridWrapper>
        </Content>
    )
}

export default Stays

export async function getStaticProps(context: { params: { slug: string } }) {
    const properties = await getAllProperties()

    return {
        props: {
            properties,
        },
    }
}
