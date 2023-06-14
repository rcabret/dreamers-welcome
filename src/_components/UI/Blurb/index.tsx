import React, { ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { rem } from 'polished'
import Header from '../../Typography/Header'
import { BREAKPOINTS } from '../../../_constants/brekpoints'
import MarkdownModule from '../../Typography/MarkdownModule'
//import Breadcrumbs from 'nextjs-breadcrumbs';
const BlurbWrap = styled.div`
    min-height: ${rem('550px')};
    font-size: ${rem('70px')};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${rem(80)} ${rem('30px')};
    text-align: center;
    position: relative;

    ${({ fullHeight }: { fullHeight?: boolean }) =>
        fullHeight &&
        css`
            height: 100vh;
        `}

    > div {
        max-width: 1100px;
    }

    .separator {
        margin: 0 30px;
        height: 1px;
        background-color: #c1c1c1;
        width: calc(100% - 60px);
        position: absolute;
        top: 0;
    }

    @media (max-width: ${BREAKPOINTS.TABLET}) {
        h1 {
            font-size: ${rem(42)};
        }
    }

    @media (max-width: ${BREAKPOINTS.MOBILE}) {
        min-height: auto;

        h1 {
            font-size: ${rem(38)};
        }

        .separator {
            margin: 0;
            width: 100%;
        }
    }
`

const StyledHeader = styled(Header)`
    margin-bottom: ${rem('60px')};
    text-align: center;
`
const StyledMarkdown = styled(MarkdownModule)`
    line-height: 1;

    p {
        width: 100%;
        max-width: 100%;
        font-size: ${rem(60)};
        padding-right: 0;
    }

    @media (max-width: ${BREAKPOINTS.TABLET}) {
        p {
            font-size: ${({ responsive }: any) =>
                responsive ? '9.5vw' : rem(42)};
        }
    }

    @media (max-width: ${BREAKPOINTS.MOBILE}) {
        p {
            font-size: ${({ responsive }: any) =>
                responsive ? '9.5vw' : rem(28)};
        }
    }
`
const Blurb = ({
    text,
    borderTop,
    eyebrow,
    fullHeight,
    children,
    className,
}: {
    text: string
    borderTop?: boolean
    eyebrow?: string
    fullHeight?: boolean
    children?: ReactNode
    className?: string
}) => {
    return (
        <BlurbWrap fullHeight={fullHeight} className={className}>
            {borderTop && <figure className="separator" />}
            <div>
                {eyebrow && (
                    <StyledHeader size={4} uppercase>
                        {eyebrow}
                        {/* <nav className={'breadcrumbs'} aria-label="breadcrumbs"><ol className={'_2jvtI'}><li><a href="/">Home  </a></li><li>{'>'}</li><li>{eyebrow}</li></ol></nav> */}
                    </StyledHeader>
                )}
                <StyledMarkdown data={text} />
                {children && children}
            </div>
        </BlurbWrap>
    )
}

export default Blurb
