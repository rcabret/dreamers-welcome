import '../styles/main.scss'
import type { AppProps } from 'next/app'
import { ViewportProvider } from '../_utils/ViewportProvider'
import { ReactNode, useState } from 'react'
import TopNav from '../_components/Navigation'

function MyApp({ Component, pageProps }: AppProps) {
    // @ts-ignore
    const Layout = Component.Layout || EmptyLayout

    const [bucket, setBucket] = useState(undefined)
    const [navTheme, setNavTheme] = useState(undefined)

    return (
        <ViewportProvider>
            <TopNav bucket={bucket} navTheme={navTheme} />
            <Layout>
                <Component
                    {...pageProps}
                    setBucket={setBucket}
                    setNavTheme={setNavTheme}
                />
            </Layout>
        </ViewportProvider>
    )
}
const EmptyLayout = ({ children }: { children: ReactNode }) => <>{children}</>

export default MyApp
