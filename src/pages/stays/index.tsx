import React, { useContext, useEffect } from 'react'

import Link from 'next/link'

import { Content, GridModule, GridWrapper } from '../../styles/globla'
import { viewportContext } from '../../_utils/ViewportProvider'
import PropertyGridItem from '../../_components/PropertyGridItem'
import { getAllProperties } from '../../_lib/api'

interface Props {
    properties: any
}

const Stays = ({ properties }: Props) => {
    const breakpoint = useContext(viewportContext)

    useEffect(() => {})

    if (!properties.length) {
        return null
    }

    return (
        <Content>
            <GridWrapper border={false} padding>
                <GridModule columns={3} sideScrollOnMobile={false}>
                    {properties &&
                        properties.map(
                            (
                                property: { bucket: string[]; name: string },
                                i: number
                            ) => {
                                const { bucket, name } = property
                                const url = name
                                    ? `/${bucket[0]}/${name.toLowerCase()}`
                                    : '/'
                                return (
                                    <Link
                                        href={url}
                                        passHref
                                        key={Math.random() * i}
                                    >
                                        <a>
                                            <PropertyGridItem
                                                propertyObj={property}
                                            />
                                        </a>
                                    </Link>
                                )
                            }
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
