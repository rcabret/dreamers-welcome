import React, { useEffect, useState } from 'react'
import { Inner, Panel, StyledDropdown } from './styles'
import { useRouter } from 'next/router'
import Chevron from '../Icons/Chevron'

interface DropdownProps {
    className?: string
    id: string
    dark?: boolean
    links: { label: string; slug: string }[]
    bucket?: string
    defaultLabel?: string
    routeAware?: boolean
}
const Dropdown = ({
    className,
    dark = false,
    defaultLabel,
    links,
    id,
    bucket,
    routeAware = false,
}: DropdownProps) => {
    const router = useRouter()

    const [isOpened, setIsOpened] = useState(false)

    const onClick = (slug: string) => {
        const url = `/${slug}`
        router.push(url)
    }

    useEffect(() => {
        const click = (e: MouseEvent) => {
            const targetId = e.target?.id
            if (targetId !== id && targetId !== `panel-${id}`) {
                setIsOpened(false)
            }
        }

        document.addEventListener('click', click)

        return () => { document.removeEventListener('click', click) }
    }, [])

    return (
        <StyledDropdown dark={dark} onClick={() => setIsOpened(!isOpened)} className={className} >
            <div id={id}>
                <Inner>
                    <Chevron dark={dark} />
                    <div id={`panel-${id}`}>  {isOpened || !bucket ? defaultLabel : bucket} </div>
                </Inner>
                <Panel opened={isOpened}>
                    {links &&
                        links.length &&
                        links.map((link) => (
                            <li onClick={() => onClick(link.slug)} className={  bucket === link.label ? 'active' : '' } > {link.label} </li>
                        ))}
                </Panel>
            </div>
        </StyledDropdown>
    )
}

export default Dropdown
