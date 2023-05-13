import '../styles/main.scss'
import type { AppProps } from 'next/app'
import { ViewportProvider } from '../_utils/ViewportProvider'
import { useEffect, useState } from 'react'
import TopNav from '../_components/Navigation'
import styled from 'styled-components'
import Footer from '../_components/Footer'
import EmailCapture from '../_components/EmailCapture'
import TagManager from 'react-gtm-module'
import Head from 'next/head'

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

    useEffect(() => {
        TagManager.initialize({ gtmId: 'GTM-KC6QD2H' })
    }, [])

    return (
        <>
            <Head>
                <title>Dreamers Welcome</title>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/favicons/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicons/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicons/favicon-16x16.png"
                />
                <link rel="manifest" href="/favicons/site.webmanifest" />
                <link
                    rel="mask-icon"
                    href="/favicons/safari-pinned-tab.svg"
                    color="#5bbad5"
                />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
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
                <Footer activeBucket={headerData?.bucket} />
            </ViewportProvider>
        </>
    )
}
export default MyApp
