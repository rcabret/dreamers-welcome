import React, { useContext, useEffect } from 'react'
import {
    BannerGridImage,
    BlockListWrap,
    GridModule,
    Stat,
    StatsGridModule,
    StyledBlockForGrid,
} from '../../styles/global'
import BannerContent from '../../_components/UI/BannerContent'
import { getExperience, getExperiences } from '../../_lib/api'
import Block from '../../_components/UI/Block'
import BodyText from '../../_components/Typography/BodyText'
import { ConceptTextContainer } from '../../styles/about/styles'
import Blurb from '../../_components/UI/Blurb'
import { bucketToPath, parseMoneyOrTime } from '../../_utils/Parsers'
import Header from '../../_components/Typography/Header'
import MarkdownModule from '../../_components/Typography/MarkdownModule'
import ExperienceItem from '../../_components/ExperienceItem'
import safeJsonStringify from 'safe-json-stringify'
import { viewportContext } from '../../_utils/ViewportProvider'

const Experience = ({ experience, setHeaderData, setNavTheme }: any) => {
    const {
        bannerImage,
        title,
        blurb,
        info,
        details,
        bookNowLink,
        thingsToKnow,
        bucket,
        otherExperiences,
    } = experience

    const breakpoint = useContext(viewportContext)

    useEffect(() => {
        setNavTheme('light')
        setHeaderData({
            bucket: bucket[0],
        })
    }, [])

    return (
        <>
            <BannerGridImage
                imageObj={bannerImage}
                border={false}
                borderRadius={false}
                fullHeight
            >
                <BannerContent
                    headerText={title}
                    bookNowLink={bookNowLink}
                    ctaText="RESERVE NOW"
                />
            </BannerGridImage>
            <Blurb text={blurb} />
            <Block
                title="INFO"
                content={
                    <ConceptTextContainer>
                        <BodyText size="xlg">{info}</BodyText>
                    </ConceptTextContainer>
                }
            />
            {details && details.length && (
                <Block
                    title="DETAILS"
                    noPaddingBottom
                    content={
                        <StatsGridModule columns={details.length}>
                            {details &&
                                details.map((stat: any, i: number) => {
                                    const { title, text } = stat.fields
                                    return (
                                        <div key={title}>
                                            {breakpoint == 'mobile' && (
                                                <BodyText size="md">
                                                    {title}
                                                </BodyText>
                                            )}
                                            <Stat>
                                                {parseMoneyOrTime(text, 30)}
                                            </Stat>
                                            {breakpoint !== 'mobile' && (
                                                <BodyText size="md">
                                                    {title}
                                                </BodyText>
                                            )}
                                        </div>
                                    )
                                })}
                        </StatsGridModule>
                    }
                />
            )}

            {thingsToKnow && thingsToKnow.length && (
                <Block
                    title="THINGS TO KNOW"
                    content={
                        <GridModule columns={thingsToKnow.length}>
                            {thingsToKnow &&
                                thingsToKnow.map((stat: any, i: number) => {
                                    const { title, text } = stat.fields
                                    return (
                                        <BlockListWrap key={title}>
                                            <Header size={4}>{title}</Header>
                                            <MarkdownModule data={text} />
                                        </BlockListWrap>
                                    )
                                })}
                        </GridModule>
                    }
                />
            )}

            {otherExperiences && otherExperiences.length && (
                <StyledBlockForGrid
                    title="MORE EXPERIENCES"
                    fullWidth
                    noPaddingBottom
                    link={`/experiences/${bucketToPath(bucket[0])}`}
                    content={
                        <GridModule
                            columns={otherExperiences.length}
                            sideScrollOnMobile
                        >
                            {otherExperiences &&
                                otherExperiences.length &&
                                otherExperiences.map((exp: any) => (
                                    <ExperienceItem data={exp.fields} />
                                ))}
                        </GridModule>
                    }
                />
            )}
        </>
    )
}

export default Experience

export async function getStaticProps(context: { params: { slug: string } }) {
    const rawData = await getExperience(context.params.slug)
    const stringData = safeJsonStringify(rawData)
    const experience = JSON.parse(stringData)

    return {
        props: {
            experience,
        },
    }
}

export async function getStaticPaths() {
    const experience = await getExperiences()
    const paths: any = []
    experience.forEach((x: { fields: { slug: string } }) => {
        const { slug } = x.fields
        paths.push({ params: { slug: slug } })
    })
    return {
        // @ts-ignore
        paths: paths,
        fallback: false,
    }
}
