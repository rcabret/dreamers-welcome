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
import { sendPageViewEvent } from './api/sendPageViewEvent';
import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react'
import "@contentful/live-preview/style.css"
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
    const pixelID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

    // @ts-ignore
    const [navTheme, setNavTheme] = useState(undefined)
    const [headerData, setHeaderData] = useState<HeaderData | undefined>(
        undefined
    )

    const [firstModalShow, setFirstModalShow] = useState(false)

    useEffect(() => {
        sendPageViewEvent(`${pixelID}`, { em: 'user@example.com' });
    }, []);
    
    useEffect(() => {
        // Check if the 'visited' flag exists in local storage
        const visited = localStorage.getItem('visited');
    
        if (visited !== 'true') {
            // Check if a timestamp exists in local storage
            const lastVisitTimestamp = localStorage.getItem('lastVisitTimestamp');
    
            if (!lastVisitTimestamp) {
                // If no timestamp, set one and show the modal
                localStorage.setItem('lastVisitTimestamp', Date.now().toString());
                setTimeout(() => {
                    setFirstModalShow(true);
                }, 3000);
            } else {
                // If a timestamp exists, check if 24 hours have passed
                const currentTime = Date.now();
                const timeSinceLastVisit = currentTime - parseInt(lastVisitTimestamp, 10);
    
                if (timeSinceLastVisit >= (24*60*60*1000)) {
                    // If 24 hours have passed, show the modal and update the timestamp
                    setTimeout(() => {
                        setFirstModalShow(true);
                    }, 3000);
                    localStorage.setItem('lastVisitTimestamp', currentTime.toString());
                }
            }
        }
    },[])

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
                <meta name="google-site-verification" content="1M2WGJ4z9PIe6P57go_NDWoyk79NI9oXBIeRFDM65Jo" />
                <meta name="facebook-domain-verification" content="8i88ic4qn6mgfjigvxmlkt7ih2sp7c" />
                <meta name="p:domain_verify" content="92466f0124ec9f4ae7dd68abc151da17" />
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
                    <img
                        height="1"
                        width="1"
                        style={{ display: 'none' }}
                        src="https://www.facebook.com/tr?id=1594089821088907&ev=PageView&noscript=1"
                    />
                </noscript>
            </Head>
            <ViewportProvider>
                <TopNav navTheme={navTheme} headerData={headerData} />
                <StyledMain id="main">
                    <ContentfulLivePreviewProvider
                      locale="en-US"
                      enableInspectorMode={true}
                      enableLiveUpdates={true}
                    >
                        <Component
                            {...pageProps}
                            setHeaderData={setHeaderData}
                            setNavTheme={setNavTheme}
                        />
                    </ContentfulLivePreviewProvider>

                </StyledMain>
                <EmailCapture inFirstVisitModal={false} />
                <Footer activeBucket={headerData?.bucket} />
                <FirstVisitModal modalOpen={firstModalShow} onClose={() => setFirstModalShow(false)} />
            </ViewportProvider>
        </>
    )
}
export default MyApp
