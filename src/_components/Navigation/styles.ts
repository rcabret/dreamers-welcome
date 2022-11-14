import styled, { css } from 'styled-components'
import { rem } from 'polished'
import DWLogoType from '../UI/Icons/DWLogoType'
import DWLogo from '../UI/Icons/DWLogo'
import ByDw from '../UI/Icons/ByDw'
import { BREAKPOINTS } from '../../_constants/brekpoints'

interface NavigationStyleProps {
    dark?: boolean
    active?: boolean
    opened?: boolean
    navTheme?: string
    collapse?: boolean
}

export const NavInnerContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 100;
    padding: 0 ${rem(30)};

    @media (max-width: ${BREAKPOINTS.TABLET}) {
        padding: 0 ${rem(20)};
    }
    @media (max-width: ${BREAKPOINTS.MOBILE}) {
        padding: 0 ${rem(15)};
    }
`

export const Navigation = styled.nav`
    position: fixed;
    top: 0;
    color: ${({ dark, navTheme }: NavigationStyleProps) =>
        dark || navTheme === 'dark' ? '#1a1a1a' : 'white'};
    height: ${rem(65)};
    z-index: 101;
    width: 100%;
    transition: 0.4s height;

    > svg:first-child,
    > svg:nth-child(2) {
        transform: ${({ active }: NavigationStyleProps) =>
            active ? 'scale(0.85)' : 'scale(1)'};
        transition: 0.3s transform;
    }
`

export const MenuBg = styled.aside`
    z-index: -1;
    top: 0;
    left: 0;
    transition: 0.3s all;
    position: absolute;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(14px);
    background: rgba(255, 255, 255, 0.6);
    opacity: ${({ active }: NavigationStyleProps) => (active ? 1 : 0)};
`
export const RightAnchor = styled.div`
    position: absolute;
    right: 0;
    height: 100%;
    width: ${({ opened }: { opened: boolean }) => (opened ? rem(440) : '35vw')};
    top: 0;
    transition: width 0.5s cubic-bezier(0.65, 0, 0.35, 1);

    @media (max-width: ${BREAKPOINTS.TABLET}) {
        width: ${({ opened }: { opened: boolean }) =>
            opened ? rem(440) : rem(0)};
    }

    @media (max-width: ${BREAKPOINTS.MOBILE}) {
        width: ${({ opened }: { opened: boolean }) =>
            opened ? '100%' : rem(0)};
    }
`

export const StyledDWLogoType = styled(DWLogoType)`
    display: block;
    position: relative;
    top: ${rem(-3)};
    margin: 0 auto;
    * {
        fill: ${({ dark }: NavigationStyleProps) =>
            dark ? '#1a1a1a' : 'white'};
    }
`
export const StyledDWLogo = styled(DWLogo)`
    position: absolute;

    * {
        fill: ${({ dark }: NavigationStyleProps) =>
            dark ? '#1a1a1a' : 'white'};
    }
`
export const StyledByDWLogo = styled(ByDw)`
    margin-left: ${({ active }: NavigationStyleProps) =>
        active ? rem(12) : rem(20)};

    path {
        fill: ${({ dark }: NavigationStyleProps) =>
            dark ? '#1a1a1a' : 'white'};
    }
`

export const Backdrop = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -1;
    top: 0;
    visibility: ${({ opened }: NavigationStyleProps) =>
        opened ? 'visible' : 'hidden'};
    background: ${({ opened }: NavigationStyleProps) =>
        opened ? 'rgba(0, 0, 0, 0.8)' : 'none'};
    transition: 0.5s all;
`

export const HamburgerWrap = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    right: 30px;
    height: 100%;
    cursor: pointer;
`

export const StyledProperty = styled.div`
    height: 100%;
    display: flex;
    left: 0;
    width: 100%;
    align-items: center;
    justify-content: center;

    h3 {
        transition: 0.3s font-size;
        font-size: ${rem(20)};
        ${({ active }: NavigationStyleProps) =>
            active &&
            css`
                color: #1a1a1a !important;
            `};

        ${({ dark }: NavigationStyleProps) =>
            !dark &&
            css`
                color: white !important;
            `};
    }
`
