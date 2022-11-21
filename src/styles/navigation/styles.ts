import styled from 'styled-components'
import Button from '../../_components/UI/Buttons/Button'
import { rem } from 'polished'

export const SubNav = styled.div`
    position: sticky;
    height: ${rem(60)};
    display: flex;
    align-items: center;
    top: 65px;
    z-index: 10;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(14px);
    overflow-x: scroll !important;
    white-space: nowrap !important;
    padding: 0 ${rem(20)};
    padding-bottom: ${rem(5)};
    border-bottom: 1px solid #c1c1c1;
`

export const SubLink = styled(Button)`
    display: inline-block;
    min-width: auto !important;
    max-width: auto !important;
    padding-left: ${rem(20)};
    padding-right: ${rem(20)};
    margin: 0 10px;
    cursor: pointer;

    &.active {
        background: #1a1a1a;
        color: white;
    }

    span {
        position: static;
    }
`
