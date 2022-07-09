import styled from 'styled-components'
import { rem } from 'polished'

export const HighlightWrapper = styled.div`
    padding: ${rem('40px')} 0 ${rem('80px')} 0;
    // margin: 0 ${rem('30px')};
    border-top: 1px solid #c1c1c1;
    display: inline-block;
    width: 100%;
`

export const Name = styled.div`
    text-transform: uppercase;
    padding-left: ${rem('30px')};
`

export const HighlightBlurb = styled.div`
    width: 100%;
    margin-top: ${rem('20px')};

    > p {
        margin-left: 25%;
        max-width: ${rem('570px')};
    }
`

export const SliderWrap = styled.div`
    overflow: hidden;
    width: 100%;
    margin-top: ${rem('40px')};

    .swiper {
        overflow: visible;
        width: calc(75% + ${rem('80px')});
        float: right;
        position: relative;
        right: -${rem('80px')};

        .last {
            width: ${rem('80px')};
        }
    }
`
