import React, { useEffect, useState } from 'react'
import {
    Backdrop,
    HamburgerWrap,
    Navigation,
    Panel,
    PanelDropdown,
    PanelNavigation,
    StyledDropdown,
    StyledDWLogo,
    StyledDWLogoType,
} from './styles'
import NavToggle from '../UI/Icons/NavToggle'

const TopNav = ({
    bucket,
    navTheme,
}: {
    bucket?: string
    navTheme?: string
}) => {
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

    useEffect(() => {
        if (opened) {
            // @ts-ignore
            document.querySelector(
                '#top_nav'
            ).style.width = `calc(100% - 300px)`
            document.querySelector('body').style.overflow = 'hidden'
        } else {
            // @ts-ignore
            document.querySelector('#top_nav').style.width = `calc(100%)`
            document.querySelector('body').style.overflow = 'auto'
        }
    }, [opened])
    return (
        <>
            <Navigation active={top} navTheme={navTheme} opened={opened}>
                <div className="inner_wrap" id="top_nav">
                    <StyledDWLogo dark={top && !opened} />
                    <StyledDWLogoType dark={top && !opened} />
                    <StyledDropdown dark={top && !opened}>
                        {bucket}
                    </StyledDropdown>
                    <HamburgerWrap onClick={() => setPanel(!opened)}>
                        <NavToggle
                            activate={setPanel}
                            opened={opened}
                            dark={(top && !opened) || navTheme === 'dark'}
                        />
                    </HamburgerWrap>
                </div>
                <aside />
                <Backdrop opened={opened} />
            </Navigation>
            <Panel opened={opened} active={false} navTheme="dark" />
        </>
    )
}

export default TopNav
