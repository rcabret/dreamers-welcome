import React from 'react'

import Link from 'next/link'

import {
    FooterStyled,
    StyledFooterLogo,
    LeftLinks,
    ContactUs,
    Copyright,
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
                </ul>
                <ul>
                    <li>
                        <Link href={'/about'}>ABOUT</Link>
                    </li>
                    <li>
                        <Link href={'/news'}>NEWS</Link>
                    </li>
                    <li>
                        <Link href={'/dw-radio'}>DW RADIO</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link href={'/privacy'}>PRIVACY</Link>
                    </li>
                    <li>
                        <Link href={'/bookings'}>BOOKINGS</Link>
                    </li>
                    <li>
                        <Link href={'/faqs'}>FAQ's</Link>
                    </li>
                </ul>
            </LeftLinks>
            <ContactUs href={'/contact'} inverse>
                CONTACT US
            </ContactUs>
            <Copyright>&copy; DW {moment().year()}</Copyright>
        </FooterStyled>
    )
}

export default Footer
