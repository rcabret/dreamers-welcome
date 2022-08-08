import { rem } from 'polished'
import styled from 'styled-components'
import { BREAKPOINTS } from '../../../_constants/brekpoints'

export interface HeaderStyleProps {
    bold: boolean
    uppercase: boolean
    responsive: boolean
}

export const H1Styled = styled.h1.attrs({ lan: 'en' })`
    font-size: ${({ responsive }: HeaderStyleProps) =>
        responsive ? '4vw' : rem('60px')} !important; // 60px
    line-height: 1;
    font-weight: ${(props) => (props.bold ? 900 : 500)};
    text-transform: ${(props) => (props.uppercase ? 'uppercase' : 'none')};
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
    margin: 0;

    @media (max-width: ${BREAKPOINTS.TABLET}) {
        font-size: ${({ responsive }) =>
            responsive ? '9.5vw' : rem('48px')} !important;
    }
`

export const H2Styled = styled.h2`
    font-size: ${({ responsive }: HeaderStyleProps) => (responsive ? '3.5vw' : rem('48px'))};
    line-height: 1;
    font-weight: ${(props) => (props.bold ? 900 : 500)};
    text-transform: ${(props) => (props.uppercase ? 'uppercase' : 'none')};

    @media (max-width: ${BREAKPOINTS.TABLET}) {
    }
    @media (max-width: ${BREAKPOINTS.MOBILE}) {
        font-size: ${rem('28px')};
    }
`

export const H3Styled = styled.h3`
    font-size: ${({ responsive }: HeaderStyleProps) => (responsive ? '1.8vw' : rem('24px'))};
    line-height: 1;
    font-weight: ${(props) => (props.bold ? 900 : 500)};
    text-transform: ${(props) => (props.uppercase ? 'uppercase' : 'none')};

    @media (max-width: ${BREAKPOINTS.TABLET}) {
    }
    @media (max-width: ${BREAKPOINTS.MOBILE}) {
        font-size: ${rem('20px')};
    }
`

export const H4Styled = styled.h4`
    font-size: ${({ responsive }: HeaderStyleProps) => (responsive ? '1.45vw' : rem('18px'))};
    font-weight: ${(props) => (props.bold ? 900 : 500)};
    text-transform: ${(props) => (props.uppercase ? 'uppercase' : 'none')};

    @media (max-width: ${BREAKPOINTS.TABLET}) {
    }
    @media (max-width: ${BREAKPOINTS.MOBILE}) {
    }
`

export const H5Styled = styled.h5`
    font-size: ${rem('18px')}; // 16px;
    font-weight: ${(props: HeaderStyleProps) => (props.bold ? 900 : 500)};
    text-transform: ${(props) => (props.uppercase ? 'uppercase' : 'none')};

    @media (max-width: ${BREAKPOINTS.TABLET}) {
    }
    @media (max-width: ${BREAKPOINTS.MOBILE}) {
    }
`

export const H6Styled = styled.h6`
    font-size: ${rem('14px')}; // 14px;
    font-weight: ${(props : HeaderStyleProps) => (props.bold ? 900 : 500)};
    text-transform: ${(props) => (props.uppercase ? 'uppercase' : 'none')};

    @media (max-width: ${BREAKPOINTS.TABLET}) {
    }
    @media (max-width: ${BREAKPOINTS.MOBILE}) {
    }
`
