import React, { useEffect } from 'react'
import {
    BannerGridImage,
    GridModule,
    StyledBlockForGrid,
} from '../../styles/global'
import BannerContent from '../../_components/UI/BannerContent'
import { getGuide, getGuides } from '../../_lib/api'
import Block from '../../_components/UI/Block'
import { ConceptTextContainer } from '../../styles/about/styles'
import GuideItem from '../../_components/GuideItem'
import { bucketToPath } from '../../_utils/Parsers'
import Blurb from '../../_components/UI/Blurb'
import MarkdownModule from '../../_components/Typography/MarkdownModule'

const GuideBook = ({ guide, setNavTheme, setHeaderData }: any) => {
    const {
        bannerImage,
        mobileBannerImage,
        blurb,
        title,
        bucket,
        description,
        otherGuides,
    } = guide

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
                mobileImageObj={mobileBannerImage}
                border={false}
                borderRadius={false}
                fullHeight
            >
                <BannerContent headerText={title} />
            </BannerGridImage>
            {blurb && <Blurb text={blurb} />}
            <Block
                title="INFO"
                content={
                    <ConceptTextContainer>
                        <MarkdownModule data={description} />
                    </ConceptTextContainer>
                }
            />
            {otherGuides && otherGuides.length && (
                <StyledBlockForGrid
                    title="MORE GUIDEBOOKS"
                    fullWidth
                    noPaddingBottom
                    link={`/guidebooks/${bucketToPath(bucket[0])}`}
                    content={
                        <GridModule
                            columns={otherGuides.length}
                            sideScrollOnMobile
                        >
                            {otherGuides &&
                                otherGuides.length &&
                                otherGuides.map((guide: any) => (
                                    <GuideItem data={guide.fields} />
                                ))}
                        </GridModule>
                    }
                />
            )}
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
