import React, { useContext, useEffect } from 'react'

import { Content, GridModule, GridWrapper } from '../../styles/globla'
import { viewportContext } from '../../_utils/ViewportProvider'
import { getNews } from '../../_lib/api'
import NewsItem from '../../_components/NewsItem'
import { News } from '../../_constants/DataTypes'
import Link from 'next/link'

const News = ({ news }: { news: any }) => {
    const breakpoint = useContext(viewportContext)

    useEffect(() => {})

    if (!news.length) {
        return null
    }

    return (
        <Content>
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
