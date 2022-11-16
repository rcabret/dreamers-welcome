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
    outsideLink?: boolean
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

const getElement = (href: string, outsideLink: boolean, children: any) => {
    if (href && !outsideLink) {
        return <Link href={href}>{children}</Link>
    } else if (href && outsideLink) {
        return (
            <a href={href} target="_blank">
                {children}
            </a>
        )
    } else {
        return <span>{children}</span>
    }
}

const Button = ({
    inverse = false,
    title,
    children,
    href,
    className,
    outsideLink = false,
    onClick = () => {},
}: ButtonProps) => (
    <StyledButton
        inverse={inverse}
        onClick={() => onClick()}
        className={className}
        title={title}
    >
        {/* @ts-ignore */}
        {getElement(href, outsideLink, children)}
    </StyledButton>
)

export default Button
