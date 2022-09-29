import React from 'react'
import { BannerGridImage } from '../../styles/global'
import BannerContent from '../../_components/UI/BannerContent'
import Blurb from '../../_components/UI/Blurb'
import Block from "../../_components/UI/Block";

const Index = ({ bannerImage, bannerHeader, blurb }: any) => {
    return (
        <>
            <BannerGridImage
                imageObj={bannerImage}
                border={false}
                borderRadius={false}
                fullHeight
                //ratio={0.5}
            >
                <BannerContent headerText={bannerHeader} />
            </BannerGridImage>
            <Blurb text={blurb} />
            <Block title="OUR STAYS" content={
                <div>SOmething</div>
            } />
        </>
    )
}

export default Index
