import React from 'react'
import styled from 'styled-components'
import { rem } from 'polished'

const BlurbWrap = styled.div`
    min-height: ${rem('600px')};
    font-size: ${rem('70px')};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${rem('20px')};
    text-align: center;

    span {
        max-width: ${rem('1220px')};
    }
`

const Blurb = ({ text }: { text: string }) => {
    return (
        <BlurbWrap>
            <span>{text}</span>
        </BlurbWrap>
    )
}

export default Blurb
