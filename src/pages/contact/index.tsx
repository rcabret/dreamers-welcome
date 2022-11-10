import React, { useEffect, useState } from 'react'
import { Content } from '../../styles/global'

const Contact = ({ setNavTheme }: any) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [property, setProperty] = useState('')
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        setNavTheme('dark')
    }, [])

    const handleSubmit = (e: any) => {
        e.preventDefault()
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
        }).then((res) => {})
    }

    return (
        <Content padding>
            <div onClick={(e) => handleSubmit(e)}>Hello here goes a form</div>
        </Content>
    )
}

export default Contact
