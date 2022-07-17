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
        padding ? rem('85px') : rem('50px')}; // 50 navbar height
    min-height: calc(
        100vh - ${rem('390px')}
    ); // 300 + 50  footer  height plus navbar height
`

export const GridWrapper = styled.div`
    border-top: ${({ border }: { border: boolean; padding: boolean }) =>
        border ? '1px solid black' : 'none'};
    padding: ${({ padding }) => (padding ? rem('10px') : 0)};
    padding-top: ${rem('20px')};

    @media (max-width: ${BREAKPOINTS.MOBILE}) {
        padding: 0 ${rem('5px')};
        padding-top: ${rem('10px')};
    }
`
