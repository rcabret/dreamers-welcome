import React, { useEffect, useState } from 'react'
import {
    Backdrop,
    HamburgerWrap,
    Navigation,
    Panel,
    StyledDropdown,
    StyledDWLogo,
    StyledDWLogoType,
} from './styles'
import NavToggle from '../UI/Icons/NavToggle'

const TopNav = ({ bucket }: { bucket?: string }) => {
    const [top, setTop] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            const scrollTop = window.scrollY
            setTop(scrollTop > 100)
        }

        let throttlePause: boolean
        const throttle = (callback: () => void) => {
            //don't run the function if throttlePause is true
            if (throttlePause) return
            throttlePause = true
            //setTimeout runs the callback within the specified time
            setTimeout(() => {
                callback()
                throttlePause = false
            }, 100)
        }

        window.addEventListener('scroll', () => {
            throttle(onScroll)
        })
        return () => {
            window.removeEventListener('scroll', () => {
                throttle(onScroll)
            })
        }
    })

    const [opened, setPanel] = useState(false)

    return (
        <>
            <Navigation active={top}>
                <StyledDWLogo active={top} />
                <StyledDWLogoType active={top} />
                <StyledDropdown opened={opened} active={top}>
                    {bucket}
                </StyledDropdown>
                <HamburgerWrap onClick={() => setPanel(!opened)}>
                    <NavToggle
                        activate={setPanel}
                        opened={opened}
                        active={top}
                    />
                </HamburgerWrap>
                <aside />
            </Navigation>
            <Backdrop opened={opened} />
            <Panel opened={opened} />
        </>
    )
}

export default TopNav
