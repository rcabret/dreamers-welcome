import React from 'react'

import Link from 'next/link'

import {
    FooterStyled,
    StyledFooterLogo,
    LeftLinks,
    ContactUs,
    Copyright,
    Policies,
} from './styles'
import moment from 'moment'

const Footer = ({ activeBucket }: any) => {
    const getLink = (slug: string) =>
        `/${slug}${
            activeBucket
                ? `/${activeBucket.toLowerCase().replace(' ', '')}`
                : ''
        }`

    return (
        <FooterStyled>
            <StyledFooterLogo />
            <LeftLinks>
                <ul>
                    <li>
                        <Link href={getLink('stays')}>STAYS</Link>
                    </li>
                    {activeBucket && (
                        <>
                            <li>
                                <Link href={getLink('experiences')}>
                                    EXPERIENCES
                                </Link>
                            </li>
                            <li>
                                <Link href={getLink('guidebooks')}>GUIDEBOOKS</Link>
                            </li>
                        </>
                    )}
                    <li>
                        <Link href={'/faq/general'}>FAQs</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link href={'/about'}>ABOUT</Link>
                    </li>
                    <li>
                        <Link href={'/news'}>NEWS</Link>
                    </li>
                    <li>
                        <a
                            href="https://open.spotify.com/user/krlki7u9768cfjkk49xb4iz6n"
                            target="_blank"
                        >
                            DW RADIO
                        </a>
                    </li>
                </ul>
            </LeftLinks>
            <ContactUs href={'/contact'} inverse>
                CONTACT US
            </ContactUs>
            <Copyright>&copy; DW {moment().year()}</Copyright>
            <Policies>
                <Link href={'/privacy'}>Privacy</Link>&nbsp;and&nbsp;
                <Link href={'/booking-policy/general'}>Booking Policy</Link>
            </Policies>
        </FooterStyled>
    )
}

export default Footer
