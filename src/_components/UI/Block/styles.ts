import styled, { css } from 'styled-components'
import { rem } from 'polished'
import { show } from 'dom7'

export const BlockWrapper = styled.div`
    display: inline-block;
    width: calc(100%);
    position: relative;
    padding-top: ${rem(40)};

    ${({ noPaddingBottom }: { noPaddingBottom?: boolean }) =>
        !noPaddingBottom
            ? css`
                  padding-bottom: ${rem(80)};
              `
            : css`
                  padding-bottom: ${rem(40)};
              `}

    .separator {
        height: 1px;
        background-color: #c1c1c1;
        width: calc(100% - ${rem(60)});
        left: ${rem(30)};
        position: absolute;
        top: 0;
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
              `}
`

export const BlockContent = styled.div`
        overflow: visible;
        position: relative;
        padding: ${({ showOverflow }: { showOverflow: boolean }) =>
            showOverflow ? '0' : `0 ${rem(30)}`};
    
    ${({ fullWidth }: { fullWidth?: boolean }) =>
        fullWidth
            ? css`
                  width: 100%;
              `
            : css`
                  margin-left: 25%;
                  width: 75%;
              `}
    }
`
