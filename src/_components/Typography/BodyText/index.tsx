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
    size?: 'sm' | 'md' | 'lg' | 'xlg'
    bold?: boolean
    uppercase?: boolean
}

const getBodySize = (size: HeaderProps['size']) => {
    switch (size) {
        default:
        case 'sm':
            return rem('14px')
        case 'md':
            return rem('18px')
        case 'lg':
            return rem('24px')
        case 'xlg':
            return rem('40px')
    }
}

const getMobileBodySize = (size: HeaderProps['size']) => {
    switch (size) {
        default:
        case 'sm':
            return rem('14px')
        case 'md':
            return rem('16px')
        case 'lg':
            return rem('18px')
        case 'xlg':
            return rem('22px')
    }
}

interface BodyProps {
    bold?: boolean
    size: HeaderProps['size']
    uppercase: boolean
}

const BodyStyled = styled.p`
    font-size: ${(props: BodyProps) => getBodySize(props.size)}; // 72px
    font-weight: ${(props: BodyProps) => (props.bold ? 900 : 400)};
    line-height: 1.3;
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
