import '../styles/main.scss'
import type { AppProps } from 'next/app'
import { ViewportProvider } from '../_utils/ViewportProvider'
import { ReactNode, useState } from 'react'
import TopNav from '../_components/Navigation'
import styled from 'styled-components'
import Footer from '../_components/Footer'

const StyledMain = styled.main`
    width: 100%;
    min-height: 100vh;
`
function MyApp({ Component, pageProps }: AppProps) {
    // @ts-ignore
    const Layout = Component.Layout || EmptyLayout

    const [navTheme, setNavTheme] = useState(undefined)
    const [headerData, setHeaderData] = useState(undefined)

    return (
        <ViewportProvider>
            <StyledMain id="main">
                <TopNav navTheme={navTheme} headerData={headerData}/>
                <Layout>
                    <Component
                        {...pageProps}
                        setHeaderData={setHeaderData}
                        setNavTheme={setNavTheme}
                    />
                </Layout>
            </StyledMain>
            <Footer />
        </ViewportProvider>
    )
}
const EmptyLayout = ({ children }: { children: ReactNode }) => <>{children}</>

export default MyApp
