import React from 'react'
import { BannerGridImage, GridModule, Stat } from '../../styles/global'
import BannerContent from '../../_components/UI/BannerContent'
import { getExperience } from '../../_lib/api'
import Block from '../../_components/UI/Block'
import BodyText from '../../_components/Typography/BodyText'
import { ConceptTextContainer } from '../../styles/about/styles'
import Blurb from '../../_components/UI/Blurb'

const Experience = ({ about }: any) => {
    const {
        bannerImage,
        bannerHeader,
        blurb,
        info,
        details,
        bookNowLink,
        thingsToKnow,
    } = about

    return (
        <>
            <BannerGridImage
                imageObj={bannerImage}
                border={false}
                borderRadius={false}
                fullHeight
            >
                <BannerContent
                    headerText={bannerHeader}
                    bookNowLink={bookNowLink}
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
            <Block
                title="DETAILS"
                content={
                    <GridModule columns={4} sideScrollOnMobile dontBreak>
                        {details &&
                            details.map((stat: any, i: number) => {
                                const { title, text } = stat.fields
                                return (
                                    <div key={~~(Math.random() * i)}>
                                        <Stat>{text}</Stat>
                                        <BodyText size="md">{title}</BodyText>
                                    </div>
                                )
                            })}
                    </GridModule>
                }
            />
            <Block
                title="THINGS TO KNOW"
                content={
                    <GridModule columns={4} sideScrollOnMobile dontBreak>
                        {thingsToKnow &&
                            thingsToKnow.map((stat: any, i: number) => {
                                const { title, text } = stat.fields
                                return (
                                    <div key={~~(Math.random() * i)}>
                                        <Stat>{text}</Stat>
                                        <BodyText size="md">{title}</BodyText>
                                    </div>
                                )
                            })}
                    </GridModule>
                }
            />
        </>
    )
}

export default Experience

export async function getStaticProps(context: { params: { slug: string } }) {
    const experience = await getExperience(context.params.slug)
    return {
        props: {
            experience,
        },
    }
}

export async function getStaticPaths(context: { params: { slug: string } }) {
    const experience = await getExperience(context.params.slug)
    const paths: any = []
    experience.forEach((x: { slug: string }) => {
        paths.push({ params: { slug: x.slug } })
    })
    return {
        // @ts-ignore
        paths: paths,
        fallback: false,
    }
}
