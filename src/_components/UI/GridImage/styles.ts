import { rem } from 'polished'
import { BREAKPOINTS } from '../../../_constants/brekpoints'
import styled from 'styled-components'

export interface GridImageStyleProps {
    fullHeight?: boolean
    border?: boolean
    ratio?: number | string
    borderRadius?: boolean
    hasHover?: boolean
}

const getWrapperHeight = ({ fullHeight, border }: GridImageStyleProps) => {
    if (fullHeight && border) {
        return `calc(100% - ${rem('20px')})`
    } else if (fullHeight && !border) {
        return '100%'
    } else {
        return 'auto'
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
    padding-top: ${({ ratio, fullHeight }: GridImageStyleProps) =>
        ratio && !fullHeight && typeof ratio === 'number'
            ? `${ratio * 100}%`
            : 0};

    border-radius: ${(props) => props.borderRadius && rem('10px')};
    overflow: hidden;
    position: relative;

    ${({ fullHeight }) => fullHeight && `height: 100%;`}
    ${({ fullHeight }) => fullHeight && `min-height: ${rem('350px')};`}
    ${({ hasHover }) => hasHover && `transition: all ease-out 0.5s;`}
    
    :hover {
        transform: ${({ hasHover }) => (hasHover ? 'scale(0.98)' : 'none')};

        img {
            ${({ hasHover }) => hasHover && 'transform: scale(1.05)'};
        }
    }

    img {
        ${({ hasHover }) => hasHover && `transition: all ease-out 0.5s;`}
        position: absolute;
        height: 100%;
        width: 100%;
    }

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
