import styled, { css } from 'styled-components'
import { rem } from 'polished'
import { BREAKPOINTS } from '../_constants/brekpoints'
import GridImage from '../_components/UI/GridImage'

interface GMProps {
    columns: number
    dontBreak?: boolean
    sideScrollOnMobile?: boolean
}

export const GridModule = styled.div`
    position: relative;
    padding-bottom: ${rem('20px')};

    > div,
    > a {
        display: inline-block;
        vertical-align: top;
        box-sizing: border-box;
        width: ${({ columns }: GMProps) => `${100 / columns}%`};
        text-decoration: none;
    }

    ${({ dontBreak = false }) =>
        !dontBreak &&
        css`
            @media (max-width: 1200px) {
                > div,
                > a {
                    width: 50%;
                }
            }

            @media (max-width: ${BREAKPOINTS.TABLET}) {
                ${({ sideScrollOnMobile = false }: GMProps) =>
                    sideScrollOnMobile
                        ? css`
                              overflow-x: scroll;
                              white-space: nowrap;

                              > div,
                              > a {
                                  width: 40%;
                                  min-width: ${rem('170px')};
                                  white-space: normal;
                              }
                          `
                        : css`
                              > div,
                              > a {
                                  width: 50%;
                              }
                          `}
            }

            @media (max-width: ${BREAKPOINTS.MOBILE}) {
                padding-bottom: ${rem('25px')};
            }
        `}
`

export const Content = styled.div`
    padding-top: ${({ padding }: { padding?: boolean }) =>
        padding ? rem('80px') : rem('50px')}; // 50 navbar height
    min-height: calc(
        100vh - ${rem('390px')}
    ); // 300 + 50  footer  height plus navbar height
`

export const GridWrapper = styled.div`
    border-top: ${({ border }: { border?: boolean; padding: boolean }) =>
        border ? '1px solid black' : 'none'};
    padding: ${({ padding }) => (padding ? rem('20px') : 0)};
    padding-top: ${rem('30px')};

    @media (max-width: ${BREAKPOINTS.MOBILE}) {
        padding: 0 ${rem('5px')};
        padding-top: ${rem('10px')};
    }
`

export const ItemWrapper = styled.div`
    position: relative;
    border: ${rem('10px')} solid transparent;

    .border {
        border: 1px solid #c1c1c1;
        border-radius: ${rem('10px')};
        overflow: hidden;
        border-radius: ${rem('10px')};
    }
`

export const TopSection = styled.div`
    width: 100%;
    padding: 0 ${rem('30px')};
    padding-top: ${({ padding }: { padding?: boolean }) =>
        padding && rem('40px')};
    display: inline-block;

    button {
        float: right;
    }
`

export const BannerGridImage = styled(GridImage)`
    height: calc(100vh);
    min-height: 700px;
`

export const Stat = styled.div`
    font-size: ${rem(100)};
    font-weight: 400;
`

export const BlockListWrap = styled.div`
    h4 {
        margin-bottom: ${rem(30)};
    }

    p {
        line-height: 1.7;
    }
`

export const GridAdjustWrapper = styled.div`
    position: relative;
    left: -${rem(10)};
    width: calc(100% + ${rem(20)});
    margin-top: ${rem(20)};
`
