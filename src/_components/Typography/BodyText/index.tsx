// Body text
// SM = 14px;
// MD = 18px;
// L = 24px;
import React from 'react'
import styled from 'styled-components'
import { rem } from 'polished'
import { BREAKPOINTS } from '../../../_constants/brekpoints'

interface HeaderProps {
    children: any
    className?: string
    size?: 'sm' | 'md' | 'lg'
    bold?: boolean
    uppercase?: boolean
}

const getBodySize = (size: 'sm' | 'md' | 'lg') => {
    switch (size) {
        default:
        case 'sm':
            return rem('14px')
        case 'md':
            return rem('18px')
        case 'lg':
            return rem('24px')
    }
}

const getMobileBodySize = (size: 'sm' | 'md' | 'lg') => {
    switch (size) {
        default:
        case 'sm':
            return rem('12px')
        case 'md':
            return rem('16px')
        case 'lg':
            return rem('18px')
    }
}

interface BodyProps {
    bold?: boolean
    size: 'sm' | 'md' | 'lg'
    uppercase: boolean
}

const BodyStyled = styled.p`
    font-size: ${(props: BodyProps) => getBodySize(props.size)}; // 72px
    font-weight: ${(props: BodyProps) => (props.bold ? 900 : 500)};
    text-transform: ${(props: BodyProps) =>
        props.uppercase ? 'uppercase' : 'none'};

    @media (max-width: ${BREAKPOINTS.TABLET}) {
        font-size: ${(props) => getMobileBodySize(props.size)}; // 72px
    }
`

const BodyText = ({
    children,
    className,
    bold = false,
    size = 'sm',
    uppercase = false,
}: HeaderProps) => (
    <BodyStyled
        className={className}
        bold={bold}
        size={size}
        uppercase={uppercase}
    >
        {children}
    </BodyStyled>
)

export default BodyText
