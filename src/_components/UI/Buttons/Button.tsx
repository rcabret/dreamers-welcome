import React from 'react'
import styled from 'styled-components'
import { rem } from 'polished'
import Link from 'next/link'

interface ButtonProps {
    inverse?: boolean
    children?: Element | string
    right?: boolean
    href?: string
    onClick?: Function
    title?: string
    className?: string
}

const StyledButton = styled.button`
    box-shadow: none;
    outline: none;
    padding: ${rem('8px')} ${rem('18px')};
    border-radius: 30px;
    background: ${({ inverse }: ButtonProps) =>
        inverse ? '#1a1a1a' : 'white'};
    color: ${({ inverse }) => (inverse ? 'white' : '#1a1a1a')};
    text-transform: uppercase;
    border: 1px solid #1a1a1a;
    font-size: ${rem('16px')};
    text-align: center;
    margin-left: ${rem('10px')};
    float: ${({ right }) => (right ? 'right' : 'none')};
    transition: all 0.3s;
    cursor: pointer;
    position: relative;
    min-width: ${rem('160px')};

    a,
    span {
        text-decoration: none !important;
        color: inherit;
    }

    :hover {
        background: ${({ inverse }) => (inverse ? 'white' : '#1a1a1a')};
        color: ${({ inverse }) => (inverse ? '#1a1a1a' : 'white')};
    }
`

const Button = ({
    inverse = false,
    title,
    children,
    href,
    className,
    onClick = () => {},
}: ButtonProps) => (
    <StyledButton
        inverse={inverse}
        onClick={() => onClick()}
        className={className}
        title={title}
    >
        {/* @ts-ignore */}
        {href ? <Link href={href}>{children}</Link> : <span>{children}</span>}
    </StyledButton>
)

export default Button
