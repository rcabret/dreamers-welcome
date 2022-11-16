import React, { useEffect } from 'react'
import { BannerGridImage, GridModule, Stat } from '../../styles/global'
import BannerContent from '../../_components/UI/BannerContent'
import { getGuide, getGuides } from '../../_lib/api'
import Block from '../../_components/UI/Block'
import BodyText from '../../_components/Typography/BodyText'
import { ConceptTextContainer } from '../../styles/about/styles'

const GuideBook = ({ guide, setNavTheme, setHeaderData }: any) => {
    const { bannerImage, title, bucket, description } = guide

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
                <BannerContent headerText={title} />
            </BannerGridImage>
            <Block
                title="INFO"
                content={
                    <ConceptTextContainer>
                        <BodyText size="xlg">{description}</BodyText>
                    </ConceptTextContainer>
                }
            />
        </>
    )
}

export default GuideBook

export async function getStaticProps(context: { params: { slug: string } }) {
    const guide = await getGuide(context.params.slug)
    return {
        props: {
            guide,
        },
    }
}

export async function getStaticPaths() {
    const guides = await getGuides()
    const paths: any = []
    guides.forEach((x: { fields: { slug: string } }) => {
        const { slug } = x.fields
        paths.push({ params: { slug: slug } })
    })
    return {
        // @ts-ignore
        paths: paths,
        fallback: false,
    }
}
