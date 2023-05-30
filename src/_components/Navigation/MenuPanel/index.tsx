import React, { useContext, useEffect } from 'react'
import { Panel, MainList, DropdownWrapper } from './styles'
import Link from 'next/link'
import Button from '../../UI/Buttons/Button'
import { bucketLinks } from '../../../_constants/links'
import { viewportContext } from '../../../_utils/ViewportProvider'
import {NavbarDropdown} from "../styles";
import { useRouter } from 'next/router';

const MenuPanel = ({ opened, activeBucket, onClose }: any) => {
    const router = useRouter();
    const getLink = (slug: string) =>
        `/${slug}${
            activeBucket
                ? `/${activeBucket.toLowerCase().replace(' ', '')}`
                : ''
        }`

    const runMainList = (remove = false) => {
        const list: HTMLCollection | null =
            document.querySelector('#main_list').children
        if (list) {
            for (let i = 0; i < list.length; i++) {
                const ele = list[i]
                setTimeout(
                    () => {
                        if (!remove) {
                            ele.classList.add('active')
                        } else {
                            ele.classList.remove('active')
                        }
                    },
                    !remove ? i * 100 : 0
                )
            }
        }
    }

    const breakpoint = useContext(viewportContext)

    useEffect(() => {
        if (opened) {
            runMainList()
        } else {
            setTimeout(() => {
                runMainList(true)
            }, 500)
        }
    }, [opened])

    return (
        <Panel opened={opened}>
            <div>
                {breakpoint !== 'desktop' && (
                    <DropdownWrapper>
                        <NavbarDropdown
                            bucket={activeBucket}
                            dark
                            id="topnav-mobile-drop"
                            links={bucketLinks}
                            defaultLabel="CHOOSE DESTINATION"
                        />
                    </DropdownWrapper>
                )}
                <MainList id="main_list" onClick={() => onClose(false)}>
                    <li>
                        <Link href={router.query ? getLink('stays') : ""}>STAYS</Link>
                    </li>
                    <li>
                        <Link href={router.query ? getLink('experiences') : ""}>EXPERIENCES</Link>
                        {!activeBucket && <aside />}
                    </li>
                    <li>
                        <Link href={router.query ? getLink('guidebooks') : ""}>GUIDEBOOKS</Link>
                        {!activeBucket && <aside />}
                    </li>
                </MainList>
                <div className="anchorSection flex justify-around" onClick={() => onClose(false)}>
                    <ul>
                        <li>
                            <Link href="/about">ABOUT</Link>
                        </li>
                        <li>
                            <Link href="/news">NEWS</Link>
                        </li>
                        <li>
                            <Link href="/faq/general">FAQs</Link>
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
                    <ul>
                        <li>
                            <a
                                href="https://www.instagram.com/dreamers.welcome"
                                target="_blank"
                            >
                                INSTA
                            </a>
                        </li>
                        <li>
                            <a href='https://www.pinterest.com/dreamers_welcome'
                                target="_blank"
                            >
                                PINTEREST
                            </a>
                        </li>
                        <li>
                            <a href='https://m.facebook.com/dreamers.puertorico'
                                target="_blank"
                            >
                                FACEBOOK
                            </a>
                        </li>
                    </ul>
                    <Button inverse href="/contact">
                        CONTACT US
                    </Button>
                </div>
            </div>
        </Panel>
    )
}

export default MenuPanel
