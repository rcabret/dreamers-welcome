import React, { useEffect, useState } from 'react'
import Blurb from '../../_components/UI/Blurb'
import SubNavigation from '../../_components/Navigation/SubNavigation'
import { GridModule, GridWrapper } from '../../styles/global'
import { useRouter } from 'next/router'
import { getExperiences, getExperiencesPage } from '../../_lib/api'
import ExperienceItem from '../../_components/ExperienceItem'
import { pathToBucket } from '../../_utils/Parsers'

const links: { name: string; slug: string }[] = [
    {
        name: 'VIEW ALL',
        slug: 'view_all',
    },
    {
        name: 'OUTDOOR',
        slug: 'outdoor',
    },
    {
        name: 'FOOD',
        slug: 'food',
    },
    {
        name: 'WELLNESS',
        slug: 'wellness',
    },
]

const Experiences = ({
    experiences,
    experiencesPage,
    setNavTheme,
    setHeaderData,
}: any) => {
    const router = useRouter()

    useEffect(() => {
        setNavTheme('dark')
        setHeaderData({
            bucket: pathToBucket(router.query.slug as string),
        })
    }, [])
    const { blurb } = experiencesPage
    const [activeSlug, setSlug] = useState<string>(
        (router.query.type as string) || 'view_all'
    )
    const [activeExperiences, setExperiences] = useState<any[]>([
        ...experiences,
    ])

    useEffect(() => {
        const queryTag = (router.query.type as string) || ('view_all' as string)
        // @ts-ignore
        setSlug(queryTag)
        const expToView =
            queryTag !== 'view_all'
                ? [...experiences].filter(
                      (exp: { metadata: { tags: { id: string }[] } }) =>
                          exp.metadata.tags.find((tag) => tag.id === queryTag)
                  )
                : [...experiences]

        setExperiences(expToView)
    }, [router, router.query])

    return (
        <>
            <Blurb text={blurb} eyebrow="EXPERIENCES" fullHeight />
            <SubNavigation
                activeSlug={activeSlug}
                data={links}
                queryParam="type"
                queryArray={router.query.slug || []}
            />
            <GridWrapper padding id="anchor_view">
                <GridModule columns={3}>
                    {activeExperiences && activeExperiences.length
                        ? activeExperiences.map((exp: any) => (
                              <ExperienceItem data={exp} />
                          ))
                        : null}
                </GridModule>
            </GridWrapper>
        </>
    )
}

export default Experiences

export async function getStaticProps(context: { params: { slug: string } }) {
    const experiences = await getExperiences(context.params.slug)
    const experiencesPage = await getExperiencesPage(context.params.slug)
    return {
        props: {
            experiences,
            experiencesPage,
        },
    }
}

export async function getStaticPaths() {
    const paths = [{ params: { slug: 'puertorico' } }]
    return {
        // @ts-ignore
        paths: paths,
        fallback: false,
    }
}
