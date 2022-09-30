import React from 'react'
import { Panel } from './styles'
import Link from 'next/link'
import Button from '../../UI/Buttons/Button'

const MenuPanel = ({ opened, activeBucket }: any) => {
    console.log('activeBucket', activeBucket)
    const activeBucketSlug = activeBucket || ''

    const getLink = (slug: string) =>
        `/${slug}${
            activeBucket
                ? `/${activeBucket.toLowerCase().replace(' ', '')}`
                : ''
        }`

    return (
        <Panel opened={opened}>
            <ul>
                <li>
                    <Link href={getLink('stays')}>STAYS</Link>
                </li>
                <li>
                    <Link href={getLink('guides')}>GUIDES</Link>
                </li>
                <li>
                    <Link href={getLink('experiences')}>EXPERIENCES</Link>
                </li>
            </ul>
            <div className="anchorSection">
                <ul>
                    <li>
                        <Link href="/about">STAYS</Link>
                    </li>
                    <li>
                        <Link href="/news">NEWS</Link>
                    </li>
                    <li>
                        <Link href="/radio">RADIO</Link>
                    </li>
                </ul>
                <Button inverse>CONTACT US</Button>
            </div>
        </Panel>
    )
}

export default MenuPanel
