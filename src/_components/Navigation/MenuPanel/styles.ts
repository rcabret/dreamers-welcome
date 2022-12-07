import styled, { keyframes } from 'styled-components'
import { rem } from 'polished'
import { BREAKPOINTS } from '../../../_constants/brekpoints'
import Dropdown from '../../UI/Dropdown'

interface NavigationStyleProps {
    dark?: boolean
    active?: boolean
    opened?: boolean
    navTheme?: string
    collapse?: boolean
}

export const Panel = styled.div`
    position: fixed;
    right: ${({ opened }: NavigationStyleProps) => (opened ? 0 : rem(-440))};
    width: ${rem(440)};
    height: 100vh;
    z-index: 200;
    top: 0;
    transition: 0.5s right cubic-bezier(0.65, 0, 0.35, 1);
    background: white;
    color: #1a1a1a;
    overflow-y: scroll;

    > div {
        padding: ${rem(40)};
        height: 100%;
        min-height: 700px;
        position: relative;
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

    @media (max-width: ${BREAKPOINTS.MOBILE}) {
        width: 100%;
        right: ${({ opened }: NavigationStyleProps) => (opened ? 0 : '-100%')};
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
    margin-top: ${rem(100)};
    list-style: none;
    font-size: ${rem(40)};
    position: relative;
    top: 10vh;

    li {
        opacity: 0;
        position: relative;
        margin-bottom: ${rem(4)};

        aside {
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.85);
            z-index: 1;
            top: 0;
        }
    }

    .active {
        animation: ${blurFadeIn} 0.5s cubic-bezier(0.65, 0, 0.35, 1) forwards;
    }
`

export const DropdownWrapper = styled.div`
    height: ${rem(65)};
    position: absolute;
    top: 0;
`
