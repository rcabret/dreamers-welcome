import React from 'react'
import Button from './Button'
import styled from 'styled-components'
import { rem } from 'polished'
import { BREAKPOINTS } from '../../../_constants/brekpoints'

const StyledButtonRow = styled.div`
    ${({ fixedToBottom }: { fixedToBottom: boolean }) =>
        fixedToBottom &&
        `
        position: absolute;
        bottom: ${rem('10px')};
    `}

    button {
        display: inline-block;
        margin-right: ${rem('20px')};
    }

    @media (max-width: ${BREAKPOINTS.MOBILE}) {
        ${({ fixedToBottom }) =>
            fixedToBottom &&
            `
        position: relative;
        bottom: auto;
        margin-top: ${rem('20px')};
    `}

        button {
            width: 100% !important;
            margin-right: 0;
            margin-top: ${rem('14px')};
        }
    }
`

interface ButtonsRowProps {
    links: any
    anchorToBottom?: boolean
    className?: string
}

const ButtonsRow = ({
    anchorToBottom = false,
    className,
    links,
}: ButtonsRowProps) => {
    return (
        <StyledButtonRow fixedToBottom={anchorToBottom} className={className}>
            {links &&
                links.map((link: { title: string; url: string }, i: number) => {
                    const { title, url } = link
                    return (
                        <Button key={Math.random() * i} inverse={false} href={url} >{title}</Button>
                    )
                })}
        </StyledButtonRow>
    )
}

export default ButtonsRow
