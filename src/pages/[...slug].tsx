import styles from '../styles/Home.module.css'
import { getAllPropertiesForPaths, getProperty } from '../_lib/api'
import GridImage from '../_components/UI/GridImage'
import Blurb from '../_components/UI/Blurb'
import Suite from '../_components/Suite'
import BannerContent from '../_components/UI/BannerContent'
import { useEffect } from 'react'

interface PropertyProps {
    propertyResponse: any
    setBucket: any
}

const Home = ({ propertyResponse, setBucket }: PropertyProps) => {
    const {
        bannerImage,
        bannerHeader,
        blurb,
        suites,
        bottomBlurb,
        location,
        propertyType,
        bannerDescriptionList,
        bucket,
    } = propertyResponse

    useEffect(() => {
        setBucket(bucket[0])
    }, [])

    return (
        <>
            <GridImage
                imageObj={bannerImage}
                border={false}
                borderRadius={false}
                ratio={0.5}
            >
                <BannerContent
                    headerText={bannerHeader}
                    headerSubheader={`${propertyType} in ${location}`}
                    description={bannerDescriptionList}
                />
            </GridImage>
            <Blurb text={blurb} />
            <Suite data={suites[0]} />
            <Blurb text={bottomBlurb} borderTop />
        </>
    )
}

export default Home

export async function getStaticProps(context: { params: { slug: string } }) {
    const propertyResponse = await getProperty(context.params.slug[0])

    return {
        props: {
            propertyResponse,
        },
    }
}

export async function getStaticPaths() {
    const allProperties = await getAllPropertiesForPaths()

    // @ts-ignore
    let paths = []

    // @ts-ignore
    allProperties.forEach((x) => {
        let slugArray = [x.propertyName]
        const pathObj = { params: { slug: slugArray } }
        paths.push(pathObj)

        // Check for suite routes
        if (x.suites && x.suites.length > 1) {
            x.suites.map((y: { fields: { suiteName: string } }) => {
                const pathObj = {
                    params: { slug: [x.propertyName, y.fields.suiteName] },
                }
                paths.push(pathObj)
            })
        }
    })

    return {
        // @ts-ignore
        paths: paths,
        fallback: false,
    }
}
