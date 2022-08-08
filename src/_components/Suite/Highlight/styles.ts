import styled from 'styled-components'
import { rem } from 'polished'

export const HighlightWrapper = styled.div`
    padding: ${rem('40px')} 0 ${rem('80px')} 0;
    // margin: 0 ${rem('30px')};
    display: inline-block;
    width: calc(100%);
    position: relative;

    .separator {
        margin: 0 30px;
        height: 1px;
        background-color: #c1c1c1;
        width: calc(100% - 60px);
        position: absolute;
        top: 0;
    }
`

export const Name = styled.div`
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
        margin-left: 25%;
        width: 45%;
        position: relative;

        .last {
            width: ${rem('80px')};
        }
    }
`
