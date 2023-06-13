import React, { useEffect } from 'react'
import { Content } from '../../styles/global'
import Block from '../../_components/UI/Block'
import CollapsableList from '../../_components/UI/CollapsableList'
import Dropdown from '../../_components/UI/Dropdown'
import { getFaq, getFaqPage, getFaqs } from '../../_lib/api'
import Blurb from '../../_components/UI/Blurb'

const Faq = ({ faq, dropdownData, faqPage, setNavTheme }: any) => {
    const { list } = faq

    useEffect(() => {
        setNavTheme('dark')
    }, [])

    return (
        <Content padding>
            <Blurb text={faqPage.blurb} eyebrow="FAQs" />
            <Block
                titleOverride={
                    <Dropdown
                        dark
                        id="faq-dropdown"
                        links={dropdownData}
                        bucket={faq.title}
                        defaultLabel="CHOOSE STAY"
                    />
                }
                content={<CollapsableList data={list} />}
            />
        </Content>
    )
}

export default Faq

export async function getStaticProps(context: { params: { slug: string } }) {
    const faq = await getFaq(context.params.slug)
    const faqsResponse = await getFaqs()
    const faqPage = await getFaqPage()

    const faqGeneral = faqsResponse.filter((x:any) => x.slug == 'general')
    let faqs = faqsResponse.filter((x:any) => x.slug !== 'general')
    faqs = [...faqGeneral, ...faqs]

    let dropdownData: { label: string; slug: string }[] = faqs.map(
        (x: { title: string; slug: string }) => {
            return {
                label: x.title,
                slug: `faq/${x.slug}`,
            }
        }
    )
    return {
        props: {
            faq,
            dropdownData,
            faqPage,
        },
    }
}

export async function getStaticPaths() {
    const faqs = await getFaqs()
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
