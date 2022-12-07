import React from 'react'
import styled from 'styled-components'
import { rem } from 'polished'

const ChevronStyled = styled.svg`
    width: ${rem(30)};
    height: ${rem(12)};
    stroke: ${({ dark }: { dark?: boolean }) => (dark ? '#1a1a1a' : 'white')};
    fill: none;
    stroke-width: 2;
    position: relative;
    margin-right: ${rem(2)};
    top: ${rem(5)};
    z-index: -1;
`

const Chevron = ({ dark }: any) => (
    <ChevronStyled dark={dark} viewBox="0 0 30 20">
        <polyline points="0 0, 15 15, 30 0" />
    </ChevronStyled>
)

export default Chevron
