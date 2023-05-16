import React from 'react'
import Block from '../UI/Block'
import styled from 'styled-components'
import Header from '../Typography/Header'
import { rem } from 'polished'
import SubscribeForm from '../SubscribeForm'
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import { getPostUrl } from '../../_lib/apiConstants'

const StyledHeader = styled(Header)`
    text-align: center;
`
const Wrapper = styled.div`
        width: 100%;

        form {
            margin-top: ${rem(80)};
        }
    `


const EmailCapture = ({inFirstVisitModal} : any) => {
    
    const url = getPostUrl()
    if(inFirstVisitModal){
        return (
            <Wrapper style = {{['padding'as any] : '3rem 0'}}>
                <div>
                    <StyledHeader size={2}>Are you a dreamer?</StyledHeader>
                    <p className='mt-5 px-3 text-lg text-center'>Sign up for our updates and be the first to hear about exclusive offers and the latest news</p>
                    <MailchimpSubscribe
                        url={url}
                        render={({ subscribe, status, message }) => (
                            <SubscribeForm
                                marginTop='3rem'
                                status={status}
                                message={message}
                                onValidated={(formData: any) => {
                                    subscribe(formData)
                                }}
                            />
                        )}
                    />
                    <p className='text-sm px-3 mt-2'>We respect your privacy.</p>
                </div>
            </Wrapper>
        )
    }
    else return (
        <Block
            noPaddingBottom
            fullWidth
            title="STAY CONNECTED"
            content={
                <Wrapper  style = {{['padding'as any] : '6.25rem 0'}}>
                    <div>
                        <StyledHeader size={2}>Are you a dreamer?</StyledHeader>
                        <MailchimpSubscribe
                            url={url}
                            render={({ subscribe, status, message }) => (
                                <SubscribeForm
                                    marginTop='5rem'
                                    status={status}
                                    message={message}
                                    onValidated={(formData: any) => {
                                        subscribe(formData)
                                    }}
                                />
                            )}
                        />
                    </div>
                </Wrapper>
            }
        />
    )
}

export default EmailCapture
