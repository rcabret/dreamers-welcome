import styled, { css } from 'styled-components'
import { rem } from 'polished'
import { show } from 'dom7'
import { BREAKPOINTS } from '../../../_constants/brekpoints'

export const BlockWrapper = styled.div`
    display: inline-block;
    width: 100%;
    position: relative;
    padding-top: ${rem(40)};

    padding-bottom: ${({ noPaddingBottom }: { noPaddingBottom?: boolean }) =>
        noPaddingBottom ? rem(40) : rem(80)};

    .separator {
        height: 1px;
        background-color: #c1c1c1;
        width: calc(100% - ${rem(60)});
        left: ${rem(30)};
        position: absolute;
        top: 0;
    }

    @media (max-width: ${BREAKPOINTS.TABLET}) {
        .separator {
            width: calc(100% - ${rem(40)});
            left: ${rem(20)};
        }
    }
`

export const Title = styled.div`
    padding: 0 ${rem(30)};

    ${({ fullWidth }: { fullWidth?: boolean }) =>
        fullWidth
            ? css`
                  width: 100%;
              `
            : css`
                  width: 25%;
                  float: left;
              `};

    @media (max-width: ${BREAKPOINTS.TABLET}) {
        width: 100%;
        display: block;
        float: none;
        padding: 0 ${rem(20)};
        margin-bottom: ${rem(40)};
    }
`

interface BI {
    showOverflow?: boolean
    fullWidth?: boolean
}

export const BlockContent = styled.div`
    overflow: visible;
    position: relative;
    padding: ${({ showOverflow }: BI) => (showOverflow ? '0' : `0 ${rem(30)}`)};
    
    ${({ fullWidth }: BI) =>
        fullWidth
            ? css`
                  width: 100%;
              `
            : css`
                  margin-left: 25%;
                  width: 75%;
              `}
    }
    
    @media(max-width: ${BREAKPOINTS.TABLET}) {
        width: 100%;
        margin-left: 0;
        padding: ${({ showOverflow }: BI) =>
            showOverflow ? '0' : `0 ${rem(20)}`};

    }

    
`
