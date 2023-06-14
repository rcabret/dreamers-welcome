import React, { useContext, useEffect } from 'react'

import {
    Content,
    GridModule,
    GridWrapper,
    TopSection,
} from '../../styles/global'
import { viewportContext } from '../../_utils/ViewportProvider'
import { getNews } from '../../_lib/api'
import NewsItem from '../../_components/NewsItem'
import { News } from '../../_constants/DataTypes'
import Header from '../../_components/Typography/Header'
import Breadcrumbs from 'nextjs-breadcrumbs';

const News = ({
    news,
    setNavTheme,
    setHeaderData,
}: {
    news: any
    setNavTheme: any
    setHeaderData: any
}) => {
    const breakpoint = useContext(viewportContext)

    useEffect(() => {
        setNavTheme('dark')
        setHeaderData({
            bucket: undefined,
        })
    }, [])

    if (!news.length) {
        return null
    }

    return (
        <Content padding>
            <TopSection padding>
                <Header size={4} uppercase>
                    NEWS & UPDATES
                </Header>
                {/* <nav className={'breadcrumbs'} aria-label="breadcrumbs"><ol className={'_2jvtI'}><li><a href="/">Home</a></li><li>{'>'}</li><li>News</li></ol></nav> */}
            </TopSection>
            <GridWrapper border={false} padding>
                <GridModule columns={4} sideScrollOnMobile={false}>
                    {news &&
                        news.map((news: News, i: number) => (
                            <NewsItem key={news.slug + i} newsObj={news} />
                        ))}
                </GridModule>
            </GridWrapper>
        </Content>
    )
}

export default News

export async function getStaticProps(context: { params: { slug: string } }) {
    const news = await getNews()

    return {
        props: {
            news,
        },
    }
}
