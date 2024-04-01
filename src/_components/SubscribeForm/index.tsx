import React, { useEffect, useState } from 'react'
import InputField from '../UI/InputField'
import styled from 'styled-components'
import { rem } from 'polished'
import { userAgent } from 'next/server'
import { error } from 'console'







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

const SubscribeForm = ({marginTop,  status, message, onValidated,setIsEmailSubscribed }: any) => {

    var status 
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('');
    const [placeholder, setPlaceholder] = useState('Enter your email')
    const [phonePlaceholder,setPhonePlaceholder]=useState('Enter mobile number (XXX) XXX-XXXX')
    const [isEmailSubscribedIn,setIsEmailSubscribedIn] = useState(false)
    const [storeEmail,setStoreEmail]= useState('')


  

  
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

      console.log('check is email subscribed =====',isEmailSubscribedIn)
     
        if(isEmailSubscribedIn===false){
            if (!isEmailValid(email)) {
                window.alert('Email is not in correct format');
                return;
            }
        }else{
            setEmail(storeEmail)
            if (!isPhoneNumberValid(phone)) {
                window.alert('Phone number is not valid');
             return;
         }
         
        }

        if(email==='test@gmail.com'){
            window.alert('This email cannot be added to this list. Please enter a different email address.')
        }else{
            setStoreEmail(email)
            onValidated({
                EMAIL: email,
                SMSPHONE: phone 
            });
        }
    
    };


console.log("email ----->",storeEmail)


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
            }
    }
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
                setIsEmailSubscribedIn(true) 
                setIsEmailSubscribed(true)
                if(isEmailSubscribedIn===false){
                    setPhonePlaceholder('Enter mobile number (XXX) XXX-XXXX')
                }
               
            },3000 );
            // setTimeout(() => {
            //     setPlaceholder('Enter your email')
            //     setPhonePlaceholder('Enter mobile number (XXX) XXX-XXXX')
            // }, 2000)
        }
    }, [message, status])

   



console.log("sucscribeed ----",isEmailSubscribedIn)


    return (<>
    { isEmailSubscribedIn===false ?(
        <Form style={{['margin-top' as any]: marginTop}} onSubmit={(e) => handleSubmit(e)} className='subscribe'>
            <div className='newsletter_wrapper'>
            <div className='mobile_input'>
             <InputField
             onChangeHandler={setEmail}
             type="email"
            
             value={email}
             placeholder={placeholder}
             isRequired
            />
               </div>
             {/* <div className='mobile_input'>
                   <InputField
                onChangeHandler={setPhone}
                type="tel"
                value={phone}
                placeholder={phonePlaceholder}
                isRequired
                />
             </div> */}
               <div className='submit_btn'>
               <StyledButtonInput
                    type="submit"
                    formValues={[email]}
                    label={"Submit"}
                />
               </div>
            </div>
        </Form>
        )
        : (
        <Form style={{['margin-top' as any]: marginTop}} onSubmit={(e) => handleSubmit(e)} className='subscribe'>
            
            <div className='newsletter_wrapper'>
       
             <div className='mobile_input'>
                <InputField
                onChangeHandler={setPhone} 
                type="tel"
                value={phone}
                placeholder={phonePlaceholder}
                isRequired
                maxLength={10}
                />
             
             </div>
            <div className='submit_btn'>
            <button className='submit_btn' disabled={!phone} onClick={(e) => handleSubmit(e)}>SUBMIT</button>
                
               {/* <StyledButtonInput
                    type="submit"
                    formValues={[phone]}
                    label={"Submit" }
                /> */}
               </div>
            </div>
        </Form>)} 
        </>
    )
}

export default SubscribeForm
