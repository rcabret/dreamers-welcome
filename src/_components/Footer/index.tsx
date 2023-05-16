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
                    <li className='text-sm sm:text-xl'>
                        <Link href={getLink('stays')}>STAYS</Link>
                    </li>
                    {activeBucket && (
                        <>
                            <li className='text-sm sm:text-xl'>
                                <Link href={getLink('experiences')}>
                                    EXPERIENCES
                                </Link>
                            </li>
                            <li className='text-sm sm:text-xl'>
                                <Link href={getLink('guidebooks')}>GUIDEBOOKS</Link>
                            </li>
                        </>
                    )}
                    <li className='text-sm sm:text-xl'>
                        <Link href={'/faq/general'}>FAQs</Link>
                    </li>
                </ul>
                <ul>
                    <li className='text-sm sm:text-xl'>
                        <Link href={'/about'}>ABOUT</Link>
                    </li>
                    <li className='text-sm sm:text-xl'>
                        <Link href={'/news'}>NEWS</Link>
                    </li>
                    <li className='text-sm sm:text-xl'>
                        <a
                            href="https://open.spotify.com/user/krlki7u9768cfjkk49xb4iz6n"
                            target="_blank"
                        >
                            DW RADIO
                        </a>
                    </li>
                </ul>
                <ul>
                    <li className='text-sm sm:text-xl'>
                        <a
                            href="https://www.instagram.com/dreamers.welcome"
                            target="_blank"
                        >
                            INSTA
                        </a>
                    </li>
                    <li className='text-sm sm:text-xl'>
                        <a href='https://www.pinterest.com/dreamers_welcome'
                            target="_blank"
                        >
                            PINTEREST
                        </a>
                    </li>
                    <li className='text-sm sm:text-xl'>
                        <a href='https://m.facebook.com/dreamers.puertorico'
                            target="_blank"
                        >
                            FACEBOOK
                        </a>
                    </li>
                </ul>
            </LeftLinks>
            <ContactUs href={'/contact'} inverse>
                CONTACT US
            </ContactUs>
            <div className='flex absolute bottom-7 left-5'>
                <Copyright>&copy; DW {moment().year()}</Copyright>
                <Policies>
                    <Link href={'/privacy'}>Privacy</Link>&nbsp;and&nbsp;
                    <Link href={'/booking-policy/general'}>Booking Policy</Link>
                </Policies>
            </div>
        </FooterStyled>
    )
}

export default Footer
