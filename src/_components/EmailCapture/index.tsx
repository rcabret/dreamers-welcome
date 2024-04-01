import React, { useState } from 'react'
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
    const [isEmailSubscribed,setIsEmailSubscribed]=useState(false)

     

    if(inFirstVisitModal){
        return (
            <Wrapper className='modal_styling'>
                <div className='join_us_wrapper'>
                    {
                      !isEmailSubscribed?(<>
                        <StyledHeader size={2}>Join for a chance to win a free stay!</StyledHeader>
                        <p className='my-2 px-3 text-lg text-center'>Be the first to hear about exclusive offers and the latest news.</p></>
                       )
                      :
                      (
                        <>
                        
                      <StyledHeader size={2}>You're almost there!</StyledHeader>
                      <p className='my-2 px-3 text-lg text-center'>Unlock exclusive savings when you sign up for mobile alerts.</p></>
                      )
                    }
                   
                   
                    <MailchimpSubscribe
                        url={url}
                        render={({ subscribe, status, message }) => (
                            <SubscribeForm
                                marginTop='0.5rem'
                                status={status}
                                message={message}
                                setIsEmailSubscribed={setIsEmailSubscribed}
                                onValidated={(formData: any) => {
                                    subscribe(formData)
                                }
                                
                            }
                            />
                        )}
                    />
                    <p className='text-sm mt-2 text-center w-full'>We respect your privacy.</p>
                </div>
            </Wrapper>
        )
    }
    else 
    return (
        <Block
            noPaddingBottom
            fullWidth
            title="STAY CONNECTED"
            content={
                <Wrapper  style = {{['padding'as any] : '6.25rem 0'}}>
                    <div>
                    {
                      !isEmailSubscribed?(<>
                        <StyledHeader size={2}>Join for a chance to win a free stay!</StyledHeader>
                        <p className='my-2 px-3 text-lg text-center'>Be the first to hear about exclusive offers and the latest news.</p></>
                       )
                      :
                      (
                        <>
                        
                      <StyledHeader size={2}>You're almost there!</StyledHeader>
                      <p className='my-2 px-3 text-lg text-center'>Unlock exclusive savings when you sign up for mobile alerts.</p></>
                      )
                    }
                        <MailchimpSubscribe
                            url={url}
                            render={({ subscribe, status, message }) => (
                                <SubscribeForm
                                    marginTop='3rem'
                                    status={status}
                                    message={message}
                                    setIsEmailSubscribed={setIsEmailSubscribed}
                                    onValidated={(formData: any) => {   
                                        
                                        subscribe(formData) 
                                      
                                    }}
                                 
                                
                                />
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