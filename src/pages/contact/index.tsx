import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Content } from '../../styles/global'
import { getAllProperties } from '../../_lib/api'
import Header from '../../_components/Typography/Header'
import {
    FormContainer,
    StyledInput,
    StyledSelect,
    StyledTextarea,
    StyledSelectWrapper,
    StyledSuccessBodyText,
} from '../../styles/contact/styles'
import Chevron from '../../_components/UI/Icons/Chevron'

const Contact = ({ properties, setNavTheme }: any) => {
    useEffect(() => {
        setNavTheme('dark')
    }, [])

    const [submitted, setSubmitted] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const _handleSubmit = (data: any) => {
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) => {
            if (res.status === 200) {
                setSubmitted(true)
            }
        })
    }

    return (
        <Content padding>
            {!submitted ? (
                <FormContainer>
                    <Header size={4}>CONTACT</Header>
                    <Header size={2}>Get in touch with us!</Header>
                    <form
                        onSubmit={handleSubmit((data) => _handleSubmit(data))}
                    >
                        <StyledInput
                            {...register('name', { required: true })}
                            placeholder="NAME"
                        />
                        {errors.name && <p>Please enter your name.</p>}
                        <StyledInput
                            placeholder="EMAIL"
                            type="email"
                            {...register('email', { required: true })}
                        />
                        {errors.email && <p>Please enter an email format.</p>}
                        <StyledInput
                            {...register('subject', { required: true })}
                            placeholder="SUBJECT"
                        />
                        {errors.subject && <p>Please select subject.</p>}
                        <StyledSelectWrapper>
                            <StyledSelect
                                {...register('property', {
                                    required: true,
                                })}
                            >
                                <>
                                    <option value="" disabled selected>
                                        SELECT PROPERTY
                                    </option>
                                    {properties &&
                                        properties.length &&
                                        properties.map((p: any) => (
                                            <option>
                                                {p.propertyName.toUpperCase()}
                                            </option>
                                        ))}
                                </>
                            </StyledSelect>
                            <Chevron dark />
                        </StyledSelectWrapper>
                        {errors.property && <p>Please select subject.</p>}
                        <StyledTextarea
                            {...register('message', { required: true })}
                            placeholder="MESSAGE"
                        />
                        {errors.message && <p>Please enter message.</p>}
                        <StyledInput
                            type="submit"
                            value="MESSAGE US"
                            disabled={Object.keys(errors).length}
                        />
                    </form>
                </FormContainer>
            ) : (
                <StyledSuccessBodyText size="xlg">
                    Thank you for contacting us! We will be in touch shortly.
                </StyledSuccessBodyText>
            )}
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
