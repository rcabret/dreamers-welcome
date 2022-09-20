import React, { useEffect, useState } from 'react'
import {
    Backdrop,
    HamburgerWrap,
    Navigation,
    NavInnerContainer,
    Panel,
    StyledDropdown,
    StyledDWLogo,
    StyledDWLogoType,
} from './styles'
import NavToggle from '../UI/Icons/NavToggle'

const TopNav = ({
    headerData,
    navTheme,
}: {
    headerData?: { bucket: string; property: string }
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
    }, [])

    const [opened, setPanel] = useState(false)

    useEffect(() => {
        if (opened) {
            // @ts-ignore
            document.querySelector('body').style.overflow = 'hidden'
        } else {
            // @ts-ignore
            document.querySelector('body').style.overflow = 'auto'
        }
    }, [opened])

    const showDarkTheme = (navTheme === 'dark' && !opened) || (top && !opened)

    return (
        <>
            <Navigation active={top} navTheme={navTheme} opened={opened}>
                <NavInnerContainer opened={opened}>
                    <StyledDWLogo dark={showDarkTheme} />
                    {!headerData?.property && (
                        <StyledDWLogoType dark={showDarkTheme} />
                    )}
                    <StyledDropdown dark={showDarkTheme}>
                        {headerData?.bucket}
                    </StyledDropdown>
                    <HamburgerWrap onClick={() => setPanel(!opened)}>
                        <NavToggle
                            activate={setPanel}
                            opened={opened}
                            dark={showDarkTheme}
                        />
                    </HamburgerWrap>
                </NavInnerContainer>
                <aside />
                <Backdrop opened={opened} />
            </Navigation>
            <Panel opened={opened} active={false} navTheme="dark" />
        </>
    )
}

export default TopNav
