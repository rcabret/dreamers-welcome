import '../styles/main.scss'
import type { AppProps } from 'next/app'
import { ViewportProvider } from '../_utils/ViewportProvider'
import { useEffect, useState } from 'react'
import TopNav from '../_components/Navigation'
import styled from 'styled-components'
import Footer from '../_components/Footer'
import EmailCapture from '../_components/EmailCapture'
import TagManager from 'react-gtm-module'

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
    )
}
export default MyApp
