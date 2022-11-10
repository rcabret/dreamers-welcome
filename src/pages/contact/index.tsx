import React, { useState } from 'react'
import { Content } from '../../styles/global'
import { getBurnerEmailPassword } from '../../_lib/apiConstants'

const MailchimpFormContainer = ({ url }: any) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [property, setProperty] = useState('')
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log('Sending')
        let data = {
            name,
            subject,
            property,
            email,
            message,
        }
        const h = {
            name: 'Ricardo',
            email: 'hello@test',
            message: 'Test test test',
        }
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(h),
        }).then((res) => {
            console.log('Response received', res)
        })
    }

    return (
        <Content padding>
            <div onClick={(e) => handleSubmit(e)}>Hello here goes a form</div>
        </Content>
    )
}

export default MailchimpFormContainer

