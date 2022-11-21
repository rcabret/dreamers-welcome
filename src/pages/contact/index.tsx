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

    const [bucket, setBucket] = useState(null)

    const [submitted, setSubmitted] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const _handleSubmit = (data: any) => {
        if (!data.subject.length) {
            data.subject = 'OTHER'
        }

        if (!data.property.length) {
            data.property = 'GENERAL PROPERTY'
        }

        if (data.property !== 'GENERAL PROPERTY') {
            const propertyObj = properties.filter((x: any) => {
                return (
                    `${x.propertyName.toUpperCase()} (${x.bucket[0]})` ===
                    data.property
                )
            })[0]
            data.bucket = propertyObj.bucket[0].toUpperCase()
        } else {
            data.bucket = 'DESTINATION N/A'
        }

        fetch('/api/contact', {
            method: 'POST',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) => {
            if (res.status === 200) {
                window.scrollTo({
                    behavior: 'smooth',
                    top: 0,
                })
                setSubmitted(true)
            }
        })
    }

    // @ts-ignore
    return (
        <Content padding>
            <div style={{ margin: '0 15px' }}>
                {!submitted ? (
                    <FormContainer>
                        <Header size={4}>CONTACT</Header>
                        <Header size={2}>Get in touch with us!</Header>
                        <form
                            onSubmit={handleSubmit((data) =>
                                _handleSubmit(data)
                            )}
                        >
                            <StyledInput
                                {...register('name', { required: true })}
                                placeholder="FULL NAME"
                            />
                            {errors.name && <p>Please enter your full name.</p>}
                            <StyledInput
                                placeholder="EMAIL"
                                type="email"
                                {...register('email', { required: true })}
                            />
                            {errors.email && (
                                <p>Please enter an email format.</p>
                            )}
                            <StyledSelectWrapper>
                                <StyledSelect
                                    {...register('subject', {
                                        required: false,
                                    })}
                                >
                                    <option value="" disabled selected>
                                        SUBJECT
                                    </option>
                                    <option>GENERAL INQUIRIES</option>
                                    <option>PRESS & MEDIA</option>
                                    <option>BOOKINGS</option>
                                    <option>OTHER</option>
                                </StyledSelect>
                                <Chevron dark />
                            </StyledSelectWrapper>
                            <StyledSelectWrapper>
                                <StyledSelect
                                    {...register('property', {
                                        required: false,
                                    })}
                                >
                                    <>
                                        <option value="" disabled selected>
                                            SELECT PROPERTY
                                        </option>
                                        <option>GENERAL PROPERTY</option>
                                        {properties &&
                                            properties.length &&
                                            properties.map((p: any) => (
                                                <option>
                                                    {p.propertyName.toUpperCase()}{' '}
                                                    {`(${p.bucket[0]})`}
                                                </option>
                                            ))}
                                    </>
                                </StyledSelect>
                                <Chevron dark />
                            </StyledSelectWrapper>
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
                        Thank you for contacting us! We will be in touch
                        shortly.
                    </StyledSuccessBodyText>
                )}
            </div>
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
