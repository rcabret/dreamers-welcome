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
        `/${slug}${activeBucket
            ? `/${activeBucket.toLowerCase().replace(' ', '')}`
            : ''
        }`

    return (
        <FooterStyled>
            <StyledFooterLogo />
            <LeftLinks>
                {activeBucket ? (
                    <><ul>
                        <li className='text-sm sm:text-xl'>
                            <Link href={getLink('stays')}>STAYS</Link>
                        </li>
                        <li className='text-sm sm:text-xl'>
                            <Link href={getLink('experiences')}>
                                EXPERIENCES
                            </Link>
                        </li>
                        <li className='text-sm sm:text-xl'>
                            <Link href={getLink('guidebooks')}>GUIDEBOOKS</Link>
                        </li>

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
                            {/* <li className='text-sm sm:text-xl'>
                                <a href="https://giftup.app/place-order/f4fbef08-de2d-4d8e-c896-08db98c383e8?platform=hosted" target='_blank'>GIFT CARDS</a>
                            </li> */}
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
                                <a
                                    href="https://www.tiktok.com/@dreamers.welcome"
                                    target="_blank"
                                >
                                    TIKTOK
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
                        </ul></>
                ) : (<>
                    <ul>
                        <li className='text-sm sm:text-xl'>
                            <Link href={getLink('stays')}>STAYS</Link>
                        </li>
                        <li className='text-sm sm:text-xl'>
                            <Link href={'/faq/general'}>FAQs</Link>
                        </li>
                        <li className='text-sm sm:text-xl'>
                            <Link href={'/about'}>ABOUT</Link>
                        </li>
                        <li className='text-sm sm:text-xl'>
                            <Link href={'/news'}>NEWS</Link>
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
                            <a
                                href="https://www.tiktok.com/@dreamers.welcome"
                                target="_blank"
                            >
                                TIKTOK
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
                    <ul>

                        <li className='text-sm sm:text-xl'>
                            <a
                                href="https://open.spotify.com/user/krlki7u9768cfjkk49xb4iz6n"
                                target="_blank"
                            >
                                DW RADIO
                            </a>
                        </li>
                        {/* <li className='text-sm sm:text-xl'>
                            <a href="https://giftup.app/place-order/f4fbef08-de2d-4d8e-c896-08db98c383e8?platform=hosted" target='_blank'>GIFT CARDS</a>
                        </li> */}
                    </ul>

                </>)}

            </LeftLinks>
            <ContactUs href={'/contact'} inverse>
                CONTACT US
            </ContactUs>
            <div className='flex copywrite'>
                <Copyright>&copy; DW {moment().year()}</Copyright>
                <Policies>
                    <a href='/privacy'>Privacy</a>&nbsp;and&nbsp;
                    <a href='/booking-policy/general'>Booking Policy</a>
                </Policies>
            </div>
        </FooterStyled>
    )
}

export default Footer
