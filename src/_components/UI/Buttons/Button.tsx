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
    height: ${rem(40)};
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
        position: absolute;
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        text-decoration: none !important;
        justify-content: center;
        color: inherit;
    }

    :hover {
        background: ${({ inverse }) => (inverse ? 'white' : '#1a1a1a')};
        color: ${({ inverse }) => (inverse ? '#1a1a1a' : 'white')};
    }
`

const getElement = (href: string, outsideLink: boolean, children: any) => {
    if (href && !outsideLink) {
        return (
            <Link href={href} passHref>
                <a>
                    <span>{children}</span>
                </a>
                    
            </Link>
        )
    } else if (href && outsideLink) {
        return (
            <a href={href} target="_blank">
                <span>{children}</span>
            </a>
        )
    } else {
        return <span>{children}</span>
    }
}

const Button = ({
    inverse = false,
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
    >
        {/* @ts-ignore */}
        {getElement(href, outsideLink, children)}
    </StyledButton>
)

export default Button
