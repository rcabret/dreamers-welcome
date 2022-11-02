import '../styles/main.scss'
import type { AppProps } from 'next/app'
import { ViewportProvider } from '../_utils/ViewportProvider'
import { ReactNode, useEffect, useState } from 'react'
import TopNav from '../_components/Navigation'
import styled from 'styled-components'
import Footer from '../_components/Footer'
import EmailCapture from '../_components/EmailCapture'
import { useRouter } from 'next/router'

const StyledMain = styled.main`
    width: 100%;
    min-height: 100vh;
`
interface HeaderData {
    bucket?: string
    property?: string
    simpleNav?: boolean
}

function MyApp({ Component, pageProps }: AppProps) {
    // @ts-ignore
    const [navTheme, setNavTheme] = useState(undefined)
    const [headerData, setHeaderData] = useState<HeaderData | undefined>(
        undefined
    )
    const router = useRouter()

    useEffect(() => {
        if (router.pathname === '/[...slug]') {
            return
        }

        let bucket
        if (router.asPath.indexOf('puertorico') > -1) {
            bucket = 'Puerto Rico'
        } else if (router.asPath.indexOf('northcarolina') > -1) {
            bucket = 'North Carolina'
        } else {
            bucket = undefined
        }
        setHeaderData({ ...headerData, ...{ bucket: bucket } })

    }, [router])

    return (
        <ViewportProvider>
            <TopNav navTheme={navTheme} headerData={headerData} />
            <StyledMain id="main">
                <Component
                    {...pageProps}
                    setHeaderData={setHeaderData}
                    setNavTheme={setNavTheme}
                />
            </StyledMain>
            <EmailCapture />
            <Footer />
        </ViewportProvider>
    )
}
export default MyApp
