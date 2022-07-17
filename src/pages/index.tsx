import { getHomepage, getProperty } from '../_lib/api'

interface HomepageProps {
    homepageResponse: any
}

const Home = ({ homepageResponse }: HomepageProps) => {
    return <div>Dreamers Welcome Home</div>
}

export default Home

export async function getStaticProps() {
    const homepageResponse = await getProperty('selva')

    return {
        props: {
            homepageResponse,
        },
    }
}
