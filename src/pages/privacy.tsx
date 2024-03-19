import React, { useEffect } from 'react'
import { Content, PageContent } from '../styles/global'
import Block from '../_components/UI/Block'
import MarkdownModule from '../_components/Typography/MarkdownModule'
import { getPage } from '../_lib/api'
import Head from 'next/head'

<<<<<<< HEAD

const Privacy = ({ data, setNavTheme }: any) => {
    const { content } = data
=======
const Privacy = ({ data, setNavTheme, seoData }: any) => {
  const { content } = data
>>>>>>> 6000c0a964330bb38ae865fb5b286b9a3e4d27ae

  useEffect(() => {
    setNavTheme('dark')
  }, [])

<<<<<<< HEAD

   

    return (
        <>
         <Head>
                <title>Privacy Policy | Dreamers Welcome</title>
                <meta name="description" content="Learn about the Privacy Policy at Dreamers Welcome and how we protect and handle your personal data when you visit our website." />
                <link rel="canonical" href="https://www.dreamerswelcome.com/privacy" />
            </Head>
        <Content padding>
            {/* <nav className={'breadcrumbs'} aria-label="breadcrumbs"><ol className={'_2jvtI'}><li><a href="/">Home </a></li><li>{'>'}</li><li>Privacy</li></ol></nav> */}
            <Block
                hideSeparator
                title="Privacy"
                content={
                    <PageContent>
                        <MarkdownModule data={content} />
                    </PageContent>
                }
            />
        </Content>
        </>
    )
=======
  console.log('privacy')
  return (
    <>
      <Head>
        <title>{seoData.metaTitle}</title>
        <meta name="description" content={seoData.metaDescription} />
        <link rel="canonical" href={seoData.canonicalUrl} />
      </Head>
      <Content padding>
        {/* <nav className={'breadcrumbs'} aria-label="breadcrumbs"><ol className={'_2jvtI'}><li><a href="/">Home </a></li><li>{'>'}</li><li>Privacy</li></ol></nav> */}
        <Block
          hideSeparator
          title="Privacy"
          content={
            <PageContent>
              <MarkdownModule data={content} />
            </PageContent>
          }
        />
      </Content>
    </>
  )
>>>>>>> 6000c0a964330bb38ae865fb5b286b9a3e4d27ae
}

export default Privacy

export async function getStaticProps(context: { params: { slug: string } }) {
  const data = await getPage('privacy')
  const seoData = data?.seoMetadata?.fields

  return {
    props: {
      data,
      seoData: {
        metaTitle: seoData?.metaTitle ?? 'Privacy Policy | Dreamers Welcome',
        metaDescription:
          seoData?.metaDescription ??
          'Learn about the Privacy Policy at Dreamers Welcome and how we protect and handle your personal data when you visit our website.',
        canonicalUrl:
          seoData?.canonicalUrl ?? 'https://www.dreamerswelcome.com/privacy',
      },
    },
  }
}
