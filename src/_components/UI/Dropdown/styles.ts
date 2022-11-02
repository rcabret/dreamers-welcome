import styled, { css } from 'styled-components'
import { rem } from 'polished'

interface P {
    dark?: boolean
    active?: boolean
    opened?: boolean
    navTheme?: string
    collapse?: boolean
}

export const StyledDropdown = styled.div`
    position: absolute;
    left: ${rem(30)};
    height: 100%;
    color: ${({ dark }: P) => (dark ? 'black' : 'white')};
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: ${rem(18)};
    text-transform: uppercase;
    letter-spacing: ${rem(0.5)};
`

export const Panel = styled.ul`
    opacity: 0;
    visibility: hidden;
    transform: scale(0.5);
    transform-origin: 100% 0;
    transition: 0.3s;
    position: absolute;
    top: calc(100% + 10px);
    left: ${rem(34)};
    overflow: hidden;
    list-style: none;
    width: ${rem(200)};

    ${({ opened }: P) =>
        opened &&
        css`
            visibility: visible;
            opacity: 1;
            border: 1px solid #c1c1c1;
            border-radius: ${rem(8)};
            background: rgba(255, 255, 255, 0.9);
            transform: scale(1);
        `};

    li {
        padding: ${rem(9)} ${rem(16)};
        border-bottom: 1px solid #c1c1c1;
        color: black;
        transition: 0.3s;
    }

    li:last-child {
        margin: 0;
        border: none;
    }

    li:hover,
    li.active {
        background: black;
        color: white;
    }
`

export const Inner = styled.div`
    position: relative;
    padding-left: ${rem(34)};
`

export const Chevron = styled.svg`
    width: ${rem(30)};
    height: ${rem(12)};
    position: absolute;
    stroke: ${({ dark }: P) => (dark ? 'black' : 'white')};
    fill: none;
    left: 0;
    top: ${rem(4)};
    stroke-width: 2;
`
