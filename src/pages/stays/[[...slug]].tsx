import React, { useContext, useEffect, useState } from 'react'

import { Content, GridModule, GridWrapper } from '../../styles/global'
import { viewportContext } from '../../_utils/ViewportProvider'
import PropertyGridItem from '../../_components/PropertyGridItem'
import { getPropertiesViaBucket } from '../../_lib/api'
import { pathToBucket } from '../../_utils/Parsers'
import { useRouter } from 'next/router'
import Head from 'next/head'
import SubNavigation from '../../_components/Navigation/SubNavigation'

interface Props {
    properties: any
    setNavTheme: any
    setHeaderData: any
}

const links: { name: string; slug: string }[] = [
    {
        name: 'VIEW ALL',
        slug: 'view_all',
    },
    {
        name: 'APARTMENTS',
        slug: 'Suites',
    },
    {
        name: 'HOTEL',
        slug: "Hotel",
    },
    {
        name: 'HOUSE',
        slug: "House",
    }
]

const Stays = ({ properties, setNavTheme, setHeaderData }: Props) => {
    const breakpoint = useContext(viewportContext)
    const router = useRouter()
    const [bucket, setBucket] = useState('');

    useEffect(() => {
        setNavTheme('dark')

        const bkt = router.query.slug
            ? pathToBucket(router.query.slug[0] as string)
            : undefined
        setBucket(bkt as string)
        setHeaderData({
            bucket: bkt,
        })
    }, [])

    const [activeSlug, setSlug] = useState<string>(
        (router.query.type as string) || 'view_all'
    )
    const [activeStays, setActiveStays] = useState<any[]>([
        ...properties,
    ])

    useEffect(() => {
        const queryTag = (router.query.type as string) || ('view_all' as string)
        // @ts-ignore
        setSlug(queryTag)

        const checkForTags = (properties: any[], slug: string) => {
            
            if (!properties.length) {
                return [...properties]
            }
            return  properties.find((tag: any) => tag === slug)
        }

        const propertiesToView =
            queryTag !== 'view_all'
                ? [...properties].filter((items: any) =>
                    checkForTags(items.propertyType, queryTag)
                )
                : [...properties]

        setActiveStays(propertiesToView)
    }, [router, router.query])
    
    useEffect(() => { }, [activeStays])

    if (!properties.length) {
        return null
    }
    return (
        <>
            <Head>
                <title>Stays | Dreamers Welcome</title>
            </Head>
            <Content padding>
            <SubNavigation
                activeSlug={activeSlug}
                data={links}
                queryParam="type"
                queryArray={router.query.slug || []}
            />
                <GridWrapper border={false} padding>
                    <GridModule columns={bucket == "North Carolina" ? 2 : 3} sideScrollOnMobile={false}>
                        {activeStays &&
                            activeStays.map(
                                (property: { slug: string }, i: number) => (
                                    <PropertyGridItem
                                        collapsed
                                        key={property.slug + i}
                                        propertyObj={property}
                                    />
                                )
                            )}
                    </GridModule>
                </GridWrapper>
            </Content>
        </>
    )
}

export default Stays

export async function getStaticProps(context: { params: { slug: string[] } }) {
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
