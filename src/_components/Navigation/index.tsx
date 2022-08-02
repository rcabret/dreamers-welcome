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
            document.querySelector('#main').style.width = `calc(100% - 400px)`
            // @ts-ignore
            document.querySelector(
                '#top_nav'
            ).style.width = `calc(100% - 400px)`
        } else {
            // @ts-ignore
            document.querySelector('#main').style.width = `calc(100%)`
            // @ts-ignore
            document.querySelector('#top_nav').style.width = `calc(100%)`
        }
    }, [opened])
    return (
        <>
            <Navigation active={top} navTheme={navTheme} id="top_nav">
                <StyledDWLogo dark={top} />
                <StyledDWLogoType dark={top} />
                <StyledDropdown dark={top}>{bucket}</StyledDropdown>
                <HamburgerWrap onClick={() => setPanel(!opened)}>
                    <NavToggle
                        activate={setPanel}
                        opened={opened}
                        dark={top || navTheme === 'dark'}
                    />
                </HamburgerWrap>
                <aside />
            </Navigation>
            {/*
            <Backdrop opened={opened} />
*/}
            <Panel opened={opened}>
                <PanelNavigation active={false} navTheme="dark">
                    {/* <PanelDropdown dark>{bucket}</PanelDropdown>
                    <HamburgerWrap onClick={() => setPanel(!opened)}>
                        <NavToggle activate={setPanel} opened={opened} dark />
                    </HamburgerWrap>*/}
                </PanelNavigation>
            </Panel>
        </>
    )
}

export default TopNav
