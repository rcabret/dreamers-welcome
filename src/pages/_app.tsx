import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ViewportProvider } from '../_utils/ViewportProvider'
import { ReactNode, useEffect, useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
    // @ts-ignore
    const Layout = Component.Layout || EmptyLayout

    const [bucket, setBucket] = useState(undefined)

    return (
        <ViewportProvider>
            <div>{bucket}</div>
            <Layout>
                <Component {...pageProps} setBucket={setBucket} />
            </Layout>
        </ViewportProvider>
    )
}
const EmptyLayout = ({ children }: { children: ReactNode }) => <>{children}</>

export default MyApp
