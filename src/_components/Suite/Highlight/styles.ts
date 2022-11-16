import styled from 'styled-components'
import { rem } from 'polished'
import { BREAKPOINTS } from '../../../_constants/brekpoints'

export const HighlightBlurb = styled.div`
    width: 100%;
    margin-top: ${rem('20px')};
    margin-left: calc(25% + 20px);
    max-width: ${rem('570px')};

    p {
        font-size: ${rem(18)};
    }

    ul {
        padding-left: ${rem(20)};
        margin-top: ${rem(30)};
    }

    @media (max-width: ${BREAKPOINTS.TABLET}) {
        margin-left: 0;
        padding: 0 ${rem(20)};
    }

    @media (max-width: ${BREAKPOINTS.MOBILE}) {
        padding: 0 ${rem(15)};
    }
`

export const SliderWrap = styled.div`
    overflow: hidden;
    width: 100%;
    margin-top: ${rem(30)};

    .swiper {
        overflow: visible;
        margin-left: calc(25% + 20px);
        margin-right: ${rem(30)};
        position: relative;
    }

    .swiper-slide {
        width: auto;
    }

    @media (max-width: ${BREAKPOINTS.TABLET}) {
        .swiper {
            margin-left: ${rem(20)};
        }
    }

    @media (max-width: ${BREAKPOINTS.MOBILE}) {
        .swiper {
            margin-left: ${rem(15)};
        }
    }
`
