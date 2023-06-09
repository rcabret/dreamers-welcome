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
import FirstVisitModal from '../_components/Modal/FirstVisitModal'
import '../../public/styles/global.css'

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

    const [firstModalShow, setFirstModalShow] = useState(false)

    useEffect(() => {
        const visited = localStorage.getItem('visited');
        console.log(visited)
        if(visited != 'true'){
            let timer = setTimeout(() => {
                setFirstModalShow(true)                
            }, 3000);
        }
        // setFirstModalShow(true)
        localStorage.setItem('visited', 'true');
        TagManager.initialize({ gtmId: 'GTM-KC6QD2H' })
    }, [])

    return (
        <>
            <Head>
                <title>Dreamers Welcome</title>
                <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
                <link rel="manifest" href="/favicons/site.webmanifest" />
                <link  rel="mask-icon"  href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
                <meta name="google-site-verification" content="1M2WGJ4z9PIe6P57go_NDWoyk79NI9oXBIeRFDM65Jo" />
                <meta name="facebook-domain-verification" content="8i88ic4qn6mgfjigvxmlkt7ih2sp7c" />
                <meta name="p:domain_verify" content="92466f0124ec9f4ae7dd68abc151da17"/>
                <script
                    dangerouslySetInnerHTML={{
                    __html: `
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '1594089821088907');
                        fbq('track', 'PageView');
                    `
                    }}
                />
                <noscript>
                    <img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=1594089821088907&ev=PageView&noscript=1"
                    />
                </noscript>
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
                <EmailCapture inFirstVisitModal={false}/>
                <Footer activeBucket={headerData?.bucket} />
                <FirstVisitModal modalOpen={firstModalShow} onClose={() => setFirstModalShow(false)}/>
            </ViewportProvider>
        </>
    )
}
export default MyApp
