import React, { useEffect, useState } from 'react'
import { Inner, Panel, StyledDropdown, StyledSelect } from './styles'
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
        console.log(router);
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

        return () => {
            document.removeEventListener('click', click)
        }
    }, [])

    /* return (
        <StyledSelect>
            <option disabled selected>
                {defaultLabel}
            </option>
            {links &&
                links.length &&
                links.map((link) => {
                    return <option>{link.label}</option>
                })}
        </StyledSelect>
    )*/

    return (
        <StyledDropdown
            dark={dark}
            onClick={() => setIsOpened(!isOpened)}
            className={className}
        >
            <div id={id}>
                <Inner>
                    <div id={`panel-${id}`}>
                        {isOpened || !bucket ? defaultLabel : bucket}
                    </div>
                    <Panel opened={isOpened}>
                        {links &&
                            links.length &&
                            links.map((link) => (
                                <li
                                    onClick={() => onClick(link.slug)}
                                    className={
                                        bucket === link.label ? 'active' : ''
                                    }
                                >
                                    {link.label}
                                </li>
                            ))}
                    </Panel>
                </Inner>
                <Chevron dark={dark} />
            </div>
        </StyledDropdown>
    )
}

export default Dropdown
