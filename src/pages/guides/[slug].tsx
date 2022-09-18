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

    // @ts-ignore
    const [activeSlug, setSlug] = useState<string>(
        router.query.type || 'view_all'
    )
    const [activeGuides, setGuides] = useState<any[]>([...guides])

    useEffect(() => {
        const type = (router.query.type as string) || ('view_all' as string)
        // @ts-ignore
        setSlug(type)
        const guidesToView =
            type !== 'view_all'
                ? [...guides].filter((guide: { type: string }) =>
                      guide.type.includes(type)
                  )
                : [...guides]

        setGuides(guidesToView)
    }, [router, router.query])

    return (
        <>
            <Blurb text={guidesPage.blurb} eyebrow="GUIDES" fullHeight />
            <SubNavigation
                data={links}
                queryParam="type"
                queryArray={['puertorico', 'guides']}
                activeState={activeSlug}
            />
            <GridWrapper padding id="anchor_view">
                <GridModule columns={3}>
                    {activeGuides && activeGuides.length
                        ? activeGuides.map((guide: any) => (
                              <Link
                                  key={guide.title}
                                  href={`/guide/${guide.slug}`}
                                  passHref
                              >
                                  <a>
                                      <GridImage
                                          imageObj={guide.tileImage}
                                          metadata={
                                              <GuidesMetadata>
                                                  <BodyText size="sm">
                                                      {guide.labels[0]}
                                                  </BodyText>
                                                  <Header size={3}>
                                                      {guide.title}
                                                  </Header>
                                                  <BodyText size="sm">
                                                      {guide.description}
                                                  </BodyText>
                                              </GuidesMetadata>
                                          }
                                      />
                                  </a>
                              </Link>
                          ))
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
    const paths = [
        { params: { slug: 'puertorico' } },
    ]
    return {
        // @ts-ignore
        paths: paths,
        fallback: false,
    }
}
