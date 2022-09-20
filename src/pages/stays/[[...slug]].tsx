import React, { useContext, useEffect } from 'react'

import { Content, GridModule, GridWrapper } from '../../styles/global'
import { viewportContext } from '../../_utils/ViewportProvider'
import PropertyGridItem from '../../_components/PropertyGridItem'
import { getAllProperties, getPropertiesViaBucket } from '../../_lib/api'

interface Props {
    properties: any
    setNavTheme: any
    setBucket: any
}

const Stays = ({ properties, setNavTheme, setHeaderData }: Props) => {
    const breakpoint = useContext(viewportContext)

    useEffect(() => {
        setNavTheme('dark')
        setHeaderData({
            bucket: 'Puerto Rico',
        })
    }, [])

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
    const properties = await getPropertiesViaBucket(
        context.params.slug ? context.params.slug[0] : undefined
    )

    return {
        props: {
            properties,
        },
    }
}

export async function getStaticPaths(context: { params: { slug: string } }) {
    const paths = [
        { params: { slug: ['puertorico'] } },
        { params: { slug: ['northcarolina'] } },
        { params: { slug: [''] } },
    ]
    return {
        // @ts-ignore
        paths: paths,
        fallback: false,
    }
}
