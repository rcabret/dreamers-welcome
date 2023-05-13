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
    padding: ${rem(100)} 0;

    form {
        margin-top: ${rem(80)};
    }
`

const EmailCapture = ({inFirstVisitModal} : any) => {
    const url = getPostUrl()
    if(inFirstVisitModal){
        return (
            <Wrapper>
                <div>
                    <StyledHeader size={2}>Are you a dreamer?</StyledHeader>
                    <MailchimpSubscribe
                        url={url}
                        render={({ subscribe, status, message }) => (
                            <SubscribeForm
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
        )
    }
    else return (
        <Block
            noPaddingBottom
            fullWidth
            title="STAY CONNECTED"
            content={
                <Wrapper>
                    <div>
                        <StyledHeader size={2}>Are you a dreamer?</StyledHeader>
                        <MailchimpSubscribe
                            url={url}
                            render={({ subscribe, status, message }) => (
                                <SubscribeForm
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
