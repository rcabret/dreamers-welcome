import React from 'react'

import Link from 'next/link'

import {
    FooterStyled,
    StyledFooterLogo,
    LeftLinks,
    RightLinks,
    ContactUs,
} from './styles'

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
            </LeftLinks>
            <RightLinks>
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
            </RightLinks>
            <ContactUs href={'/contact'} inverse>
                CONTACT US
            </ContactUs>
        </FooterStyled>
    )
}

export default Footer
