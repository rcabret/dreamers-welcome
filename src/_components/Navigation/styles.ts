import styled from 'styled-components'
import { rem } from 'polished'
import DWLogoType from '../UI/Icons/DWLogoType'
import DWLogo from '../UI/Icons/DWLogo'

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
    padding: 0 ${rem('30px')};
`

export const Navigation = styled.nav`
    position: fixed;
    top: 0;
    color: ${({ dark, navTheme }: NavigationStyleProps) =>
        dark || navTheme === 'dark' ? 'black' : 'white'};
    height: ${({ active }: NavigationStyleProps) =>
        active ? rem('50px') : rem('100px')};
    z-index: 101;
    width: 100%;
    transition: 0.4s height;

    svg:first-child,
    svg:nth-child(2) {
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
    background: white;
    position: absolute;
    width: 100%;
    height: 100%;
    border-bottom: 1px solid #c1c1c1;
    opacity: ${({ active }: NavigationStyleProps) => (active ? 1 : 0)};
`
export const RightAnchor = styled.div`
    position: absolute;
    right: 0;
    height: 100%;
    width: ${({ opened }: { opened: boolean }) => (opened ? rem(380) : '25vw')};
    top: 0;
    transition: width 0.4s;
`

export const StyledDWLogoType = styled(DWLogoType)`
    display: block;
    margin: 0 auto;
    * {
        fill: ${({ dark }: NavigationStyleProps) => (dark ? 'black' : 'white')};
    }
`
export const StyledDWLogo = styled(DWLogo)`
    position: absolute;

    path {
        fill: ${({ dark }: NavigationStyleProps) => (dark ? 'black' : 'white')};
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
export const StyledDropdown = styled.div`
    position: absolute;
    left: ${rem(40)};
    height: 100%;
    color: ${({ dark }: NavigationStyleProps) => (dark ? 'black' : 'white')};
    display: flex;
    align-items: center;
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
