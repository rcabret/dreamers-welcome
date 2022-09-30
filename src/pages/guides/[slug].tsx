import React, { useEffect, useState } from 'react'
import { getGuides, getGuidesPage } from '../../_lib/api'
import Blurb from '../../_components/UI/Blurb'
import SubNavigation from '../../_components/Navigation/SubNavigation'
import GridImage from '../../_components/UI/GridImage'
import { GridModule, GridWrapper } from '../../styles/global'
import Link from 'next/link'
import BodyText from '../../_components/Typography/BodyText'
import Header from '../../_components/Typography/Header'
import { GuidesMetadata } from '../../styles/guides/styles'
import { useRouter } from 'next/router'
import GuideItem from '../../_components/GuideItem'

const links: { name: string; slug: string }[] = [
    {
        name: 'VIEW ALL',
        slug: 'view_all',
    },
    {
        name: 'CULTURE',
        slug: 'culture',
    },
    {
        name: 'FOOD',
        slug: 'food',
    },
    {
        name: 'OUTDOOR',
        slug: 'outdoor',
    },
]

const Guides = ({ guides, guidesPage, setNavTheme }: any) => {
    setNavTheme('dark')
    const router = useRouter()

    const [activeSlug, setSlug] = useState<string>(
        (router.query.type as string) || 'view_all'
    )
    const [activeGuides, setGuides] = useState<any[]>([...guides])

    useEffect(() => {
        const queryTag = (router.query.type as string) || ('view_all' as string)
        // @ts-ignore
        setSlug(queryTag)
        const guidesToView =
            queryTag !== 'view_all'
                ? [...guides].filter(
                      (guide: { metadata: { tags: { id: string }[] } }) =>
                          guide.metadata.tags.find((tag) => tag.id === queryTag)
                  )
                : [...guides]

        setGuides(guidesToView)
    }, [router, router.query])

    return (
        <>
            <Blurb text={guidesPage.blurb} eyebrow="GUIDES" fullHeight />
            <SubNavigation
                activeSlug={activeSlug}
                data={links}
                queryParam="type"
                queryArray={router.query.slug || []}
            />

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

export default Guides

export async function getStaticProps(context: { params: { slug: string } }) {
    const guides = await getGuides(context.params.slug)
    const guidesPage = await getGuidesPage(context.params.slug)
    return {
        props: {
            guides,
            guidesPage,
        },
    }
}

export async function getStaticPaths(context: { params: { slug: string } }) {
    const paths = [{ params: { slug: 'puertorico' } }]
    return {
        // @ts-ignore
        paths: paths,
        fallback: false,
    }
}
