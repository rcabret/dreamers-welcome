import React, { useEffect, useState } from 'react'
import {
    Backdrop,
    HamburgerWrap,
    MenuBg,
    Navigation,
    NavInnerContainer,
    RightAnchor,
    StyledDropdown,
    StyledDWLogo,
    StyledDWLogoType,
    StyledProperty,
} from './styles'
import NavToggle from '../UI/Icons/NavToggle'
import MenuPanel from './MenuPanel'
import Header from '../Typography/Header'
import { throttle } from '../../_utils/Throttle'
import Link from 'next/link'

const TopNav = ({
    headerData,
    navTheme,
}: {
    headerData?: { bucket: string; property: string; simpleNav?: boolean }
    navTheme?: string
}) => {
    const [top, setTop] = useState(false)
    const [opened, setPanel] = useState(false)
    const [showDarkTheme, setTheme] = useState(
        (navTheme === 'dark' && !opened) || (top && !opened)
    )
    useEffect(() => {
        const onScroll = () => {
            const scrollTop = window.scrollY
            setTop(scrollTop > 100)
        }

        window.addEventListener('scroll', () => {
            throttle(onScroll)()
        })
        return () => {
            window.removeEventListener('scroll', () => {
                throttle(onScroll)()
            })
        }
    }, [])

    useEffect(() => {
        if (opened) {
            // @ts-ignore
            document.querySelector('body').style.overflow = 'hidden'
        } else {
            // @ts-ignore
            document.querySelector('body').style.overflow = 'auto'
        }
    }, [opened])

    useEffect(() => {
        setTheme((navTheme === 'dark' && !opened) || (top && !opened))
    }, [navTheme, opened, top])

    useEffect(() => {
        if (headerData && headerData?.simpleNav === undefined) {
            headerData.simpleNav = false
        }
    }, [headerData])

    return (
        <>
            <Navigation active={top} navTheme={navTheme} opened={opened}>
                <NavInnerContainer>
                    <Link href={'/'} passHref>
                        <a>
                            <StyledDWLogo dark={showDarkTheme} />
                        </a>
                    </Link>
                    {!headerData?.property ? (
                        <StyledDWLogoType dark={showDarkTheme} />
                    ) : (
                        <StyledProperty active={top}>
                            <Header uppercase size={3}>
                                {headerData?.property}
                            </Header>
                        </StyledProperty>
                    )}
                    <RightAnchor opened={opened}>
                        <StyledDropdown dark={showDarkTheme || opened}>
                            {headerData?.bucket}
                        </StyledDropdown>
                        <HamburgerWrap onClick={() => setPanel(!opened)}>
                            <NavToggle
                                activate={setPanel}
                                opened={opened}
                                dark={showDarkTheme || opened}
                            />
                        </HamburgerWrap>
                    </RightAnchor>
                </NavInnerContainer>
                <MenuPanel
                    opened={opened}
                    activeBucket={headerData?.bucket}
                    onClose={setPanel}
                />
                <MenuBg active={top && !headerData?.simpleNav} />
                <Backdrop opened={opened} onClick={() => setPanel(false)} />
            </Navigation>
        </>
    )
}

export default TopNav
