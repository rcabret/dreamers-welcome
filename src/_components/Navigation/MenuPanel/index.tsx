import React, { useEffect } from 'react'
import { Panel, MainList } from './styles'
import Link from 'next/link'
import Button from '../../UI/Buttons/Button'

const MenuPanel = ({ opened, activeBucket, onClose }: any) => {

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
        <Panel opened={opened} onClick={() => onClose(false)}>
            <div>
                <MainList id="main_list">
                    <li>
                        <Link href={getLink('stays')}>STAYS</Link>
                    </li>
                    <li>
                        <Link href={getLink('guides')}>GUIDES</Link>
                        {!activeBucket && <aside />}
                    </li>
                    <li>
                        <Link href={getLink('experiences')}>EXPERIENCES</Link>
                        {!activeBucket && <aside />}
                    </li>
                </MainList>
                <div className="anchorSection">
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
                            <Link
                                href="https://open.spotify.com/user/krlki7u9768cfjkk49xb4iz6n"
                                target="_blank"
                            >
                                DW RADIO
                            </Link>
                        </li>
                    </ul>
                    <Button inverse>CONTACT US</Button>
                </div>
            </div>
        </Panel>
    )
}

export default MenuPanel
