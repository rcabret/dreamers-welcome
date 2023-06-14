import React, { useEffect } from 'react'
import { Content, PageContent } from '../../styles/global'
import Block from '../../_components/UI/Block'
import MarkdownModule from '../../_components/Typography/MarkdownModule'
import { getPolicies, getPolicy } from '../../_lib/api'
import Dropdown from '../../_components/UI/Dropdown'

const BookingPolicy = ({ policy, dropdownData, setNavTheme }: any) => {
    const { content } = policy

    useEffect(() => {
        setNavTheme('dark')
    }, [])

    return (
        <Content padding>
            {/* <nav className={'breadcrumbs'} aria-label="breadcrumbs"><ol className={'_2jvtI'}><li><a href="/">Home </a></li><li>{'>'}</li><li>Booking Poilcy</li></ol></nav> */}
            <Block
                hideSeparator
                titleOverride={
                    <Dropdown dark id="policies-dropdown" links={dropdownData} bucket={policy.title} defaultLabel="CHOOSE STAY"/>
                }
                content={<PageContent><MarkdownModule data={content} /></PageContent>}
            />
        </Content>
    )
}

export default BookingPolicy

export async function getStaticProps(context: { params: { slug: string } }) {
    const policy = await getPolicy(context.params.slug)
    const policiesResponse = await getPolicies()

    const faqGeneral = policiesResponse.filter((x:any) => x.slug == 'general')
    let faqs = policiesResponse.filter((x:any) => x.slug !== 'general')
    faqs = [...faqGeneral, ...faqs]

    let dropdownData: { label: string; slug: string }[] = faqs.map(
        (x: { title: string; slug: string }) => {
            return {
                label: x.title,
                slug: `booking-policy/${x.slug}`,
            }
        }
    )

    return {
        props: {
            policy,
            dropdownData,
        },
    }
}

export async function getStaticPaths() {
    const faqs = await getPolicies()
    const paths: any = []
    faqs.forEach((x: { slug: string }) => {
        paths.push({ params: { slug: x.slug } })
    })
    return {
        // @ts-ignore
        paths: paths,
        fallback: false,
    }
}
