import styled from 'styled-components'
import { rem } from 'polished'

export const HighlightBlurb = styled.div`
    width: 100%;
    margin-top: ${rem('20px')};

    > p {
        margin-left: calc(25% + 20px);
        max-width: ${rem('570px')};
    }
`

export const SliderWrap = styled.div`
    overflow: hidden;
    width: 100%;
    margin-top: ${rem('40px')};

    .swiper {
        overflow: visible;
        margin-left: calc(25% + 20px);
        margin-right: ${rem(20)};
        position: relative;
    }

    .swiper-slide {
        width: auto;
    }
  
`
