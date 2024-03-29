import React, { useEffect, useState } from 'react'
import InputField from '../UI/InputField'
import styled from 'styled-components'
import { rem } from 'polished'
import { userAgent } from 'next/server'







const StyledButtonInput = styled(InputField)` 
    cursor: pointer;

    svg {
        width: 24px;
        height: 24px;
        position: relative;
        top: 2px;

        path {
            fill: #1a1a1a;
        }
    }

    &:disabled {
        svg {
            path {
                fill: #c1c1c1;
            }
        }
    }
`
const Form = styled.form`
        width: 100%;
        max-width: ${rem(800)};
        margin: 0 auto;

        > div {
            position: relative;
            width: 100%;
        }
    `

const SubscribeForm = ({marginTop,  status, message, onValidated }: any) => {

    var status 
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('');
    const [placeholder, setPlaceholder] = useState('Enter your email')
    const [phonePlaceholder,setPhonePlaceholder]=useState('Enter mobile number (XXX) XXX-XXXX')
    // const [placeholder, setPlaceholder] = useState('👍')

  

  
    // const handleSubmit = (e: any) => {
    //     e.preventDefault()
    //     email &&
    //         email.indexOf('@') > -1 &&
    //         onValidated({
    //             EMAIL: email,
    //         })
    // }




    const isEmailValid = (email:any) => {
        return   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    };
    const isPhoneNumberValid = (phone:any) => {
        return /^\+?1?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/.test(phone);
    };
    

    const handleSubmit = (e: any) => {
        e.preventDefault();
   
        if (!isEmailValid(email)) {
            window.alert('Email is not in correct format');
            return;
        }
    
        if (!isPhoneNumberValid(phone)) {
               window.alert('Phone number is not valid');
            return;
        }
    

        onValidated({
            EMAIL: email,
            SMSPHONE: phone 
        });
    };
    
useEffect(()=>{

if(status==='error'){
    if(message==='There was an error, please try again later'){
        window.alert('Network issue')
    }else{
        if(message==='An unexpected error occurred during sms opt-in')
        {
        window.alert('Check your number is correct?')
        } else{
         window.alert(message)
    } }
}
},[status])

    // const handleSubmit = (e: any) => {
    //     e.preventDefault();
    //     if (email && email.indexOf('@') > -1) {
    //         onValidated({
    //             EMAIL: email,
    //             SMSPHONE: phone 
    //         });
    //     }
    // };



    useEffect(() => {
        console.log("status---",status)
        if (status === 'success') {
            setEmail('')
            setPhone('')
            setPlaceholder('THANKS FOR SUBSCRIBING!')
            setPhonePlaceholder('THANKS FOR SUBSCRIBING!')
            setTimeout(() => {
                setPlaceholder('Enter your email')
                setPhonePlaceholder('Enter mobile number (XXX) XXX-XXXX')
            }, 3000)
        }
    }, [message, status])


   

    return (
        <Form style={{['margin-top' as any]: marginTop}} onSubmit={(e) => handleSubmit(e)} className='subscribe'>
            <div className='newsletter_wrapper'>
                <InputField
                    onChangeHandler={setEmail}
                    type="email"
                    value={email}
                    placeholder={placeholder}
                    isRequired
                />
             <div className='mobile_input'>
                   <InputField
                onChangeHandler={setPhone}
                type="tel"
                value={phone}
                placeholder={phonePlaceholder}
                isRequired
                />
             </div>
               <div className='submit_btn'>
               <StyledButtonInput
                    type="submit"
                    formValues={[email,phone]}
                    label={"Submit"
                //        <span> Submit
                //          <svg
                //        xmlns="http://www.w3.org/2000/svg"
                //        fillRule="evenodd"
                //        clipRule="evenodd"
                //        viewBox="0 0 512 376.83"
                //    >
                //        <path
                //            fillRule="nonzero"
                //            d="M355.12 372.7a12.026 12.026 0 0 1-17.09 1.06c-5-4.47-5.46-12.2-1.04-17.25l136.05-155.82H12.15c-6.71 0-12.15-5.5-12.15-12.28 0-6.77 5.44-12.27 12.15-12.27h460.9L336.99 20.32c-4.42-5.05-3.96-12.78 1.04-17.25 5.01-4.47 12.66-4 17.09 1.05l153.67 176c4.17 4.55 4.33 11.64.17 16.39L355.12 372.7z"
                //        />
                //    </svg>
                //    </span>
                    }
                />
               </div>
            </div>
        </Form>
    )
}

export default SubscribeForm
