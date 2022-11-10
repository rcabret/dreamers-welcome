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
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) => {
            console.log('Response received')
            if (res.status === 200) {
                console.log('Response succeeded!')
                setSubmitted(true)
                setName('')
                setEmail('')
                setSubject('')
                setProperty('')
                setMessage('')
            }
        })
    }

    return (
        <Content padding>
            <div>Hello here goes a form</div>
        </Content>
    )
}

export default MailchimpFormContainer

export async function getStaticProps(context: { params: { slug: string } }) {
    const url = getBurnerEmailPassword()

    return {
        props: {
            url,
        },
    }
}
