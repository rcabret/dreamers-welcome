import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Content } from '../../styles/global'
import { getAllProperties } from '../../_lib/api'
import Header from '../../_components/Typography/Header'
import {
    FormContainer,
    StyledInput,
    StyledSelect,
    StyledTextarea,
} from '../../styles/contact/styles'

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
