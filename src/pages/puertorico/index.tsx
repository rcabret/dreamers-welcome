import React from 'react'
import { BannerGridImage } from '../../styles/global'
import BannerContent from '../../_components/UI/BannerContent'
import Blurb from '../../_components/UI/Blurb'
import Block from '../../_components/UI/Block'
import { getHomepage } from '../../_lib/api'

const Index = ({ data, setHeaderData }: any) => {
    const { blurb, title, guides, experiences, coverImage } = data
    setHeaderData({
        bucket: 'Puerto Rico',
    });

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
            <Block title="OUR STAYS" content={<div>Something</div>} />
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
