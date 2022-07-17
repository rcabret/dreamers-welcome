import styled from 'styled-components'
import { rem } from 'polished'

export const ItemWrapper = styled.div`
    border: 1px solid #c1c1c1;
    border-radius: ${rem('10px')};
    overflow: hidden;
    margin: ${rem('10px')};
`

export const Metadata = styled.aside`
    padding: ${rem('10px')} ${rem('14px')} ${rem('10px')} ${rem('14px')};

    h2 {
        margin-top: ${rem('10px')};
        font-size: ${rem('32px')};
        font-weight: 200;
        width: 100%;
    }
`

export const Location = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    height: 100%;

    p {
        opacity: 1;
        font-weight: 400;
        display: inline-block;
        margin-left: ${rem('4px')};
    }
`

export const BottomContainer = styled.div`
    margin-top: ${rem('14px')};
    display: inline-block;
    position: relative;
    width: 100%;

    button {
        float: right;
    }
`
export const TopContainer = styled.div`
    width: 100%;
    display: inline-block;

    p {
        font-weight: 400;
    }

    p:first-child {
        opacity: 0.4;
        display: inline-block;
    }

    .share {
        float: right;
    }
`
