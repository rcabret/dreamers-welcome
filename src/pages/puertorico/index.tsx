import React, { useEffect } from 'react'
import {
    BannerGridImage,
    GridAdjustWrapper,
    GridModule,
} from '../../styles/global'
import BannerContent from '../../_components/UI/BannerContent'
import Blurb from '../../_components/UI/Blurb'
import Block from '../../_components/UI/Block'
import { getHomepage } from '../../_lib/api'
import ImageSlider from '../../_components/UI/Swiper'
import styled from 'styled-components'
import { rem } from 'polished'
import Guide from '../guide/[slug]'
import GuideItem from '../../_components/GuideItem'

const StaysSwiperWrap = styled.div`
    overflow: hidden;
    width: 100%;
    margin-top: ${rem('20px')};

    .swiper {
        overflow: visible;
        margin-left: ${rem(20)};
        width: 80%;
        position: relative;
    }
`
const Index = ({ data, setHeaderData }: any) => {
    const { blurb, title, guides, experiences, coverImage, stays } = data

    console.log('stays', stays)
    useEffect(() => {
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
                content={
                    <StaysSwiperWrap>
                        {/*@ts-ignore*/}
                        <ImageSlider
                            slug={'puertorico'}
                            items={stays.map((x: any) => x.fields)}
                            slidesPerView={2}
                            isProperties
                            spaceBetween={0}
                        />
                    </StaysSwiperWrap>
                }
            />
            <Block
                title="GUIDES"
                fullWidth
                content={
                    <GridAdjustWrapper>
                        <GridModule columns={3} sideScrollOnMobile>
                            {guides &&
                                guides.length &&
                                guides.map((guide: any) => (
                                    <GuideItem data={guide.fields} />
                                ))}
                        </GridModule>
                    </GridAdjustWrapper>
                }
            />
        </>
    )
}

export default Index

export async function getStaticProps() {
    const data = await getHomepage('puertorico')

    return {
        props: {
            data,
        },
    }
}
