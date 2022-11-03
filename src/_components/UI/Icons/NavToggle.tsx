import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

interface NavTProps {
    dark: boolean
    opened: boolean
    activate?: Dispatch<SetStateAction<boolean>>
}
const StyledSVG = styled.svg`
    height: 40px;
    width: 40px;

    polyline {
        transition: 0.4s transform;
        stroke-width: 1;
        stroke: ${({ dark, opened }: NavTProps) =>
            dark ? '#1a1a1a' : 'white'};
    }

    polyline:first-child {
        transform: ${({ opened }: NavTProps) =>
            opened ? 'rotate(45deg) translate3d(10px, -15px, 0)' : 'rotate(0)'};
    }

    polyline:last-child {
        transform: ${({ opened }: NavTProps) =>
            opened ? 'rotate(-45deg) translate3d(-19px, 4px, 0)' : 'rotate(0)'};
    }
`

const NavToggle = ({ opened, dark }: NavTProps) => (
    <StyledSVG
        id="nav_toggle"
        opened={opened}
        dark={dark}
        viewBox="0 0 40 40"
    >
        <polyline points="5,14 35,14" />
        <polyline points="5,26 35,26" />
    </StyledSVG>
)

export default NavToggle
