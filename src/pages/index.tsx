import { getLandingpage } from '../_lib/api'
import { BannerGridImage } from '../styles/global'
import BannerContent from '../_components/UI/BannerContent'
import React, { useEffect, useState } from 'react'
import { throttle } from '../_utils/Throttle'
import Block from '../_components/UI/Block'
import Link from 'next/link'
import {
    Circle,
    FlexContainer,
    StyledBlurb,
    StyledButton,
    StyledHeader,
} from '../styles/landing/styles'

const Home = ({ landing, setNavTheme, setHeaderData }: any) => {
    const [prData, setPRData] = useState<{
        temperature: string
        time: string
    }>()
    const [ncData, setNCData] = useState<{
        temperature: string
        time: string
    }>()

    useEffect(() => {
        setNavTheme('dark')
        setHeaderData({
            simpleNav: true,
        })
    }, [])

    useEffect(() => {
        const x: HTMLElement | null = document.querySelector('#circle')
        const inner: HTMLElement | null = document.querySelector('#inner')

        const onScroll = () => {
            const scrollTop = window.scrollY

            const style = {
                width: `calc(98vw + ${scrollTop * 1.8}px)`,
                height: `calc(98vw + ${scrollTop * 1.8}px)`,
                transform: `translate3d(0,-${scrollTop * 1.8}px, 0)`,
            }

            if (x && inner) {
                Object.assign(x.style, style)
                Object.assign(inner.style, { opacity: 1 - scrollTop * 0.003 })
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
    return (
        <>
            <BannerGridImage
                imageObj={landing.coverImage}
                border={false}
                borderRadius={false}
                fullHeight
            />
            <FlexContainer>
                <BannerContent headerText={landing.title} />
                <Circle id="circle">
                    <div />
                    <div id="inner" />
                </Circle>
            </FlexContainer>
            <Link href={'/puertorico'} passHref>
                <a>
                    <Block
                        noPaddingBottom
                        fullWidth
                        title={`${prData?.temperature}\u00b0`}
                        content={
                            <StyledHeader responsive size={1} uppercase>
                                Puerto Rico
                            </StyledHeader>
                        }
                    />
                </a>
            </Link>
            <Link href={'/northcarolina'} passHref>
                <a>
                    <Block
                        noPaddingBottom
                        fullWidth
                        title={`${ncData?.temperature}\u00b0`}
                        content={
                            <StyledHeader size={1} uppercase>
                                North Carolina
                            </StyledHeader>
                        }
                    />
                </a>
            </Link>
            <StyledBlurb text={landing.blurb} eyebrow="DW GROUP" borderTop>
                <StyledButton href="/about">READ MORE</StyledButton>
            </StyledBlurb>
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
