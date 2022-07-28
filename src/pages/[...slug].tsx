import { getAllPropertiesForPaths, getProperty } from '../_lib/api'
import GridImage from '../_components/UI/GridImage'
import Blurb from '../_components/UI/Blurb'
import Suite from '../_components/Suite'
import BannerContent from '../_components/UI/BannerContent'
import { useEffect } from 'react'
import styled from 'styled-components'

interface PropertyProps {
    propertyResponse: any
    setBucket: any
}

const StyledGridImage = styled(GridImage)`
    height: calc(100vh);
    min-height: 700px;
`

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
        features,
    } = propertyResponse

    useEffect(() => {
        setBucket(bucket[0])
    }, [])

    return (
        <>
            <StyledGridImage
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
            </StyledGridImage>
            <Blurb text={blurb} />
            <Suite data={suites[0]} />
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
    let paths = []

    // @ts-ignore
    allProperties.forEach((x) => {
        const bucket = x.bucket[0].toLowerCase().replace(/\s/g, '')
        const pathObj = { params: { slug: [bucket, x.slug] } }
        paths.push(pathObj)

        // Check for suite routes
        if (x.suites && x.suites.length > 1) {
            x.suites.map((y: { fields: { slug: string } }) => {
                const pathObj = {
                    params: {
                        slug: [bucket, x.slug, y.fields.slug],
                    },
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
