import React from 'react'
import Block from '../UI/Block'
import styled from 'styled-components'
import Header from '../Typography/Header'
import { rem } from 'polished'
import SubscribeForm from '../SubscribeForm'
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import { getPostUrl } from '../../_lib/apiConstants'

const StyledHeader = styled(Header)`
    text-align: center;`

const Wrapper = styled.div`
        width: 100%;
        form {
            margin-top: ${rem(80)};
        }`

const EmailCapture = ({inFirstVisitModal} : any) => {
    
    const url = getPostUrl()
    if(inFirstVisitModal){
        return (
            <Wrapper style = {{['padding'as any] : '3rem 0'}}>
                <div>
                    <StyledHeader size={2}>Join for a chance to win a free stay!</StyledHeader>
                    <p className='my-5 px-3 text-lg text-center'>Be the first to hear about exclusive offers and the latest news.</p>
                    <MailchimpSubscribe
                        url={url}
                        render={({ subscribe, status, message }) => (
                            <SubscribeForm marginTop='0.5rem' status={status} message={message} onValidated={(formData: any) => { subscribe(formData) }} />
                        )}
                    />
                    <p className='text-sm mt-2 text-center w-full'>We respect your privacy.</p>
                </div>
            </Wrapper>
        )
    }else return (
        <Block
            noPaddingBottom
            fullWidth
            title="STAY CONNECTED"
            content={
                <Wrapper  style = {{['padding'as any] : '6.25rem 0'}}>
                    <div>
                        <StyledHeader size={2}>Are you a dreamer?</StyledHeader>
                        <p className='my-5 px-3 text-lg text-center'>Be the first to hear about exclusive offers and the latest news.</p>
                        <MailchimpSubscribe
                            url={url}
                            render={({ subscribe, status, message }) => (
                                <SubscribeForm marginTop='3rem' status={status} message={message} onValidated={(formData: any) => { subscribe(formData) }} />
                            )}
                        />
                        <p className='text-sm mt-2 text-center w-full'>We respect your privacy.</p>
                    </div>
                </Wrapper>
            }
        />
    )
}
export default EmailCapture
