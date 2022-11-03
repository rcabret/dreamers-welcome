import styled, { keyframes } from 'styled-components'
import { rem } from 'polished'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

export const LightBoxContainer = styled.div`
    z-index: 1000;
    position: fixed;
    width: 100%;
    height: 100%;
    opacity: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    animation: ${fadeIn} forwards 0.3s;
    overflow: scroll;
`
export const ImageBox = styled.div`
    margin-top: ${rem(40)};
    padding: ${rem(30)};
`

export const CloseX = styled.div`
    position: fixed;
    z-index: 100;
    top: 0;
    right: ${rem(10)};
    padding: ${rem('30px')};
    cursor: pointer;

    svg {
        stroke: #1a1a1a;
        stroke-width: 3;
        width: ${rem('22px')};
    }
`
