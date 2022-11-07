import React, { useEffect } from 'react'
import { Content, PageContent } from '../styles/global'
import Block from '../_components/UI/Block'
import MarkdownModule from '../_components/Typography/MarkdownModule'
import { getPage } from '../_lib/api'

const BookingPolicy = ({ data, setNavTheme }: any) => {
    const { content } = data

    useEffect(() => {
        setNavTheme('dark')
    }, [])

    return (
        <Content padding>
            <Block
                hideSeparator
                title="BOOKING POLICY"
                content={
                    <PageContent>
                        <MarkdownModule data={content} />
                    </PageContent>
                }
            />
        </Content>
    )
}

export default BookingPolicy

export async function getStaticProps(context: { params: { slug: string } }) {
    const data = await getPage('booking-policy')

    return {
        props: {
            data,
        },
    }
}
