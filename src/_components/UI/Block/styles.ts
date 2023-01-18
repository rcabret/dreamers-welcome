import styled, { css } from 'styled-components'
import { rem } from 'polished'
import { show } from 'dom7'
import { BREAKPOINTS } from '../../../_constants/brekpoints'
import Link from 'next/link'

export const BlockWrapper = styled.div`
    display: inline-block;
    width: 100%;
    position: relative;
    padding-top: ${rem(40)};

    padding-bottom: ${({ noPaddingBottom }: { noPaddingBottom?: boolean }) =>
        noPaddingBottom ? rem(40) : rem(80)};

    .separator {
        height: 1px;
        background-color: #c1c1c1;
        width: calc(100% - ${rem(60)});
        left: ${rem(30)};
        position: absolute;
        top: 0;
    }

    @media (max-width: ${BREAKPOINTS.TABLET}) {
        .separator {
            width: calc(100% - ${rem(40)});
            left: ${rem(20)};
        }
    }

    @media (max-width: ${BREAKPOINTS.MOBILE}) {
        .separator {
            width: 100%;
            left: 0;
        }
    }
`

export const Title = styled.div`
    padding: 0 ${rem(30)};
    display: inline-block;
    width: 100%;

    h4 {
        float: left;
    }

    a {
        color: #c1c1c1;
        float: right;
    }

    a:hover {
        text-decoration: underline;
    }

    ${({ fullWidth }: { fullWidth?: boolean }) =>
        fullWidth
            ? css`
                  width: 100%;
              `
            : css`
                  width: 25%;
                  float: left;
              `};

    @media (max-width: ${BREAKPOINTS.TABLET}) {
        width: 100%;
        display: block;
        float: none;
        padding: 0 ${rem(20)};
        margin-bottom: ${rem(40)};

        h4 {
            font-weight: 700;
        }
    }

    @media (max-width: ${BREAKPOINTS.MOBILE}) {
        padding: 0 ${rem(15)};
    }
`

interface BI {
    showOverflow?: boolean
    fullWidth?: boolean
}

export const BlockContent = styled.div`
    overflow: visible;
    position: relative;
    padding: ${({ showOverflow }: BI) => (showOverflow ? '0' : `0 ${rem(30)}`)};
    
    ${({ fullWidth }: BI) =>
        fullWidth
            ? css`
                  width: 100%;
              `
            : css`
                  margin-left: 25%;
                  width: 75%;
              `}
    }
    
    @media(max-width: ${BREAKPOINTS.TABLET}) {
        width: 100%;
        margin-left: 0;
        padding: ${({ showOverflow }: BI) =>
            showOverflow ? '0' : `0 ${rem(20)}`};

    }

    @media(max-width: ${BREAKPOINTS.TABLET}) {
        padding: ${({ showOverflow }: BI) =>
            showOverflow ? '0' : `0 ${rem(15)}`};
        padding-top: ${rem(20)};

    }
`
