import { getLandingpage } from '../_lib/api'
import dynamic from 'next/dynamic';
const BannerGridImage = dynamic(() => import('../styles/global').then((module) => module.BannerGridImage));
const BannerContent = dynamic(() => import('../_components/UI/BannerContent').then((module) => module.default));
const Block = dynamic(() => import('../_components/UI/Block').then((module) => module.default));
import React, { useContext, useEffect, useState } from 'react'
import { throttle } from '../_utils/Throttle'
import Link from 'next/link'
const Circle = dynamic(() => import('../styles/landing/styles').then((module) => module.Circle));
const FlexContainer = dynamic(() => import('../styles/landing/styles').then((module) => module.FlexContainer));
const StyledBlurb = dynamic(() => import('../styles/landing/styles').then((module) => module.StyledBlurb));
const StyledButton = dynamic(() => import('../styles/landing/styles').then((module) => module.StyledButton));
const StyledHeader = dynamic(() => import('../styles/landing/styles').then((module) => module.StyledHeader));
const BottomAnchor = dynamic(() => import('../styles/landing/styles').then((module) => module.BottomAnchor));
const ContentWrap = dynamic(() => import('../styles/landing/styles').then((module) => module.ContentWrap));
const Header = dynamic(() => import('../_components/Typography/Header').then((module) => module.default));

import { viewportContext } from '../_utils/ViewportProvider'

const Home = ({ landing, setNavTheme, setHeaderData }: any) => {
    const [prData, setPRData] = useState<{
        temperature: string
        time: string
    }>()
    const [ncData, setNCData] = useState<{
        temperature: string
        time: string
    }>()

    const breakpoint = useContext(viewportContext)

    useEffect(() => {
        setNavTheme('dark')
        setHeaderData({
            simpleNav: false,
        })
    }, [])

    useEffect(() => {
        const x: HTMLElement | null = document.querySelector('#circle')
        const inner: HTMLElement | null = document.querySelector('#inner')
        const innerMain: HTMLElement | null =
            document.querySelector('#innerMain')

        const onScroll = () => {
            const scrollTop = window.scrollY
            const style = {
                width: `calc(98vw + ${scrollTop * 1.8}px)`,               
            }
            if (x && inner && innerMain) {
                Object.assign(x.style, style)
                Object.assign(inner.style, { opacity: 1 - scrollTop * 0.003 })
                Object.assign(innerMain.style, {
                    opacity: 1 - scrollTop * 0.003,
                })
            }
        }
        
        window.addEventListener('scroll', () => {
            throttle(onScroll)()
        })
        return () => {
            window.removeEventListener('scroll', () => {
                throttle(onScroll)()
            })
        }
    }, [])

    const getWeatherApiUrl = (lat: number, long: number) =>
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&temperature_unit=fahrenheit`

    useEffect(() => {
        const fetchData = async () => {
            await fetch(getWeatherApiUrl(18.2078212, -67.7099374))
                .then((x) => x.json())
                .then((res) => {
                    setPRData(res.current_weather)
                })
            await fetch(getWeatherApiUrl(35.3857677, -81.3990799))
                .then((x) => x.json())
                .then((res) => {
                    setNCData(res.current_weather)
                })
        }
        fetchData()
    }, [])

    const scrollToBottom = () => {
        const anchor = document.getElementById('view')
        if (anchor) {
            setTimeout(function () {
                window.scrollTo({
                    behavior: 'smooth',
                    top: anchor.offsetTop - 120,
                })
            }, 100)
        }
    }
    return (
        <>
            <BannerGridImage imageObj={landing.coverImage} border={false} borderRadius={false}  fullHeight />
            <FlexContainer>
                <BottomAnchor onClick={() => scrollToBottom()}>
                    <Header size={3}>
                        CHOOSE <br /> YOUR DESTINATION
                    </Header>
                    <button>
                        <svg viewBox="0 0 60 40"> <polyline points="0 10, 30 38, 60 10" /> </svg>
                    </button>
                </BottomAnchor>
                <BannerContent headerText={landing.title} showOpacity={false} />
                <Circle id="circle">
                    <div />
                    <div id="inner" />
                </Circle>
            </FlexContainer>
            <ContentWrap id="view">
                <div id="innerMain" />
                <Link href={'/puertorico'} passHref prefetch={false}>
                    <a>
                        <Block
                            noPaddingBottom
                            fullWidth
                            title={`${prData?.temperature}\u00b0`}
                            content={
                                <StyledHeader size={1} uppercase>
                                    Puerto Rico
                                </StyledHeader>
                            }
                        />
                    </a>
                </Link>
                <Link href={'/northcarolina'} passHref prefetch={false}>
                    <a>
                        <Block
                            noPaddingBottom
                            fullWidth
                            title={`${ncData?.temperature}\u00b0`}
                            content={
                                <StyledHeader size={1} uppercase> North Carolina </StyledHeader>
                            }
                        />
                    </a>
                </Link>
                <StyledBlurb text={landing.blurb} eyebrow="DW GROUP" borderTop>
                    <StyledButton href="/about">READ MORE</StyledButton>
                </StyledBlurb>
            </ContentWrap>
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
