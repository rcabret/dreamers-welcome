import React, { useEffect } from 'react'
import { Content, PageContent } from '../styles/global'
import Block from '../_components/UI/Block'
import MarkdownModule from '../_components/Typography/MarkdownModule'
import { getPage } from '../_lib/api'

const Privacy = ({ data, setNavTheme }: any) => {
    const { content } = data
    
    useEffect(() => {
        setNavTheme('dark')
    }, [])

    return (
        <Content padding>
            {/* <nav className={'breadcrumbs'} aria-label="breadcrumbs"><ol className={'_2jvtI'}><li><a href="/">Home </a></li><li>{'>'}</li><li>Privacy</li></ol></nav> */}
            <Block hideSeparator title="Privacy" content={ <PageContent> <MarkdownModule data={content} /> </PageContent> } />
        </Content>
    )
}

export default Privacy

export async function getStaticProps(context: { params: { slug: string } }) {
    const data = await getPage('privacy')
    return {
        props: {
            data,
        },
    }
}
