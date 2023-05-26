import React, { useEffect, useState } from 'react'
import {
    BannerGridImage,
    GridModule,
    StyledBlockForGrid,
} from '../../styles/global'
import BannerContent from '../../_components/UI/BannerContent'
import Blurb from '../../_components/UI/Blurb'
import Block from '../../_components/UI/Block'
import { getHomepage, getStaysForHomepage } from '../../_lib/api'
import styled from 'styled-components'
import { rem } from 'polished'
import GuideItem from '../../_components/GuideItem'
import ExperienceItem from '../../_components/ExperienceItem'
import NewsItem from '../../_components/NewsItem'
import safeJsonStringify from 'safe-json-stringify'
import dynamic from 'next/dynamic'

const ImageGridSlider = dynamic(() => import('../../_components/UI/Swiper'))

const StaysSwiperWrap = styled.div`
    overflow: hidden;
    width: 100%;
    margin-top: ${rem(20)};

    .swiper {
        overflow: visible;
        margin-left: ${rem(20)};
        position: relative;
        margin-right: ${rem(20)};
    }

    .swiper-slide {
        max-width: 30%;
        min-width: ${rem(370)};
    }

    .navigation-wrap {
        top: ${rem(-46)};
    }
`
const Index = ({ data, setNavTheme, setHeaderData }: any) => {
    const { blurb, title, guides, experiences, coverImage, mobileCoverImage, news } = data
    const [stays, setStays] = useState(null)

    useEffect(() => {
        setNavTheme('light')

        const data = {
            bucket: 'Puerto Rico',
            simpleNav: false,
            property: undefined,
        }
        setHeaderData(data)

        const getStays = async () => {
            const rawData = await getStaysForHomepage('puertorico')
            const stringData = safeJsonStringify(rawData)
            const data = JSON.parse(stringData)
            const { stays } = data
            setStays(stays)
        }
        getStays()
    }, [])
    return (
        <>
            <BannerGridImage
                imageObj={coverImage}
                mobileImageObj={mobileCoverImage}
                border={false}
                borderRadius={false}
                fullHeight
                sizes={'100vw'}
            >
                <BannerContent headerText={title} />
            </BannerGridImage>
            <Blurb text={blurb} />

            {stays && (
                <Block
                    title="OUR STAYS"
                    fullWidth
                    showOverflow
                    noPaddingBottom
                    content={
                        <StaysSwiperWrap>
                            <ImageGridSlider
                                slug={'puertorico'}
                                items={stays.map((x) => x.fields)}
                                isProperties
                                spaceBetween={0}
                            />
                        </StaysSwiperWrap>
                    }
                />
            )}

            {guides && guides.length && (
                <StyledBlockForGrid
                    title="GUIDEBOOKS"
                    fullWidth
                    noPaddingBottom
                    link="/guidebooks/puertorico"
                    content={
                        <GridModule columns={guides.length} sideScrollOnMobile>
                            {guides &&
                                guides.length &&
                                guides.map((guide: any) => (
                                    <GuideItem data={guide.fields} />
                                ))}
                        </GridModule>
                    }
                />
            )}

            {experiences && experiences.length && (
                <StyledBlockForGrid
                    title="EXPERIENCES"
                    fullWidth
                    noPaddingBottom
                    link="/experiences/puertorico"
                    content={
                        <GridModule
                            columns={experiences.length}
                            sideScrollOnMobile
                        >
                            {experiences &&
                                experiences.length &&
                                experiences.map((exp: any) => (
                                    <ExperienceItem data={exp.fields} />
                                ))}
                        </GridModule>
                    }
                />
            )}

            {news && news.length && (
                <StyledBlockForGrid
                    title="IN THE NEWS"
                    fullWidth
                    noPaddingBottom
                    link="/news"
                    content={
                        <GridModule columns={4} sideScrollOnMobile>
                            {news.length &&
                                news.map((x: any, i: number) => (
                                    <NewsItem
                                        key={x.slug + i}
                                        newsObj={x.fields}
                                    />
                                ))}
                        </GridModule>
                    }
                />
            )}
        </>
    )
}

export default Index

export async function getStaticProps() {
    const rawData = await getHomepage('puertorico')
    const stringData = safeJsonStringify(rawData)
    const data = JSON.parse(stringData)

    return {
        props: {
            data,
        },
    }
}
