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
    position: relative;

    span {
        max-width: ${rem('1220px')};
    }

    .separator {
        margin: 0 30px;
        height: 1px;
        background-color: #c1c1c1;
        width: calc(100% - 60px);
        position: absolute;
        top: 0;
    }
`

const Blurb = ({ text, borderTop }: { text: string; borderTop?: boolean }) => {
    return (
        <BlurbWrap>
            {borderTop && <div className="separator" />}
            <span>{text}</span>
        </BlurbWrap>
    )
}

export default Blurb
