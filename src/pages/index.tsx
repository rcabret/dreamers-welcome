import styles from '../styles/Home.module.css'
import { getHomepage, getProperty } from '../_lib/api'

interface HomepageProps {
    homepageResponse: any
}

const Home = ({ homepageResponse }: HomepageProps) => {
    console.log(homepageResponse)
    return (
        <div className={styles.container}>{homepageResponse?.propertyName}</div>
    )
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
