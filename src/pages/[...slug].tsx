import { getAllPropertiesForPaths, getProperty } from '../_lib/api'
import Blurb from '../_components/UI/Blurb'
import Suite from '../_components/Suite'
import BannerContent from '../_components/UI/BannerContent'
import { useEffect, useState } from 'react'
import SubNavigation from '../_components/Navigation/SubNavigation'
import { useRouter } from 'next/router'
import Highlight from '../_components/Suite/Highlight'
import { BannerGridImage } from '../styles/globla'

interface PropertyProps {
    propertyResponse: any
    setBucket: any
    setNavTheme: any
}

const Home = ({ propertyResponse, setBucket, setNavTheme }: PropertyProps) => {
    const {
        bannerImage,
        bannerHeader,
        blurb,
        suites,
        rooms,
        bottomBlurb,
        location,
        propertyType,
        bannerDescriptionList,
        bucket,
        features,
    } = propertyResponse

    const router = useRouter()

    setBucket(bucket[0])
    const pType = propertyType[0]
    const showSubNav = pType === 'Suites' || pType === 'Hotel'

    const [activeView, setView] = useState(suites[0])
    const [activeSlug, setSlug] = useState()

    useEffect(() => {
        setNavTheme('light')
    }, [])

    const getSubNavigationData = () => {
        if (pType === 'Suites') {
            return suites.map((x: { fields: any }) => {
                return { name: x.fields.name, slug: x.fields.slug }
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
        if (Array.isArray(a) && a.length > 2) {
            viewToShow = a.pop()
        } else {
            // If type is Hotel show Suites as default route
            viewToShow = pType === 'Hotel' ? 'suites' : suites[0].fields.slug
        }

        // set slug
        // @ts-ignore
        setSlug(viewToShow)

        const finalView =
            pType === 'Hotel'
                ? getHotelView(viewToShow)
                : suites.find(
                      (x: { fields: { slug: string } }) =>
                          x.fields.slug === viewToShow
                  )

        setView(finalView)
    }, [router.query])

    return (
        <>
            <BannerGridImage
                imageObj={bannerImage}
                border={false}
                borderRadius={false}
                fullHeight
                //ratio={0.5}
            >
                <BannerContent
                    headerText={bannerHeader}
                    headerSubheader={`${propertyType} in ${location}`}
                    description={bannerDescriptionList}
                />
            </BannerGridImage>
            <Blurb text={blurb} />
            {showSubNav && (
                <SubNavigation
                    activeState={activeSlug}
                    queryArray={router.query.slug}
                    data={getSubNavigationData()}
                />
            )}
            {/* Suites view for 'Suites' and House*/}
            <div id="suites_view">
                {pType !== 'Hotel' ? (
                    // Suites and Houses
                    <Suite
                        slug={activeSlug || ''}
                        data={activeView}
                        hideFirstSeparator={showSubNav && suites.length > 1}
                    />
                ) : (
                    // Hotel
                    activeView &&
                    Array.isArray(activeView) &&
                    activeView.map((x, i) => {
                        const { name, blurb, images } = x.fields
                        return (
                            <Highlight
                                key={~~(Math.random() * i)}
                                title={name}
                                blurb={blurb}
                                images={images}
                                slug={activeSlug || ''}
                                hideSeparator={i === 0}
                            />
                        )
                    })
                )}
            </div>

            {bottomBlurb && <Blurb text={bottomBlurb} borderTop />}
        </>
    )
}

export default Home

export async function getStaticProps(context: { params: { slug: string } }) {
    const propertyResponse = await getProperty(context.params.slug[1])

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
        const bucket = property.bucket[0].toLowerCase().replace(/\s/g, '')
        const propertyType = property.propertyType[0]
        const pathObj = { params: { slug: [bucket, property.slug] } }
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
                        slug: [bucket, property.slug, y.fields.slug],
                    },
                }
                paths.push(pathObj)
            })
        } else if (propertyType === 'Hotel') {
            const addition = [
                {
                    params: {
                        slug: [bucket, property.slug, 'suites'],
                    },
                },
                {
                    params: {
                        slug: [bucket, property.slug, 'rooms'],
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
