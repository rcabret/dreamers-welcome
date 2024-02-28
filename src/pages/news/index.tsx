import React, { useState, useContext, useEffect } from 'react'

import {
    Content,
    GridModule,
    GridWrapper,
    TopSection,
} from '../../styles/global'
import { useRouter } from 'next/router'
import { viewportContext } from '../../_utils/ViewportProvider'
import { getNews, newsPage } from '../../_lib/api'
import NewsItem from '../../_components/NewsItem'
import { News } from '../../_constants/DataTypes'
import Header from '../../_components/Typography/Header'
import Blurb from '../../_components/UI/Blurb'
import SubNavigation from '../../_components/Navigation/SubNavigation'
import safeJsonStringify from 'safe-json-stringify'
import { useContentfulLiveUpdates, useContentfulInspectorMode } from '@contentful/live-preview/react';
import Head from 'next/head'



const links: { name: string; slug: string }[] = [
    {
        name: 'VIEW ALL',
        slug: 'view_all',
    },
    {
        name: 'NEWS',
        slug: 'News',
    },
    {
        name: 'EVENTS',
        slug: 'Events',
    },
    {
        name: 'PROMOTIONS',
        slug: 'Promotions',
    },
    {
        name: 'AWARDS',
        slug: 'Awards',
    },
    {
        name: 'PRESS',
        slug: 'Press',
    }
]



const News = ({
    news,
    blurb,
    setNavTheme,
    res,
    setHeaderData,
}: {
    news: any
    res: any
    blurb: any
    setNavTheme: any
    setHeaderData: any
}) => {
    const breakpoint = useContext(viewportContext)
    const router = useRouter()
    const [_res, setRes] = useState([])
    const [category, setCategory] = useState([])
    useEffect(() => {
        setNavTheme('dark')
        const slug = router.query.slug as string
       
        const bucket = localStorage.getItem('bucket')
        setHeaderData({
            bucket: bucket,
        })
        setRes(res)
        const check = news.map((x: { test: {} }) => x.test)
        setCategory(check)
    }, [])

    const [activeSlug, setSlug] = useState<string>(
        (router.query.type as string) || 'view_all'
    )

    const [activeNews, setNews] = useState<any[]>([
        ...news,
    ])

    useEffect(() => {
        const queryTag = (router.query.type as string) || ('view_all' as string)
        // @ts-ignore
        setSlug(queryTag)

        const checkForTags = (tags: any[], slug: string) => {

            if (!tags?.length) {
                return [...news]
            }
            return tags.find((tag: any) => tag === slug)
        }

        const newsToView =
            queryTag !== 'view_all'
                ? [...news].filter((news: any) =>
                    checkForTags(news.test, queryTag)
                )
                : [...news]

        setNews(newsToView)
    }, [router, router.query])

    useEffect(() => { }, [activeNews])

    if (!news?.length) {
        return null
    }

  const inspectorProps = useContentfulInspectorMode()

  console.log(" in the news page +++++")

    return (
        <>
        <Head>
        <title>News | Dreamers Welcome</title>
        <meta name="description" content="The Dreamers Welcome blog gives readers a peek at laidback luxury travel at its finest & shines the spotlight on travel stories within Dreamers Welcome properties." />
        <link rel="canonical" href="https://www.dreamerswelcome.com/news"/>
    </Head>
            {/* <Content padding> */}
           
            <Blurb text={blurb?.blurb} eyebrow="NEWS & UPDATES" fullHeight
                {...inspectorProps({
                    entryId: 'kVTRrzVviydTHxX9LFA9J',
                    fieldId: 'blurb',
                })}
            />
            {/* <TopSection padding>
                <Header size={4} uppercase className='text-center mb-28' >
                    NEWS & UPDATES
                </Header> */}
            {/* <nav className={'breadcrumbs'} aria-label="breadcrumbs"><ol className={'_2jvtI'}><li><a href="/">Home</a></li><li>{'>'}</li><li>News</li></ol></nav> */}
            {/* </TopSection> */}
            <SubNavigation
                activeSlug={activeSlug}
                data={links}
                queryParam="type"
                queryArray={router.query.slug || []}
            />
            <GridWrapper border={false} padding>
                <GridModule columns={3} sideScrollOnMobile={false}>
                    {activeNews && activeNews?.length ?
                        activeNews.map((news: News, i: number) => (
                            <NewsItem key={i} newsObj={news} />
                        )) : null}
                </GridModule>
            </GridWrapper>
            {/* </Content> */}
        </>
    )
}

export default News

export async function getStaticProps(context: { params: { slug: string } }) {
    const rawData = await getNews()
    const blurb = await newsPage()
    console.log("rawsdata ---->",rawData.length)
    const stringData = safeJsonStringify(rawData)
    const res = JSON.parse(stringData)
    const news = res.map((x: { fields: {} }) => x.fields)

    return {
        props: {
            news,
            res,
            blurb
        },
    }
}

