import { getHomepage, getLandingpage, getProperty } from '../_lib/api'
import { BannerGridImage } from '../styles/global'
import BannerContent from '../_components/UI/BannerContent'
import React, { useEffect } from 'react'
import styled from 'styled-components'

interface HomepageProps {
    homepageResponse: any
}

const Circle = styled.div`
    width: 98vw;
    height: 98vw;
    border-radius: 50%;
    background: white;
    position: absolute;
`

const FlexContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: flex-start;
    justify-content: center;
    padding-top: 120px;
`
const Home = ({ landing, setNavTheme }: any) => {
    useEffect(() => {
        setNavTheme('dark')
    }, [])
    return (
        <>
            <BannerGridImage
                imageObj={landing.coverImage}
                border={false}
                borderRadius={false}
                fullHeight
            >
                <FlexContainer>
                    <BannerContent headerText={landing.title} />
                    <Circle />
                </FlexContainer>
            </BannerGridImage>
        </>
    )
}

export default Home

export async function getStaticProps() {
    const landing = await getLandingpage()

    return {
        props: {
            landing,
        },
    }
}
