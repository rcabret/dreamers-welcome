import React from 'react'
import Block from '../UI/Block'
import styled from 'styled-components'
import Header from '../Typography/Header'
import { rem } from 'polished'

const StyledInput = styled.input`
    border-radius: ${rem(40)};
    height: ${rem(50)};
    width: ${rem(600)};
    outline: none;
    box-shadow: none;
    border: 1px solid #c1c1c1;
    padding: ${rem(20)};
    font-size: ${rem(18)};
`

const Form = styled.form`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: ${rem(80)};
`

const StyledHeader = styled(Header)`
    text-align: center;
`

const Wrapper = styled.div`
    width: 100%;
    padding: ${rem(100)} 0;
`

const EmailCapture = () => {
    return (
        <Block
            noPaddingBottom
            fullWidth
            title="STAY CONNECTED"
            content={
                <Wrapper>
                    <div>
                        <StyledHeader size={2}>Are you a dreamer?</StyledHeader>
                        <Form>
                            <StyledInput placeholder="SUBSCRIBE" />
                        </Form>
                    </div>
                </Wrapper>
            }
        />
    )
}

export default EmailCapture
