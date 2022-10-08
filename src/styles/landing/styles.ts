import styled from "styled-components";
import Header from "../../_components/Typography/Header";
import Button from "../../_components/UI/Buttons/Button";
import {rem} from "polished";
import Blurb from "../../_components/UI/Blurb";

export const Circle = styled.div`
    width: 98vw;
    padding-top: 98vw;
    min-width: 1000px;
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
`

export const FlexContainer = styled.div`
    position: absolute;
    top: 0;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: flex-start;
    justify-content: center;
    padding-top: 100px;
    overflow-y: visible;

    * {
        color: black;
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