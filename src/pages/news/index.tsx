import React, { useState, useContext, useEffect } from 'react'

import {
    Content,
    GridModule,
    GridWrapper,
    TopSection,
} from '../../styles/global'
import { useRouter } from 'next/router'
import { viewportContext } from '../../_utils/ViewportProvider'
import { getNews } from '../../_lib/api'
import NewsItem from '../../_components/NewsItem'
import { News } from '../../_constants/DataTypes'
import Header from '../../_components/Typography/Header'
import SubNavigation from '../../_components/Navigation/SubNavigation'

const links: { name: string; slug: string }[] = [
    {
        name: 'VIEW ALL',
        slug: 'view_all',
    },
    {
        name: 'ENTERTAINMENT',
        slug: 'Entertainment',
    },
    {
        name: 'SPORTS',
        slug: 'Sports',
    },
    {
        name: 'WELLNESS',
        slug: 'Wellness',
    },
    {
        name: 'WORLD AFFAIRS',
        slug: 'World Affairs',
    },
    {
        name: 'LOCAL',
        slug: 'Local',
    },
]

const News = ({
    news,
    setNavTheme,
    res,
    setHeaderData,
}: {
    news: any
    res: any
    setNavTheme: any
    setHeaderData: any
}) => {
    const breakpoint = useContext(viewportContext)
    const router = useRouter()
    const [_res, setRes] = useState([])

    useEffect(() => {
        setNavTheme('dark')
        const slug = router.query.slug as string
        const bucket = localStorage.getItem('bucket')
        setHeaderData({
            bucket: bucket,
        })
        setRes(res)
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
            
            if (!tags.length) {
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

    if (!news.length) {
        return null
    }

    return (
        <Content padding>
            <TopSection padding>
                <Header size={3} uppercase className='text-center mb-5' >
                    NEWS & UPDATES
                </Header>
                {/* <nav className={'breadcrumbs'} aria-label="breadcrumbs"><ol className={'_2jvtI'}><li><a href="/">Home</a></li><li>{'>'}</li><li>News</li></ol></nav> */}
            </TopSection>
            <SubNavigation
                activeSlug={activeSlug}
                data={links}
                queryParam="type"
                queryArray={router.query.slug || []}
            />
            <GridWrapper border={false} padding>
                <GridModule columns={3} sideScrollOnMobile={false}>
                    {activeNews && activeNews.length ?
                        activeNews.map((news: News, i: number) => (
                            <React.Suspense fallback={<div>Loading...</div>}>
                                <NewsItem key={news.slug + i} newsObj={news} />
                            </React.Suspense>
                        )) : null}
                </GridModule>
            </GridWrapper>
        </Content>
    )
}

export default News

export async function getStaticProps(context: { params: { slug: string } }) {
    const res = await getNews()
    const news = res.map((x: { fields: {} }) => x.fields)
    return {
        props: {
            news,
            res
        },
    }
}
