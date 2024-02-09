import React, { useEffect } from 'react'
import { Content, PageContent } from '../../styles/global'
import Block from '../../_components/UI/Block'
import MarkdownModule from '../../_components/Typography/MarkdownModule'
import { getPolicies, getPolicy } from '../../_lib/api'
import Dropdown from '../../_components/UI/Dropdown'
import Head from 'next/head'
const BookingPolicy = ({ policy, dropdownData, setNavTheme }: any) => {
    const { content } = policy

    const policyLinks = {
        apt: 'https://www.dreamerswelcome.com/booking-policy/apt',
        casafrida: 'https://www.dreamerswelcome.com/booking-policy/casafrida',
        dadajaja: 'https://www.dreamerswelcome.com/booking-policy/dadajaja',
        dreamcatcher: 'https://www.dreamerswelcome.com/booking-policy/dreamcatcher',
        dreamers: 'https://www.dreamerswelcome.com/booking-policy/dreamers',
        driftaway: 'https://www.dreamerswelcome.com/booking-policy/driftaway',   
        duna: 'https://www.dreamerswelcome.com/booking-policy/duna', 
        general: 'https://www.dreamerswelcome.com/booking-policy/general',  
        moodhaus: 'https://www.dreamerswelcome.com/booking-policy/moodhaus', 
        noa: 'https://www.dreamerswelcome.com/booking-policy/noa', 
        paz: 'https://www.dreamerswelcome.com/booking-policy/paz', 
        rosa: 'https://www.dreamerswelcome.com/booking-policy/rosa', 
        selva: 'https://www.dreamerswelcome.com/booking-policy/selva',
        tropicalia: 'https://www.dreamerswelcome.com/booking-policy/tropicalia',
        verde: 'https://www.dreamerswelcome.com/booking-policy/verde',
        waldhaus: 'https://www.dreamerswelcome.com/booking-policy/waldhaus',

    };
     
    const canonicalLink = policyLinks[(policy.slug).toLowerCase()] || '';


    useEffect(() => {
        setNavTheme('dark')
    }, [])
    
    
 console.log("booking policy---",policy.slug)
 let str = policy.slug
 let modStr = str[0].toUpperCase() + str.slice(1);

    return (    
        <>   
         <Head>
                <title>{modStr} Booking Policy | Dreamers Welcome</title>
                <meta
                    name="description"
                    content={`Learn about our cancellation, modification, and refund procedures, designed to accommodate your needs. Plan your dream getaway with confidence at Dreamers Welcome.`}
                />
                <link
                    rel="canonical"
                    href={canonicalLink}
                />
            </Head>
        <Content padding>
            {/* <nav className={'breadcrumbs'} aria-label="breadcrumbs"><ol className={'_2jvtI'}><li><a href="/">Home </a></li><li>{'>'}</li><li>Booking Poilcy</li></ol></nav> */}
            <Block
                hideSeparator
                titleOverride={
                    <Dropdown
                        dark
                        id="policies-dropdown"
                        links={dropdownData}
                        bucket={policy.title}
                        defaultLabel="CHOOSE STAY"
                    />
                }
                content={
                    <PageContent>
                        <MarkdownModule data={content} />
                    </PageContent>
                }
            />
        </Content>
        </>
    )
}

export default BookingPolicy

export async function getStaticProps(context: { params: { slug: string } }) {
    const policy = await getPolicy(context.params.slug)
    const policiesResponse = await getPolicies()

    const faqGeneral = policiesResponse.filter((x) => x.slug == 'general')
    let faqs = policiesResponse.filter((x) => x.slug !== 'general')
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
