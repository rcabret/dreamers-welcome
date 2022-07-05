import styles from '../styles/Home.module.css'
import { getHomepage } from '../_lib/api'

// @ts-ignore
const Home = ({ homepageResponse }) => {
    console.log('homepage', homepageResponse)
    return <div className={styles.container}>{homepageResponse?.title}</div>
}

export default Home

export async function getStaticProps() {
    const homepageResponse = await getHomepage()

    return {
        props: {
            homepageResponse,
        },
    }
}
