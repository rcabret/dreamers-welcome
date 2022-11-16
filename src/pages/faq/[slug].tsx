import React, { useEffect } from 'react'
import { Content } from '../../styles/global'
import Block from '../../_components/UI/Block'
import CollapsableList from '../../_components/UI/CollapsableList'
import Dropdown from '../../_components/UI/Dropdown'
import { getFaq, getFaqs } from '../../_lib/api'
import styled from 'styled-components'

const StyledDropdown = styled(Dropdown)`
    position: relative;
    height: auto;
    left: 0;
`
const Faq = ({ faq, dropdownData, setNavTheme }: any) => {
    const { list } = faq

    useEffect(() => {
        setNavTheme('dark')
    }, [])

    return (
        <Content padding>
            <Block
                hideSeparator
                titleOverride={
                    <StyledDropdown
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
