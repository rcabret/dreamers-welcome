import React from 'react'
import styled from 'styled-components'
import { rem } from 'polished'
import Header from '../../Typography/Header'

const BlurbWrap = styled.div`
    min-height: ${rem('550px')};
    font-size: ${rem('70px')};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${rem('30px')};
    text-align: center;
    position: relative;

    > div {
        max-width: ${rem('1100px')};
    }

    h1 {
        line-height: 1.2;
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

const StyledHeader = styled(Header)`
    margin-bottom: ${rem('60px')};
    text-align: center;
`

const Blurb = ({
    text,
    borderTop,
    eyebrow,
}: {
    text: string
    borderTop?: boolean
    eyebrow?: string
}) => {
    return (
        <BlurbWrap>
            {borderTop && <figure className="separator" />}
            <div>
                {eyebrow && (
                    <StyledHeader size={4} uppercase>
                        {eyebrow}
                    </StyledHeader>
                )}
                <Header size={1}>{text}</Header>
            </div>
        </BlurbWrap>
    )
}

export default Blurb
