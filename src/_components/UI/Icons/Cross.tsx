import { rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

interface IconProps {
    expanded?: boolean
}
const IconSVG = styled.svg`
    stroke: #1a1a1a;
    stroke-width: 1;
    width: ${rem('26px')};
    height: ${rem('26px')};
    transition: 0.5s transform;
    transform: ${({ expanded }: IconProps) =>
        expanded ? 'rotate(45deg)' : 'none'};
`
const Cross = ({ expanded }: IconProps) => (
    <IconSVG expanded={expanded}>
        <svg viewBox="0 0 24 24">
            <polyline points="12 0 12 24" />
            <polyline points="0 12 24 12" />
        </svg>
    </IconSVG>
)

export default Cross
