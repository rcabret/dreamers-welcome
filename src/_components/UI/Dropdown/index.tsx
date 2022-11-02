import React, { useEffect, useState } from 'react'
import { Chevron, Inner, Panel, StyledDropdown } from './styles'
import { useRouter } from 'next/router'

interface DropdownProps {
    id: string
    dark?: boolean
    links: { label: string; slug: string }[]
    bucket?: string
}
const Dropdown = ({ dark = false, links, id, bucket }: DropdownProps) => {
    const router = useRouter()

    const [isOpened, setIsOpened] = useState(false)

    const onClick = (slug: string) => {
        router.push(`/${slug}`)
    }

    useEffect(() => {
        const click = (e: MouseEvent) => {
            const targetId = e.target?.id
            if (targetId !== id && targetId !== `panel-${id}`) {
                setIsOpened(false)
            }
        }

        document.addEventListener('click', click)

        return () => {
            document.removeEventListener('click', click)
        }
    }, [])

    return (
        <StyledDropdown
            dark={dark}
            id={id}
            onClick={() => setIsOpened(!isOpened)}
        >
            <Inner>
                <Chevron dark={dark} viewBox="0 0 30 20">
                    <polyline points="0 0, 15 15, 30 0" />
                </Chevron>
                <div id={`panel-${id}`}>
                    {isOpened ? 'CHOOSE DESTINATION' : bucket}
                </div>
                <Panel opened={isOpened}>
                    {links &&
                        links.length &&
                        links.map((link) => (
                            <li
                                onClick={() => onClick(link.slug)}
                                className={bucket === link.label && 'active'}
                            >
                                {link.label}
                            </li>
                        ))}
                </Panel>
            </Inner>
        </StyledDropdown>
    )
}

export default Dropdown
