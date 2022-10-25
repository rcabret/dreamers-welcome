import '../styles/main.scss'
import type { AppProps } from 'next/app'
import { ViewportProvider } from '../_utils/ViewportProvider'
import { ReactNode, useState } from 'react'
import TopNav from '../_components/Navigation'
import styled from 'styled-components'
import Footer from '../_components/Footer'
import EmailCapture from '../_components/EmailCapture'

const StyledMain = styled.main`
    width: 100%;
    min-height: 100vh;
`
function MyApp({ Component, pageProps }: AppProps) {
    // @ts-ignore
    const [navTheme, setNavTheme] = useState(undefined)
    const [headerData, setHeaderData] = useState(undefined)

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
