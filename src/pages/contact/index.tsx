import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Content } from '../../styles/global'
import styled from 'styled-components'
import { getAllProperties } from '../../_lib/api'
import { rem } from 'polished'
import Header from '../../_components/Typography/Header'

const FormContainer = styled.div`
    max-width: ${rem(700)};
    margin: ${rem(40)} auto;
    padding: ${rem(40)};
    border-radius: ${rem(10)};
    border: 1px solid #c1c1c1;
    margin-bottom: ${rem(100)};

    input,
    select,
    textarea {
        width: 100%;
        outline: none;
        box-shadow: none;
        border: 1px solid #c1c1c1;
        font-size: ${rem(18)} !important;
        display: block;
        margin-bottom: ${rem(20)};
        font-family: 'Yellix', sans-serif !important;
        padding: ${rem(10)} ${rem(20)};
        background: rgba(217, 217, 217, 0.45);
    }

    textarea {
        padding: ${rem(20)};
        resize: none;
    }

    input[type='submit'] {
        background: black;
        border-radius: ${rem(40)};
        color: white;
    }

    h4,
    h2 {
        text-align: center;
        margin-bottom: ${rem(40)};
        display: inline-block;
        width: 100%;
    }

    h2 {
        margin-top: ${rem(40)};
        padding-bottom: ${rem(30)};
        border-bottom: 1px solid #c1c1c1;
        margin-bottom: ${rem(60)};
    }
`

const StyledInput = styled.input`
    border-radius: ${rem(40)};
    height: ${rem(50)};
    padding: ${rem(20)};
`

const StyledSelect = styled.select`
    border-radius: ${rem(40)};
    height: ${rem(50)};

    option:disabled {
        color: #c1c1c1 !important;
    }

    label {
        position: relative;
    }
    label:after {
        right: 80px;
    }
`

const StyledTextarea = styled.textarea`
    border-radius: ${rem(10)};
    height: ${rem(150)};
`

const Contact = ({ properties, setNavTheme }: any) => {
    useEffect(() => {
        setNavTheme('dark')
    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const _handleSubmit = (data: any) => {
        const { name, subject, property, email, message } = data

        fetch('/api/contact', {
            method: 'POST',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) => {})
    }

    return (
        <Content padding>
            <FormContainer>
                <Header size={4}>CONTACT</Header>
                <Header size={2}>Get in touch with us!</Header>
                <form onSubmit={handleSubmit((data) => console.log(data))}>
                    <StyledInput
                        {...register('Name')}
                        placeholder="Full Name"
                    />
                    <StyledInput
                        placeholder="Email"
                        type="email"
                        {...register('email', { required: true })}
                    />
                    {errors.email && <p>Please enter an email format.</p>}
                    <StyledInput
                        {...register('subject')}
                        placeholder="Subject"
                    />
                    {errors.age && <p>Please enter number for age.</p>}
                    <StyledSelect {...register('property')}>
                        <>
                            <option value="" disabled selected>
                                Select property
                            </option>
                            {properties &&
                                properties.length &&
                                properties.map((p: any) => (
                                    <option>{p.propertyName}</option>
                                ))}
                        </>
                    </StyledSelect>
                    <StyledTextarea
                        {...register('message')}
                        placeholder="Message"
                    />
                    <StyledInput type="submit" value="Message Us" />
                </form>
            </FormContainer>
        </Content>
    )
}

export default Contact

export async function getStaticProps() {
    const properties = await getAllProperties()

    return {
        props: {
            properties,
        },
    }
}
