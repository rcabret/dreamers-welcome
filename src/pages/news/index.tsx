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
import Link from 'next/link'
import Header from '../../_components/Typography/Header'

const News = ({
    news,
    setNavTheme,
    setBucket,
}: {
    news: any
    setNavTheme: any
    setBucket: any
}) => {
    const breakpoint = useContext(viewportContext)

    useEffect(() => {
        setNavTheme('dark')
        setBucket('Puerto Rico')
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
            </TopSection>
            <GridWrapper border={false} padding>
                <GridModule columns={4} sideScrollOnMobile={false}>
                    {news &&
                        news.map((news: News, i: number) => (
                            <Link key={i} href={`/news/${news.slug}`} passHref>
                                <a>
                                    <NewsItem
                                        key={news.slug + i}
                                        newsObj={news}
                                    />
                                </a>
                            </Link>
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
