import React, { useEffect } from 'react'
import {
    BannerGridImage,
    GridModule,
    StyledBlockForGrid,
} from '../../styles/global'
import BannerContent from '../../_components/UI/BannerContent'
import Blurb from '../../_components/UI/Blurb'
import Block from '../../_components/UI/Block'
import { getHomepage, getPropertiesViaBucket } from '../../_lib/api'
import ImageGridSlider from '../../_components/UI/Swiper'
import styled from 'styled-components'
import { rem } from 'polished'
import GuideItem from '../../_components/GuideItem'
import ExperienceItem from '../../_components/ExperienceItem'
import NewsItem from '../../_components/NewsItem'
import exp from 'constants'

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
const Index = ({ data, properties, setHeaderData, setNavTheme }: any) => {
    const { blurb, title, guides, experiences, coverImage, news } = data

    useEffect(() => {
        setNavTheme('light')
        setHeaderData({
            bucket: 'Puerto Rico',
        })
    }, [])

    return (
        <>
            <BannerGridImage
                imageObj={coverImage}
                border={false}
                borderRadius={false}
                fullHeight
                sizes={'100vw'}
            >
                <BannerContent headerText={title} />
            </BannerGridImage>
            <Blurb text={blurb} />

            <Block
                title="OUR STAYS"
                fullWidth
                showOverflow
                noPaddingBottom
                content={
                    <StaysSwiperWrap>
                        {/*@ts-ignore*/}
                        <ImageGridSlider
                            slug={'puertorico'}
                            items={properties}
                            isProperties
                            spaceBetween={0}
                        />
                    </StaysSwiperWrap>
                }
            />

            {guides && guides.length && (
                <StyledBlockForGrid
                    title="GUIDEBOOKS"
                    fullWidth
                    noPaddingBottom
                    content={
                        <GridModule columns={3} sideScrollOnMobile>
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
                    content={
                        <GridModule columns={3} sideScrollOnMobile>
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
    const data = await getHomepage('puertorico')
    const properties = await getPropertiesViaBucket('puertorico')
    return {
        props: {
            data,
            properties,
        },
    }
}
