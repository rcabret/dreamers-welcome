import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { rem } from 'polished'

interface NavigationStyleProps {
    active: boolean
}

const Navigation = styled.nav`
    position: fixed;
    top: 0;
    color: ${({ active }: NavigationStyleProps) =>
        active ? 'black%' : 'white'};
    height: ${rem('50px')};
    z-index: 100;

    padding: 0 ${rem('30px')};
    width: 100%;

    > div {
        float: right;
        display: flex;
        align-items: center;
        height: 100%;
    }

    aside {
        z-index: -1;
        top: 0;
        left: 0;
        transition: 0.3s all;
        background: white;
        position: absolute;
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #c1c1c1;
        opacity: ${({ active }: NavigationStyleProps) => (active ? 1 : 0)};
    }
`
const TopNav = ({ bucket }: { bucket?: string }) => {
    const [top, setTop] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            const scrollTop = window.scrollY
            setTop(scrollTop > 500)
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
    return (
        <Navigation active={top}>
            <div>{bucket}</div>
            <aside />
        </Navigation>
    )
}

export default TopNav
