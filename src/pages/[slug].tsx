import styles from '../styles/Home.module.css'
import { getAllPropertiesForPaths, getProperty } from '../_lib/api'
import GridImage from '../_components/UI/GridImage'
import Blurb from '../_components/UI/Blurb'
import Suite from '../_components/Suite'
import BannerContent from '../_components/UI/BannerContent'

interface PropertyProps {
    propertyResponse: any
}

const Home = ({ propertyResponse }: PropertyProps) => {
    const {
        bannerImage,
        bannerHeader,
        blurb,
        suites,
        bottomBlurb,
        location,
        propertyType,
        bannerDescriptionList,
    } = propertyResponse

    console.log(bannerDescriptionList)
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
    const propertyResponse = await getProperty(context.params.slug)

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
        paths.push({ params: { slug: x.propertyName } })
    })

    return {
        // @ts-ignore
        paths: paths,
        fallback: false,
    }
}
