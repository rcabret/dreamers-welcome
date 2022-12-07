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
    position: relative;
    color: ${({ dark }: P) => (dark ? '#1a1a1a' : 'white')};
    display: flex;
    align-items: center;
    width: 240px;
    cursor: pointer;
    font-size: ${rem(16)};
    text-transform: uppercase;
    letter-spacing: ${rem(0.5)};
    z-index: 1;
`

export const Panel = styled.ul`
    opacity: 0;
    visibility: hidden;
    transform: scale(0.5);
    transform-origin: 100% 0;
    transition: 0.3s;
    position: absolute;
    top: calc(100% + ${rem(10)});
    left: ${rem(30)};
    overflow: hidden;
    list-style: none;
    width: ${rem(200)};
    border: 1px solid #c1c1c1;
    border-radius: ${rem(8)};

    ${({ opened }: P) =>
        opened &&
        css`
            visibility: visible;
            opacity: 1;
            background: rgba(255, 255, 255, 0.9);
            transform: scale(1);
        `};

    li {
        padding: ${rem(9)} ${rem(16)};
        color: #1a1a1a;
        font-size: ${rem(16)};
        transition: 0.3s;
    }

    li:last-child {
        margin: 0;
        border: none;
    }

    li:hover,
    li.active {
        background: #d9d9d9;
    }
`

export const Inner = styled.div`
    svg,
    div {
        float: left;
    }
`
