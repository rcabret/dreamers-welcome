import React, { useEffect, useState } from 'react'
import InputField from '../UI/InputField'
import styled from 'styled-components'
import { rem } from 'polished'

const StyledButtonInput = styled(InputField)`
    position: absolute;
    height: 100%;
    right: ${rem(10)};
    width: 40px;
    cursor: pointer;

    svg {
        width: 24px;
        height: 24px;
        position: relative;
        top: 2px;

        path {
            fill: #1a1a1a;
        }
    }

    &:disabled {
        svg {
            path {
                fill: #c1c1c1;
            }
        }
    }
`
const Form = styled.form`
        width: 100%;
        max-width: ${rem(600)};
        margin: 0 auto;

        > div {
            position: relative;
            width: 100%;
        }
    `

const SubscribeForm = ({marginTop,  status, message, onValidated }: any) => {
    
    const [email, setEmail] = useState('')
    const [placeholder, setPlaceholder] = useState('Enter your email')
    const handleSubmit = (e: any) => {
        e.preventDefault()
        email &&
            email.indexOf('@') > -1 &&
            onValidated({
                EMAIL: email,
            })
    }
    useEffect(() => {
        if (status === 'success') {
            setEmail('')
            setPlaceholder('THANKS FOR SUBSCRIBING!')
            setTimeout(() => {
                setPlaceholder('Enter your email')
            }, 3000)
        }
    }, [message, status])

    return (
        <Form style={{['margin-top' as any]: marginTop}} onSubmit={(e) => handleSubmit(e)}>
            <div>
                <InputField onChangeHandler={setEmail} type="email" value={email} placeholder={placeholder}isRequired/>
                <StyledButtonInput
                    type="submit"
                    formValues={[email]}
                    label={
                        <svg xmlns="http://www.w3.org/2000/svg"  fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 376.83" >
                            <path fillRule="nonzero" d="M355.12 372.7a12.026 12.026 0 0 1-17.09 1.06c-5-4.47-5.46-12.2-1.04-17.25l136.05-155.82H12.15c-6.71 0-12.15-5.5-12.15-12.28 0-6.77 5.44-12.27 12.15-12.27h460.9L336.99 20.32c-4.42-5.05-3.96-12.78 1.04-17.25 5.01-4.47 12.66-4 17.09 1.05l153.67 176c4.17 4.55 4.33 11.64.17 16.39L355.12 372.7z" />
                        </svg>
                    }
                />
            </div>
        </Form>
    )
}

export default SubscribeForm
