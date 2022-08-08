import styled from 'styled-components'
import { rem } from 'polished'

export const BlockWrapper = styled.div`
    padding: ${rem('40px')} ${rem('30px')} ${rem('80px')} ${rem('30px')};
    display: inline-block;
    width: calc(100%);
    position: relative;

    .separator {
        height: 1px;
        background-color: #c1c1c1;
        width: calc(100% - 60px);
        position: absolute;
        top: 0;
    }
`

export const Title = styled.div`
    width: 25%;
    float: left;
`


export const BlockContent = styled.div`
        overflow: visible;
        margin-left: 25%;
        width: 75%;
        position: relative;
    }
`
