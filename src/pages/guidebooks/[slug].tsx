import React, { useEffect, useState } from 'react'
import { getGuides, getGuidesPage } from '../../_lib/api'
import Blurb from '../../_components/UI/Blurb'
import SubNavigation from '../../_components/Navigation/SubNavigation'
import { GridModule, GridWrapper } from '../../styles/global'

import { useRouter } from 'next/router'
import GuideItem from '../../_components/GuideItem'
import { pathToBucket } from '../../_utils/Parsers'
import Head from 'next/head'


const links: { name: string; slug: string }[] = [
    {
        name: 'VIEW ALL',
        slug: 'view_all',
    },
    {
        name: 'ADVENTURE',
        slug: 'adventure',
    },
    {
        name: 'CULTURE',
        slug: 'culture',
    },
    {
        name: 'FOOD',
        slug: 'food',
    },
]

const GuideBooks = ({
    guides,
    guidesPage,
    setNavTheme,
    setHeaderData,
    seoData
}: any) => {
    const router = useRouter()
    const [property,setproperty]=useState('')
    const [activeSlug, setSlug] = useState<string>(
        (router.query.type as string) || 'view_all'
    )
    const [activeGuides, setGuides] = useState<any[]>([...guides])

    useEffect(() => {
        setNavTheme('dark')

        const slug = router.query.slug as string
        setproperty(slug)
        
        // if (router.asPath.includes('/puertorico')) {
        //     setHeaderData({
        //         bucket: 'Puerto Rico',
        //         simpleNav: false,
        //         property: undefined,
        //     })
        // }
        // else if (router.asPath.includes('/northcarolina')) {
        //     setHeaderData({
        //         bucket: 'North Carolina',
        //         simpleNav: false,
        //         property: undefined,
        //     })
        // }
        // else {
        //     setHeaderData({
        //         bucket: '',
        //         simpleNav: false,
        //         property: undefined,
        //     })
        // }
        setHeaderData({
            bucket: pathToBucket(slug || ''),
            simpleNav: false,
            property: undefined,
        })
    }, [])




    useEffect(() => {
        const queryTag = (router.query.type as string) || ('view_all' as string)
        // @ts-ignore
        setSlug(queryTag)

        const checkForTags = (tags: any[], slug: string) => {
            if (!tags.length) {
                return
            }
            return tags.find((tag: any) => tag.sys.id === slug)
        }

        const guidesToView =
            queryTag !== 'view_all'
                ? [...guides].filter((guide: any) =>
                      checkForTags(guide.metadata.tags, queryTag)
                  )
                : [...guides]

        setGuides(guidesToView)
    }, [router, router.query])

    return (
        <>
          
          <Head>
                <title>
                    {seoData.metaTitle}
                </title>
                <meta
                    name="description"
                    content={seoData.metaDescription}
                />
                <link
                    rel="canonical"
                    href={
                       seoData.canonicalUrl
                    }
                />
            </Head>
            <Blurb text={guidesPage.blurb} eyebrow="GUIDEBOOKS" fullHeight />
            {activeGuides && activeGuides.length ? (
                <SubNavigation
                    activeSlug={activeSlug}
                    data={links}
                    queryParam="type"
                    queryArray={router.query.slug || []}
                />
            ) : null}

            <GridWrapper padding id="anchor_view">
                <GridModule columns={3}>
                    {activeGuides && activeGuides.length
                        ? activeGuides.map((guide: { fields: any }) => {
                              return <GuideItem data={guide.fields} />
                          })
                        : null}
                </GridModule>
            </GridWrapper>
        </>
    )
}

export default GuideBooks

export async function getStaticProps(context: { params: { slug: string } }) {
    const guides = await getGuides()
    console.log("guides ---",guides)
    const guidesPage = await getGuidesPage(context.params.slug)
    const seoData = guidesPage?.seoMetadata?.fields
    const defaultSeoTitle = context.params.slug === 'northcarolina'
        ? 'North Carolina Guidebooks | Dreamers Welcome'
        : 'Puerto Rico Guidebooks | Dreamers Welcome'
    const defaultSeoDesc = context.params.slug === 'northcarolina'
        ? 'Immerse yourself in our North Carolina designer hotel & laidback luxury vacation rentals. Our detailed guidebooks will walk you through North Carolina stunning landscape'
        : 'Immerse yourself in our Puerto Rican designer hotel & laidback luxury vacation rentals. Our detailed guidebooks will walk you through Puerto Rico rich culture.'
    const defaultCanonicalUrl =  context.params.slug === 'northcarolina'
        ? 'https://www.dreamerswelcome.com/guidebooks/northcarolina'
        : 'https://www.dreamerswelcome.com/guidebooks/puertorico'

    return {
        props: {
            guides,
            guidesPage,
            seoData: {
                metaTitle: seoData?.metaTitle ?? defaultSeoTitle,
                metaDescription: seoData?.metaDescription ?? defaultSeoDesc,
                canonicalUrl: seoData?.canonicalUrl ?? defaultCanonicalUrl
            }
        },
    }
}

export async function getStaticPaths(context: { params: { slug: string } }) {
    const paths = [
        { params: { slug: 'puertorico' } },
        { params: { slug: 'northcarolina' } },
    ]
    return {
        // @ts-ignore
        paths: paths,
        fallback: false,
    }
}