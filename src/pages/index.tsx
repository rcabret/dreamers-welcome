import { getLandingpage,getHomepage,getStaysForHomepage } from '../_lib/api'
import dynamic from 'next/dynamic'
const BannerGridImage = dynamic(() =>
  import('../styles/global').then((module) => module.BannerGridImage)
)
const BannerContent = dynamic(() =>
  import('../_components/UI/BannerContent').then((module) => module.default)
)
const Block = dynamic(() =>
  import('../_components/UI/Block').then((module) => module.default)
)
import React, { useContext, useEffect, useState } from 'react'
import { throttle } from '../_utils/Throttle'
import Link from 'next/link'
import Head from 'next/head'
const Circle = dynamic(() =>
  import('../styles/landing/styles').then((module) => module.Circle)
)
const FlexContainer = dynamic(() =>
  import('../styles/landing/styles').then((module) => module.FlexContainer)
)
const StyledBlurb = dynamic(() => 
  import('../styles/landing/styles').then((module) => module.StyledBlurb)
)
const StyledButton = dynamic(() =>
  import('../styles/landing/styles').then((module) => module.StyledButton)
)
const StyledHeader = dynamic(() =>
  import('../styles/landing/styles').then((module) => module.StyledHeader)
)
const BottomAnchor = dynamic(() =>
  import('../styles/landing/styles').then((module) => module.BottomAnchor)
)
const ContentWrap = dynamic(() =>
  import('../styles/landing/styles').then((module) => module.ContentWrap)
)
const Header = dynamic(() =>
  import('../_components/Typography/Header').then((module) => module.default)
)
import Script from 'next/script'
import Blurb from '../_components/UI/Blurb'
import { sendConversionEvent } from './api/fbConversionApi'
import { viewportContext } from '../_utils/ViewportProvider'
import safeJsonStringify from 'safe-json-stringify'
import styled from 'styled-components'
import { rem } from 'polished'
import { GridModule,StyledBlockForGrid } from '../styles/global'
import PropertyGridItem from '../_components/PropertyGridItem'
import NewsItem from '../_components/NewsItem'
import ExperienceItem from '../_components/ExperienceItem'
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
const Home = ({data, landing, setNavTheme, setHeaderData, seoData }: any) => {
  const {
    coverImage,
    mobileCoverImage,
    blurb,
    guides,
    experiences,
    news,
    title
  } = data
  
  const [prData, setPRData] = useState<{
    temperature: string
    time: string
  }>()
  const [ncData, setNCData] = useState<{
    temperature: string
    time: string
  }>()

  const breakpoint = useContext(viewportContext)
  const [stays, setStays] = useState(null)
  useEffect(() => {
    setNavTheme('light')
    const data = {
      bucket: 'Puerto Rico',
      simpleNav: false,
      property: '',
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

  useEffect(() => {
    const x: HTMLElement | null = document.querySelector('#circle')
    const inner: HTMLElement | null = document.querySelector('#inner')
    const innerMain: HTMLElement | null = document.querySelector('#innerMain')

    const onScroll = () => {
      const scrollTop = window.scrollY

      const style = {
        width: `calc(98vw + ${scrollTop * 1.8}px)`,
        /*
                height: `calc(98vw + ${scrollTop * 1.8}px)`,
*/
        /*  transform: `translate3d(0,-${scrollTop * 1.2}px, 0)`,*/
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
      <Head>
        {seoData?.metaTitle &&
          <title>{seoData?.metaTitle}</title>
        }
        {seoData?.metaDescription &&
          <meta name="description" content={seoData?.metaDescription} />
        }
        {seoData?.canonicalUrl &&
          <link rel="canonical" href={seoData?.canonicalUrl} />
        }
      </Head>
   
     <BannerGridImage
        imageObj={coverImage}
        mobileImageObj={mobileCoverImage}
        border={false}
        borderRadius={false}
        fullHeight
      />
        <BannerContent headerText={title} showOpacity={false} />
    
       <Blurb text={blurb} />
       {stays && (
        <Block
         className="stays_outer"
          title="OUR STAYS"
          fullWidth
          
          noPaddingBottom
          link="/stays/puertorico"
          content={
            <StaysSwiperWrap className="stays_grid puerto_grids">
              <GridModule columns={3}>
                {stays &&
                  stays.length &&
                  stays
                    .slice(0, 3)
                    .map((p: any) => (
                      <PropertyGridItem propertyObj={p.fields} />
                    ))}
              </GridModule>
            </StaysSwiperWrap>
          }
        />
      )}
        <StyledBlurb text={landing.blurb} eyebrow="DW GROUP" borderTop>
          <StyledButton href="/about">READ MORE</StyledButton>
        </StyledBlurb>
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
                guides.map((guide: any) => <GuideItem data={guide.fields} />)}
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
            <GridModule columns={experiences.length} sideScrollOnMobile>
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
                      <GridModule columns={news.length} sideScrollOnMobile>
                        {news.length &&
                          news.map((x: any, i: number) => (
                            <NewsItem key={x.slug + i} newsObj={x?.fields} />
                          ))}
                      </GridModule>
                    }
                  />
                )}
      {/* <ContentWrap id="view">
        <div id="innerMain" />
        <Link href={'/puertorico'} passHref prefetch={false}>
          <a>
            <Block
              noPaddingBottom
              fullWidth
              // title={`${prData?.temperature}\u00b0`}
              title={prData?.temperature && `${prData.temperature}°`}
              content={
                <StyledHeader size={1} uppercase>
                  Puerto Rico
                </StyledHeader>
              }
            />
          </a>
        </Link>

        <StyledBlurb text={landing.blurb} eyebrow="DW GROUP" borderTop>
          <StyledButton href="/about">READ MORE</StyledButton>
        </StyledBlurb>
      </ContentWrap> */}
    </>
  )
}

export default Home

export async function getStaticProps() {
  const landing = await getLandingpage()
  const rawData = await getHomepage('puertorico')
  
   const stringData = safeJsonStringify(rawData)
    const data = JSON.parse(stringData)
    const seoData = data?.seoMetadata?.fields
  return {
    props: {
      landing,
      data,
      seoData: landing?.seoMetadata?.fields ?? null,
    },
  }
}