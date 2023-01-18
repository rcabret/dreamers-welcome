import styled from 'styled-components'
import { Swiper } from 'swiper/react'
import { rem } from 'polished'
import Button from '../Buttons/Button'
import {BREAKPOINTS} from "../../../_constants/brekpoints";

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

export const NavigationWrap = styled.div`
    top: ${rem(-56)};
    right: ${rem(30)};
    position: absolute;

    > div {
        height: ${rem(34)};
        border-radius: 50%;
        width: ${rem(34)};
        background: white;
        float: left;
        margin-left: ${rem(20)};
        cursor: pointer;
        transition: 0.3s;
        position: relative;

        svg {
            position: absolute;
            height: 100%;
            width: 100%;
            stroke-width: 1;
            stroke: #1a1a1a;
            fill: none;
            padding: 8px;
        }
    }

    > div:hover {
        background: #1a1a1a;
        svg {
            left: ${rem(1)};
            stroke: white;
        }
    }

    > div:first-child {
        svg {
            left: ${rem(-1)};
            transform: rotate(180deg);
        }
    }
  
  
   @media(max-width: ${BREAKPOINTS.MOBILE}) {
     top: ${rem(-46)};
     right: ${rem(20)};
   }
`

export const ImageSliderWrapper = styled.div`
    position: relative;
    border-radius: ${rem(10)};
    overflow: hidden;

    .swiper-pagination {
        position: absolute;
        display: flex;
        width: 100%;
        justify-content: center;
        z-index: 1;
        bottom: ${rem(30)};
    }

    .swiper-pagination-bullet {
        width: ${rem(13)};
        height: ${rem(13)};
        border-radius: 50%;
        border: 1px solid white;
        margin: 0 ${rem(6)};
    }

    .swiper-pagination-bullet-active {
        background: white;
    }
`

export const SeeAllButton = styled(Button)`
    position: absolute;
    bottom: ${rem(20)};
    left: ${rem(20)};
    z-index: 1;
    margin-left: 0;
    border: none;

    :hover {
        background: rgba(255, 255, 255, 0.7);
        color: #1a1a1a;
    }
`
