// _app.tsx

import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ViewportProvider } from '../_utils/ViewportProvider';
import TopNav from '../_components/Navigation';
import styled from 'styled-components';
import Footer from '../_components/Footer';
import EmailCapture from '../_components/EmailCapture';
import TagManager from 'react-gtm-module';
import { sendPageViewEvent } from './api/sendPageViewEvent';
import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';
import "@contentful/live-preview/style.css";
import '../styles/main.scss'
import FirstVisitModal from '../_components/Modal/FirstVisitModal'
import '../../public/styles/global.css'
import "@contentful/live-preview/style.css"
import { initializeGA, trackPageView } from '../_utils/analytics';


const StyledMain = styled.main`
  width: 100%;
  min-height: 100vh;
`;

interface HeaderData {
  bucket?: string;
  property?: string;
  simpleNav?: boolean;
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pixelID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
  const googleAnalyticsID = "UA-252792304-1";
  const [navTheme, setNavTheme] = useState(undefined);
  const [headerData, setHeaderData] = useState<HeaderData | undefined>(undefined);
  const [firstModalShow, setFirstModalShow] = useState(false);

  useEffect(() => {
    // Initialize Google Analytics
    initializeGA(googleAnalyticsID);

    // Log initial page view
    trackPageView(router.pathname);
      
    console.log('Google Analytics ID is defined:',  TagManager.initialize({ gtmId: googleAnalyticsID }));
        TagManager.initialize({ gtmId: googleAnalyticsID });
        sendPageViewEvent(`${pixelID}`, { em: 'user@example.com' });
  }, [googleAnalyticsID, router.pathname]);

  useEffect(() => {
    const visited = localStorage.getItem('visited');
    const lastVisitTimestamp = localStorage.getItem('lastVisitTimestamp');

    if (visited !== 'true') {
      if (!lastVisitTimestamp) {
        localStorage.setItem('lastVisitTimestamp', Date.now().toString());
        setTimeout(() => {
          setFirstModalShow(true);
        }, 3000);
      } else {
        const currentTime = Date.now();
        const timeSinceLastVisit = currentTime - parseInt(lastVisitTimestamp, 10);

        if (timeSinceLastVisit >= (24 * 60 * 60 * 1000)) {
          setTimeout(() => {
            setFirstModalShow(true);
          }, 3000);
          localStorage.setItem('lastVisitTimestamp', currentTime.toString());
        }
      }
    }
  }, [firstModalShow]);

  return (
    <>
      <Head>
        <title>Dreamers Welcome</title>
        {/* ... (other head content) */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsID}', {
                page_path: '${router.pathname}', // Use router.pathname for the dynamic page path
              });
            `,
          }}
        />
        {/* ... (other scripts) */}
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
        {/* ... (other components) */}
      </ViewportProvider>
    </>
  );
}

export default MyApp;
