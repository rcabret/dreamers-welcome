import React, { useEffect } from 'react'
import { BannerGridImage } from '../../styles/global'
import BannerContent from '../../_components/UI/BannerContent'
import Blurb from '../../_components/UI/Blurb'
import Block from '../../_components/UI/Block'
import { getHomepage, getPropertiesViaBucket } from '../../_lib/api'
import ImageSlider from '../../_components/UI/Swiper'
import styled from 'styled-components'
import { rem } from 'polished'

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
const Index = ({ data, stays, setHeaderData }: any) => {
    const { blurb, title, guides, experiences, coverImage } = data

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
                            items={stays}
                            slidesPerView={2}
                            isProperties
                            spaceBetween={0}
                        />
                    </StaysSwiperWrap>
                }
            />
        </>
    )
}

export default Index

export async function getStaticProps() {
    const data = await getHomepage('puertorico')
    const stays = await getPropertiesViaBucket('puertorico')

    return {
        props: {
            data,
            stays,
        },
    }
}
