import styled from 'styled-components'
import { rem } from 'polished'
import { BREAKPOINTS } from '../_constants/brekpoints'

interface GMProps {
    sideScrollOnMobile: boolean
    columns: number
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

    @media (max-width: 1200px) {
        > div,
        > a {
            width: 50%;
        }
    }

    @media (max-width: ${BREAKPOINTS.TABLET}) {
        ${({ sideScrollOnMobile }: GMProps) =>
            sideScrollOnMobile
                ? `   
                overflow-x: scroll;
                white-space: nowrap;
                
                > div,
                > a {
                    width: 40%;
                    min-width: ${rem('170px')};
                    white-space: normal;
                }`
                : `
                > div,
                > a {
                    width: 50%;
                }`}
    }

    @media (max-width: ${BREAKPOINTS.MOBILE}) {
        padding-bottom: ${rem('25px')};
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
    border-top: ${({ border }: { border: boolean; padding: boolean }) =>
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
