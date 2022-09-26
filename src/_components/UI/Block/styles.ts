import styled, { css } from 'styled-components'
import { rem } from 'polished'

export const BlockWrapper = styled.div`
    display: inline-block;
    width: calc(100%);
    position: relative;

    ${({ noPaddingBottom }: { noPaddingBottom?: boolean }) =>
        !noPaddingBottom
            ? css`
                  padding: ${rem('40px')} ${rem('30px')} ${rem('80px')}
                      ${rem('30px')};
              `
            : css`
                  padding: ${rem('40px')} ${rem('30px')} ${rem('40px')}
                      ${rem('30px')};
              `}

    .separator {
        height: 1px;
        background-color: #c1c1c1;
        width: calc(100% - 60px);
        position: absolute;
        top: 0;
    }
`

export const Title = styled.div`
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
