import styled, { keyframes } from 'styled-components'
import { rem } from 'polished'

interface NavigationStyleProps {
    dark?: boolean
    active?: boolean
    opened?: boolean
    navTheme?: string
    collapse?: boolean
}

export const Panel = styled.div`
    position: fixed;
    right: ${({ opened }: NavigationStyleProps) => (opened ? 0 : '-500px')};
    width: ${rem('380px')};
    padding: ${rem(40)};
    height: 100vh;
    z-index: 99;
    top: 0;
    transition: 0.5s right cubic-bezier(0.65, 0, 0.35, 1);
    background: white;
    color: black;

    ul {
        margin-top: ${rem(100)};
        list-style: none;
        font-size: ${rem(40)};
        position: relative;
        top: 10vh;

        li {
            margin-bottom: ${rem(4)};
        }
    }

    .anchorSection {
        position: absolute;
        border-top: 1px solid #c1c1c1;
        max-height: ${rem(340)};
        min-height: ${rem(200)};
        height: 35vh;
        bottom: 0;
        width: calc(100% - ${rem(80)});

        ul {
            list-style: none;
            font-size: ${rem(18)};
            margin-top: 0;
            padding-top: ${rem(10)};
            top: auto;

            li {
                margin-bottom: ${rem(6)};
            }
        }

        button {
            position: absolute;
            bottom: ${rem(30)};
            margin: 0;
        }
    }
`

const blurFadeIn = keyframes`
    0% {
        opacity: 0;
        transform:  translate3d(60px, 0, 0);
    }
    100% {
        opacity: 1;
        transform: translate3d(0px, 0, 0);
    }
`

export const MainList = styled.ul`
    li {
        opacity: 0;
    }

    .active {
        animation: ${blurFadeIn} 0.5s cubic-bezier(0.65, 0, 0.35, 1) forwards;
    }
`
