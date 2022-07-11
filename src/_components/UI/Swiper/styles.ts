import { rem } from 'polished'
import styled from 'styled-components'
import { Swiper } from 'swiper/react'

export const StyledSwiper = styled(Swiper)`
    .swiper-button-next {
        content: none;
        width: 100%;
        height: 100%;
        top: 0;
        z-index: 100;
        position: absolute;
        cursor: pointer;
    }

    .swiper-button-prev {
        display: none;
    }
`
export const Spacer = styled.div`
    height: 100%;
    width: ${rem('80px')};
`
