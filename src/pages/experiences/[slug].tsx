import React, { useEffect, useState } from 'react'
import Blurb from '../../_components/UI/Blurb'
import SubNavigation from '../../_components/Navigation/SubNavigation'
import GridImage from '../../_components/UI/GridImage'
import { GridModule, GridWrapper } from '../../styles/global'
import Link from 'next/link'
import BodyText from '../../_components/Typography/BodyText'
import Header from '../../_components/Typography/Header'
import { GuidesMetadata } from '../../styles/guides/styles'
import { PriceText } from '../../styles/experiences/styles'
import { useRouter } from 'next/router'
import { getExperiences, getExperiencesPage } from '../../_lib/api'

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

const Experiences = ({ experiences, experiencesPage, setNavTheme }: any) => {
    setNavTheme('dark')
    const router = useRouter()

    const { blurb } = experiencesPage
    // @ts-ignore
    const [activeSlug, setSlug] = useState<string>(
        router.query.type || 'view_all'
    )
    const [activeExperiences, setExperiences] = useState<any[]>([
        ...experiences,
    ])

    useEffect(() => {
        const type = (router.query.type as string) || ('view_all' as string)
        // @ts-ignore
        setSlug(type)
        const expToView =
            type !== 'view_all'
                ? [...experiences].filter((exp: { type: string }) =>
                      exp.type.includes(type)
                  )
                : [...experiences]

        setExperiences(expToView)
    }, [router, router.query])

    return (
        <>
            <Blurb text={blurb} eyebrow="EXPERIENCES" fullHeight />
            <SubNavigation
                data={links}
                queryParam="type"
                queryArray={['puertorico', 'experiences']}
                activeState={activeSlug}
            />
            <GridWrapper padding id="anchor_view">
                <GridModule columns={3}>
                    {activeExperiences && activeExperiences.length
                        ? activeExperiences.map((exp: any) => (
                              <Link
                                  key={exp.title}
                                  href={`/experience/${exp.slug}`}
                                  passHref
                              >
                                  <a>
                                      <GridImage
                                          imageObj={exp.tileImage}
                                          metadata={
                                              <GuidesMetadata>
                                                  <Header size={3}>
                                                      {exp.title}
                                                  </Header>
                                                  <PriceText>
                                                      <Header size={2}>
                                                          {exp.price}
                                                      </Header>
                                                      <span> per person</span>
                                                  </PriceText>
                                                  <BodyText size="sm">
                                                      {exp.tileText}
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
    const paths = [
        { params: { slug: 'puertorico' } },
    ]
    return {
        // @ts-ignore
        paths: paths,
        fallback: false,
    }
}
