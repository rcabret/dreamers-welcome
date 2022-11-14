import { rem } from 'polished'
import { BREAKPOINTS } from '../../../_constants/brekpoints'
import styled, { css } from 'styled-components'

export interface GridImageStyleProps {
    fullHeight?: boolean
    border?: boolean
    ratio?: number | string
    borderRadius?: boolean
    hasHover?: boolean
    intent?: string | number
    fixedHeight?: number
}

const getWrapperHeight = ({ fullHeight, border }: GridImageStyleProps) => {
    if (fullHeight && border) {
        return `calc(100% - ${rem('20px')})`
    } else if (fullHeight && !border) {
        return '100vh'
    } else {
        return 'auto'
    }
}

const getPaddingTop = ({ ratio, fullHeight }: GridImageStyleProps) => {
    if (ratio && !fullHeight && typeof ratio === 'number') {
        return `${ratio * 100}%`
    } else {
        return 0
    }
}

export const Container = styled.div`
    height: ${(props: GridImageStyleProps) => getWrapperHeight(props)};
    border: ${({ border }) =>
        border ? `${rem('10px')} solid transparent` : 'none'};

    @media (max-width: ${BREAKPOINTS.MOBILE}) {
        border: ${({ border }) =>
            border ? `${rem('5px')} solid transparent` : 'none'};
    }
`

export const ImageMask = styled.div`
    padding-top: ${(props: GridImageStyleProps) => getPaddingTop(props)};
    border-radius: ${(props) => props.borderRadius && rem('10px')};
    overflow: hidden;
    z-index: 1;

    ${({ fixedHeight, ratio }) =>
        fixedHeight &&
        css`
            height: ${rem(fixedHeight)};
            width: ${rem(fixedHeight / ratio)};
        `};

    ${(props) =>
        !props.fullHeight
            ? css`
                  position: relative;
              `
            : css`
                  height: 100%;
                  min-height: ${rem(350)};
              `};

    ${({ hasHover }) => hasHover && `transition: all ease-out 0.5s;`}

    :hover {
        transform: ${({ hasHover }) => (hasHover ? 'scale(0.98)' : 'none')};

        img {
            ${({ hasHover }) => hasHover && 'transform: scale(1.05)'};
        }
    }

    img {
        z-index: 0;
        ${({ hasHover }) => hasHover && `transition: all ease-out 0.5s;`}
        position: absolute;
        height: 100%;
        width: 100%;
    }

    // Solid color image placeholder
    > aside {
        background: #dcdbdb;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    @media (max-width: ${BREAKPOINTS.MOBILE}) {
        border-radius: ${(props) => props.borderRadius && rem('5px')};
    }
`
