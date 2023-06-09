import {
    getAllPropertiesForPaths,
    getProperty,
    getRestOfPropertyData,
} from '../_lib/api'
import Blurb from '../_components/UI/Blurb'
import Suite from '../_components/Suite'
import BannerContent from '../_components/UI/BannerContent'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
    BannerGridImage,
    BlockListWrap,
    GridModule,
    SeeMore,
    StyledBlockForGrid,
} from '../styles/global'
import { ConceptTextContainer } from '../styles/about/styles'
import BodyText from '../_components/Typography/BodyText'
import Block from '../_components/UI/Block'
import Header from '../_components/Typography/Header'
import MarkdownModule from '../_components/Typography/MarkdownModule'
import dynamic from 'next/dynamic'
import NewsItem from '../_components/NewsItem'
import Map from '../_components/Map'
const ImageSliderWrapper = dynamic(() => import('../_components/UI/Swiper/styles').then((module) => module.ImageSliderWrapper));
import PropertyGridItem from '../_components/PropertyGridItem'
import LightBox from '../_components/LightBox'
import Link from 'next/link'
import { StyledButton } from '../styles/landing/styles'
import { bucketToPath } from '../_utils/Parsers'
import safeJsonStringify from 'safe-json-stringify'
import { viewportContext } from '../_utils/ViewportProvider'
import Head from 'next/head'

const CollapsableList = dynamic(
    () => import('../_components/UI/CollapsableList')
)

const Highlight = dynamic(() => import('../_components/Suite/Highlight'))
// @ts-ignore
const Carousel = dynamic(() => import('../_components/UI/Swiper/Carousel'))

const SubNavigation = dynamic(
    () => import('../_components/Navigation/SubNavigation')
)

interface PropertyProps {
    propertyResponse: any
    setHeaderData: any
    setNavTheme: any
    otherStays: any
}

const Property = ({
    propertyResponse,
    setHeaderData,
    setNavTheme,
}: PropertyProps) => {
    const {
        address,
        bannerImage,
        mobileBannerImage,
        bannerHeader,
        bannerDescriptionList,
        bucket,
        bookNowLink,
        bottomBlurb,
        blurb,
        concept,
        features,
        location,
        mapUrl,
        propertyType,
        propertyName,
        rooms,
        slug,
        suites,
        thingsToKnow,
        tileImage,
    } = propertyResponse

    const router = useRouter()

    const pType = propertyType[0]
    const showSubNav = pType === 'Suites' || pType === 'Hotel'

    const [activeView, setView] = useState(suites[0])
    const [activeSlug, setSlug] = useState()
    const [lightbox, toggleLightbox] = useState<boolean>(false)
    const [extraData, setExtraData] = useState<{
        otherStays: any
        carouselImages: any
        faq: any
        news: any
    } | null>(null)

    const breakpoint = useContext(viewportContext)

    useEffect(() => {
        setNavTheme('light')
    }, [])

    useEffect(() => {
        setHeaderData({
            bucket: bucket[0],
            property: propertyName,
        })

        setExtraData(null)
        const getExtraData = async () => {
            const rawData = await getRestOfPropertyData(slug)
            const stringData = safeJsonStringify(rawData)
            const data = JSON.parse(stringData)
            setExtraData(data)
        }
        getExtraData()
    }, [router.query])
    const getSubNavigationData = () => {
        if (pType === 'Suites') {
            return suites.map((x: { fields: any }) => {
                return { name: x.fields.name, slug: `${x.fields.slug}` }
            })
        } else if (pType === 'Hotel') {
            return [
                { name: 'Suites', slug: 'suites' },
                { name: 'Rooms', slug: 'rooms' },
            ]
        }
    }

    const getHotelView = (a = 'suites') => {
        return a === 'suites' ? suites : rooms
    }

    useEffect(() => {
        const a = router.query.slug as string[]
        let viewToShow: string | undefined
        if (Array.isArray(a) && a.length > 1) {
            viewToShow = a.pop()
        } else {
            // If type is Hotel show Suites as default route
            viewToShow = pType === 'Hotel' ? 'suites' : suites[0].fields.slug
        }

        // set slug
        // @ts-ignore
        setSlug(viewToShow)

        let finalView

        if (pType === 'Hotel') {
            finalView = getHotelView(viewToShow)
        } else {
            finalView =
                suites &&
                suites.length &&
                suites.find((x: any) => x.fields.slug === viewToShow)
        }

        setView(finalView)
    }, [router.query])

    // @ts-ignore
    return (
        <>
            <Head>
                <title>{propertyName} by DW</title>
                <meta property="og:title" content={`${propertyName} by DW`} />
                <meta property="og:description" content={`${propertyType[0]} in ${location}, ${bucket[0]}`} />
                <meta property="og:image" content={`https:${tileImage.fields.file.url}?w=700`} />
            </Head>
            <BannerGridImage imageObj={bannerImage} mobileImageObj={mobileBannerImage} border={false} borderRadius={false} fullHeight>
                <BannerContent
                    headerText={bannerHeader}
                    headerSubheader={`${
                        propertyType[0] === 'Suites'
                            ? 'Apartments+'
                            : propertyType[0]
                    } in ${location}`}
                    description={bannerDescriptionList}
                    bookNowLink={bookNowLink}
                />
            </BannerGridImage>
            {blurb && blurb.length && <Blurb text={blurb} />}
            {concept && (
                <Block
                    title="CONCEPT"
                    content={
                        <ConceptTextContainer> <BodyText size="xlg">{concept}</BodyText></ConceptTextContainer>
                    }
                />
            )}
            {showSubNav && (
                <SubNavigation activeSlug={activeSlug} queryArray={router.query.slug || []}  data={getSubNavigationData()}/>
            )}
            {/* Suites view for 'Suites' and House*/}
            <div id="anchor_view">
                {pType !== 'Hotel' ? (
                    // Suites and Houses
                    <Suite propertySlug={activeSlug || ''} data={activeView} hideFirstSeparator={showSubNav && suites.length > 1}/>
                ) : (
                    // Hotel
                    activeView &&
                    Array.isArray(activeView) &&
                    activeView.map((x, i) => {
                        const { name, blurb, images } = x.fields
                        return (
                            <Highlight key={`${name}-${Math.random() * i}`} title={name} blurb={blurb} images={images}  slug={activeSlug || ''} hideSeparator={i === 0} />
                        )
                    })
                )}
            </div>

            {extraData && extraData.carouselImages && (
                <Block
                    noPaddingBottom
                    fullWidth
                    content={
                        <ImageSliderWrapper> <Carousel toggle={toggleLightbox} items={extraData.carouselImages} /> </ImageSliderWrapper>
                    }
                />
            )}

            {features && (
                <Block
                    noPaddingBottom
                    title="FEATURES"
                    content={
                        breakpoint !== 'mobile' ? (
                            <GridModule columns={features.length} sideScrollOnMobile={false} >
                                {features &&
                                    features.map((feature: any) => (
                                        <BlockListWrap key={feature.fields.title}>
                                            <Header size={4}> {feature.fields.title} </Header>
                                            <MarkdownModule data={feature.fields.text} />
                                        </BlockListWrap>
                                    ))}
                            </GridModule>
                        ) : (
                            <CollapsableList data={features} />
                        )
                    }
                />
            )}

            {thingsToKnow && (
                <Block
                    title="THINGS TO KNOW"
                    noPaddingBottom
                    content={
                        breakpoint !== 'mobile' ? (
                            <GridModule
                                columns={thingsToKnow.length}
                                sideScrollOnMobile={false}
                            >
                                {thingsToKnow &&
                                    thingsToKnow.map((thing: any) => (
                                        <BlockListWrap key={thing.fields.title}>
                                            <Header size={4}> {thing.fields.title} </Header>
                                            <MarkdownModule data={thing.fields.text} />
                                        </BlockListWrap>
                                    ))}
                            </GridModule>
                        ) : (
                            <CollapsableList data={thingsToKnow} />
                        )
                    }
                />
            )}

            {bottomBlurb && bottomBlurb.length && (
                <Blurb text={bottomBlurb} borderTop>
                    <StyledButton href={`/experiences/${bucketToPath(bucket[0])}`} >  EXPERIENCES </StyledButton>
                </Blurb>
            )}

            {mapUrl && <Map link={mapUrl} />}

            {address && (
                <Block title="INFO" noPaddingBottom content={<MarkdownModule data={address} />} />
            )}

            {extraData && extraData.faq && (
                <Block
                    title="FAQs"
                    noPaddingBottom
                    content={
                        <>
                            <CollapsableList
                                data={extraData.faq.fields.list.slice(0, 5)}
                            />
                            {extraData.faq.fields.list.length > 5 && (
                                <SeeMore>
                                    <Link href={`/faq/${extraData.faq.fields.slug}`} >  SEE MORE  </Link>
                                </SeeMore>
                            )}
                        </>
                    }
                />
            )}
            {extraData && extraData.news && (
                <StyledBlockForGrid
                    title="IN THE NEWS"
                    fullWidth
                    noPaddingBottom
                    content={
                        <GridModule columns={4} sideScrollOnMobile>
                            {extraData.news.length &&
                                extraData.news.map((x: any, i: number) => (
                                    <NewsItem key={x.slug + i} newsObj={x.fields} />
                                ))}
                        </GridModule>
                    }
                />
            )}
            {extraData && extraData.otherStays && extraData.otherStays.length && (
                <StyledBlockForGrid
                    title="OTHER STAYS"
                    fullWidth
                    noPaddingBottom
                    content={
                        <GridModule columns={4} sideScrollOnMobile>
                            {extraData.otherStays.length &&
                                extraData.otherStays.map(
                                    (x: any, i: number) => (
                                        <PropertyGridItem collapsed key={x.fields.propertySlug} propertyObj={x.fields} />
                                    )
                                )}
                        </GridModule>
                    }
                />
            )}

            {/* @ts-ignore*/}
            {extraData && extraData.carouselImages && lightbox && (
                <LightBox items={extraData.carouselImages} toggle={toggleLightbox} />
            )}
        </>
    )
}

export default Property
export async function getStaticProps(context: { params: { slug: string } }) {
    const rawData = await getProperty(context.params.slug[0])
    const stringData = safeJsonStringify(rawData)
    const propertyResponse = JSON.parse(stringData)
    return {
        props: {
            propertyResponse,
        },
    }
}

export async function getStaticPaths() {
    const allProperties = await getAllPropertiesForPaths()

    // @ts-ignore
    let paths: { params: { slug: string[] } }[] = []

    // @ts-ignore
    allProperties.forEach((property) => {
        const propertyType = property.propertyType[0]
        const pathObj = { params: { slug: [property.slug] } }
        paths.push(pathObj)

        // Check for suite routes
        if (
            property.suites &&
            property.suites.length > 1 &&
            propertyType === 'Suites'
        ) {
            property.suites.map((y: { fields: { slug: string } }) => {
                const pathObj = {
                    params: {
                        slug: [property.slug, y.fields.slug],
                    },
                }
                paths.push(pathObj)
            })
        } else if (propertyType === 'Hotel') {
            const addition = [
                {
                    params: {
                        slug: [property.slug, 'suites'],
                    },
                },
                {
                    params: {
                        slug: [property.slug, 'rooms'],
                    },
                },
            ]
            paths.push(...addition)
        }
    })

    return {
        // @ts-ignore
        paths: paths,
        fallback: false,
    }
}
