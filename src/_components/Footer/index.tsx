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

const Footer = () => {
    return (
        <FooterStyled>
            <StyledFooterLogo />
            <LeftLinks>
                <ul>
                    <li>
                        <Link href={'/stays'}>STAYS</Link>
                    </li>
                    <li>
                        <Link href={'/experiences'}>EXPERIENCES</Link>
                    </li>
                    <li>
                        <Link href={'/guides'}>GUIDES</Link>
                    </li>
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
                        <Link
                            href="https://open.spotify.com/user/krlki7u9768cfjkk49xb4iz6n"
                            target="_blank"
                        >
                            DW RADIO
                        </Link>
                    </li>
                </ul>
            </LeftLinks>
            <ContactUs href={'/contact'} inverse>
                CONTACT US
            </ContactUs>
            <Copyright>&copy; DW {moment().year()}</Copyright>
            <Policies>
                <Link href={'/privacy'}>Privacy</Link>&nbsp;and&nbsp;
                <Link href={'/booking-policy'}>Booking Policy</Link>
            </Policies>
        </FooterStyled>
    )
}

export default Footer
