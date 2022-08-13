import React, { useEffect, useState } from 'react'
import { getGuides, getGuidesPage } from '../../../_lib/api'
import Blurb from '../../../_components/UI/Blurb'
import SubNavigation from '../../../_components/Navigation/SubNavigation'
import GridImage from '../../../_components/UI/GridImage'
import { GridModule, GridWrapper } from '../../../styles/global'
import Link from 'next/link'
import BodyText from '../../../_components/Typography/BodyText'
import Header from '../../../_components/Typography/Header'
import { GuidesMetadata } from '../../../styles/guides/styles'
import { useRouter } from 'next/router'

const links: { name: string; slug: string }[] = [
    {
        name: 'VIEW ALL',
        slug: 'view_all',
    },
    {
        name: 'NORTH',
        slug: 'north',
    },
    {
        name: 'EAST',
        slug: 'east',
    },
    {
        name: 'WEST',
        slug: 'west',
    },
    {
        name: 'SOUTH',
        slug: 'south',
    },
]

const PRGuides = ({ guides, guidesPage, setNavTheme }: any) => {
    console.log(guides, guidesPage)
    setNavTheme('dark')
    const router = useRouter()

    // @ts-ignore
    const [activeSlug, setSlug] = useState<string>(
        router.query.location || 'view_all'
    )

    useEffect(() => {
        // @ts-ignore
        setSlug(router.query.location || 'view_all')
    }, [router, router.query])

    return (
        <>
            <Blurb text={guidesPage.blurb} eyebrow="GUIDES" />
            <SubNavigation
                data={links}
                queryParam="location"
                queryArray={['puertorico', 'guides']}
                activeState={activeSlug}
            />
            <GridWrapper padding>
                <GridModule columns={3}>
                    {guides &&
                        guides.length &&
                        guides.map((guide: any) => (
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
                        ))}
                </GridModule>
            </GridWrapper>
        </>
    )
}

export default PRGuides

export async function getStaticProps(context: { params: { slug: string } }) {
    const guides = await getGuides('puertorico')
    const guidesPage = await getGuidesPage('puertorico')
    return {
        props: {
            guides,
            guidesPage,
        },
    }
}
