import React, { useContext, useEffect, useState } from 'react'
import {
    Backdrop,
    HamburgerWrap,
    MenuBg,
    Navigation,
    NavInnerContainer,
    RightAnchor,
    StyledByDWLogo,
    StyledDWLogo,
    StyledDWLogoType,
    StyledProperty,
    NavbarDropdown,
} from './styles'
import NavToggle from '../UI/Icons/NavToggle'
import MenuPanel from './MenuPanel'
import Header from '../Typography/Header'
import { throttle } from '../../_utils/Throttle'
import Link from 'next/link'
import Dropdown from '../UI/Dropdown'
import { bucketLinks } from '../../_constants/links'
import { viewportContext } from '../../_utils/ViewportProvider'

const TopNav = ({ headerData, navTheme }: any) => {
    const [top, setTop] = useState(false)
    const [opened, setPanel] = useState(false)
    const [showDarkTheme, setTheme] = useState(
        (navTheme === 'dark' && !opened) || (top && !opened)
    )

    const breakpoint = useContext(viewportContext)

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
                        <StyledProperty active={top} dark={showDarkTheme}>
                            <Header uppercase size={3}>
                                {headerData?.property}
                            </Header>
                            <StyledByDWLogo active={top} dark={showDarkTheme} />
                        </StyledProperty>
                    )}
                </NavInnerContainer>
                <MenuBg active={top && !headerData?.simpleNav} />
                <Backdrop opened={opened} onClick={() => setPanel(false)} />
            </Navigation>
            <RightAnchor opened={opened}>
                {breakpoint === 'desktop' && (
                    <NavbarDropdown
                        bucket={headerData?.bucket}
                        dark={showDarkTheme || opened}
                        id="topnav-drop"
                        links={bucketLinks}
                        defaultLabel="CHOOSE DESTINATION"
                    />
                )}

                <HamburgerWrap onClick={() => setPanel(!opened)}>
                    <NavToggle
                        activate={setPanel}
                        opened={opened}
                        dark={showDarkTheme || opened}
                    />
                </HamburgerWrap>
            </RightAnchor>
            <MenuPanel
                opened={opened}
                activeBucket={headerData?.bucket}
                onClose={setPanel}
            />
        </>
    )
}

export default TopNav
