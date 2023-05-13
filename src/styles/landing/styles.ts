import styled from 'styled-components'
import Header from '../../_components/Typography/Header'
import Button from '../../_components/UI/Buttons/Button'
import { rem } from 'polished'
import Blurb from '../../_components/UI/Blurb'
import { BREAKPOINTS } from '../../_constants/brekpoints'

export const Circle = styled.div`
    width: 98vw;
    padding-top: 98vw;
    min-width: 1200px;
    min-height: 1000px;
    border-radius: 50%;
    position: absolute;
    overflow: hidden;

    div {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
    }

    div:first-child {
        background: rgb(255, 255, 255);
        background: linear-gradient(
            0deg,
            rgba(255, 255, 255, 1) 0%,
            rgba(240, 208, 170, 1) 67%,
            rgba(204, 164, 117, 1) 100%
        );
    }

    #inner {
        background: white;
    }

    @media (max-width: ${BREAKPOINTS.MOBILE}) {
        bottom: ${rem(-380)};
    }
`

export const FlexContainer = styled.div`
    position: absolute;
    top: 0;
    display: flex;
    width: 100%;
    height: 100vh;
    align-items: flex-start;
    justify-content: center;
    padding-top: 100px;
    overflow: hidden;
    min-height: 700px;
    //max-height: 960px;

    * {
        color: #1a1a1a;
    }

    @media (max-width: ${BREAKPOINTS.MOBILE}) {
    }
`
export const StyledHeader = styled(Header)`
    text-align: center;
    font-size: 8.8vw !important;
    letter-spacing: 4px;
`

export const StyledButton = styled(Button)`
    margin-top: ${rem(80)};
    margin-left: 0;
`

export const StyledBlurb = styled(Blurb)`
    min-height: ${rem(750)} !important;
`

export const ContentWrap = styled.div`
    position: relative;
    background: rgb(255, 255, 255);
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(240, 208, 170, 0.6) 100%
    );

    #innerMain {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        opacity: 1;
    }
`

export const BottomAnchor = styled.div`
    position: absolute;
    cursor: pointer;
    bottom: ${rem(20)};
    z-index: 10;

    h3 {
        text-align: center;
        line-height: 1.3;
        margin-bottom: ${rem(80)};
    }

    button {
        background: none;
        border: none;
        width: 100%;
        cursor: pointer;

        svg {
            stroke: #1a1a1a;
            width: 100%;
            height: ${rem(40)};
            fill: none;
        }
    }
`
