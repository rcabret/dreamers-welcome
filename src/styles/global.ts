import styled, { css } from 'styled-components'
import { rem } from 'polished'
import { BREAKPOINTS } from '../_constants/brekpoints'
import GridImage from '../_components/UI/GridImage'
import Block from '../_components/UI/Block'

interface GMProps {
    columns: number
    dontBreak?: boolean
    sideScrollOnMobile?: boolean
}

export const GridModule = styled.div`
    position: relative;
    //padding-bottom: ${rem('20px')};

    > div,
    > a {
        display: inline-block;
        vertical-align: top;
        box-sizing: border-box;
        width: ${({ columns }: GMProps) => `${100 / columns}%`};
        text-decoration: none;
    }

    @media (max-width: ${rem(1200)}) {
        ${({ sideScrollOnMobile = false }: GMProps) =>
            sideScrollOnMobile &&
            css`
                overflow-x: scroll !important;
                white-space: nowrap !important;

                > div,
                > a {
                    width: 40% !important;
                    min-width: ${rem('340px')} !important;
                    white-space: normal !important;
                }
            `}
    }

    @media (max-width: ${BREAKPOINTS.TABLET}) {
        ${({ sideScrollOnMobile = false }: GMProps) =>
            !sideScrollOnMobile &&
            css`
                > div,
                > a {
                    width: 50%;
                }
            `}
    }

    @media (max-width: ${BREAKPOINTS.MOBILE}) {
        padding-bottom: ${rem('25px')};

        ${({ sideScrollOnMobile = false }: GMProps) =>
            !sideScrollOnMobile &&
            css`
                > div,
                > a {
                    width: 100%;
                }
            `}
    }
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
        border ? '1px solid #1a1a1a' : 'none'};
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
        z-index: 1;
        border-radius: ${rem('10px')};

        > div {
            z-index: 0;
        }
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
    height: 100vh;
    min-height: ${rem(700)};
    position: relative;
    //max-height: 960px;
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

export const StyledBlockForGrid = styled(Block)`
    > div:last-child {
        margin-top: ${rem(20)};

        > div {
            left: -${rem(10)};
            width: calc(100% + ${rem(20)});
        }
    }
    @media (max-width: ${rem(1200)}) {
        > div:last-child {
            padding: 0;

            > div {
                left: 0;
                width: calc(100%);
            }
        }
    }

    @media (max-width: ${BREAKPOINTS.TABLET}) {
        > div:last-child {
            padding: 0;

            > div {
                left: auto;
                width: 100%;
            }
        }
    }
`
export const SeeMore = styled.div`
    display: block;
    padding-top: ${rem(40)};
    margin-top: ${rem(16)};
    border-top: 1px solid #c1c1c1;

    a {
        font-size: ${rem(16)};
    }

    a:hover {
        text-decoration: underline;
    }
`

export const PageContent = styled.div`
    padding-right: ${rem(40)};
    p {
        font-size: ${rem(24)};
    }
`

export const StatsGridModule = styled(GridModule)`
    @media (max-width: ${BREAKPOINTS.TABLET}) {
        > div {
            margin-bottom: ${rem(40)};
        }
    }
`
