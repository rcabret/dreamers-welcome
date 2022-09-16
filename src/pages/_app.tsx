import '../styles/main.scss'
import type { AppProps } from 'next/app'
import { ViewportProvider } from '../_utils/ViewportProvider'
import { ReactNode, useState } from 'react'
import TopNav from '../_components/Navigation'
import styled from 'styled-components'
import Footer from '../_components/Footer'

const StyledMain = styled.main`
    width: 100%;
    transition: 0.4s width cubic-bezier(0, 0.8, 0.86, 1.01);
`
function MyApp({ Component, pageProps }: AppProps) {
    // @ts-ignore
    const Layout = Component.Layout || EmptyLayout

    const [bucket, setBucket] = useState(undefined)
    const [navTheme, setNavTheme] = useState(undefined)

    return (
        <ViewportProvider>
            <StyledMain id="main">
                <TopNav bucket={bucket} navTheme={navTheme} />
                <Layout>
                    <Component
                        {...pageProps}
                        setBucket={setBucket}
                        setNavTheme={setNavTheme}
                    />
                </Layout>
                <Footer />
            </StyledMain>
        </ViewportProvider>
    )
}
const EmptyLayout = ({ children }: { children: ReactNode }) => <>{children}</>

export default MyApp
