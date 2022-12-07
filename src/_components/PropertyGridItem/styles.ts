import styled, { css } from 'styled-components'
import { rem } from 'polished'
import Button from '../UI/Buttons/Button'
import { BREAKPOINTS } from '../../_constants/brekpoints'

export const Metadata = styled.aside`
    padding: ${rem('10px')} ${rem('14px')} ${rem('14px')} ${rem('14px')};

    h2 {
        margin-top: ${rem('10px')};
        font-size: ${rem('32px')};
        font-weight: 400;
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

    ${({ collapsed }: { collapsed?: boolean }) =>
        collapsed &&
        css`
            position: relative;
            margin-bottom: ${rem(20)};
            width: 100%;
        `};

    @media (max-width: ${BREAKPOINTS.TABLET}) {
        position: relative;
        margin-bottom: ${rem(20)};
        width: 100%;
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
        opacity: 0.4;
        display: inline-block;
        white-space: nowrap;
    }

    > p:first-child {
        width: calc(100% - ${rem(150)});
    }

    .share {
        float: right;
        cursor: pointer;
        width: ${rem(150)};

        p,
        svg {
            opacity: 1;
            float: right;
            position: relative;
        }

        svg {
            height: ${rem('18px')};
            width: ${rem('18px')};
            margin-left: ${rem('10px')};
        }
    }
`

export const StyledButton = styled(Button)`
    ${({ collapsed }: { collapsed?: boolean }) =>
        collapsed &&
        css`
            width: 100%;
        `};

    @media (max-width: ${BREAKPOINTS.TABLET}) {
        width: 100%;
    }
`
