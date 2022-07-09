import { rem } from 'polished'
import styled from 'styled-components'
import { Swiper } from 'swiper/react'


export const StyledSwiper = styled(Swiper)`
    border-radius: 10px;
`

export const CaptionWrapper = styled.div`
    display: inline-block;
    width: 100%;
    margin-top: ${rem('10px')};

    p {
        width: calc(100% - ${rem('60px')});
        float: left;
    }

    span {
        float: right;
        width: ${rem('40px')};
        text-align: right;
    }
`
