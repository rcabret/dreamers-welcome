import React, { useEffect, useState } from 'react'
import InputField from '../UI/InputField'
import styled from 'styled-components'
import { rem } from 'polished'
import  toast ,{ Toaster } from 'react-hot-toast'



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

const SubscribeForm = ({marginTop,  status, message, onValidated,setIsEmailSubscribed, setisCompleted }: any) => {

    var status 
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('');
    const [phonePlaceholder,setPhonePlaceholder]=useState('Enter your mobile number')
    const [isEmailSubscribedIn,setIsEmailSubscribedIn] = useState(false)
    const [storeEmail,setStoreEmail]= useState('')
    const [isValid,setIsValid]=useState(false)
    const [complete,setcomplete]=useState(false)

  


    const handleSubmit = (e: any) => {
      e.preventDefault();
      console.log('check is email subscribed =====',isEmailSubscribedIn)
   
        if(email==='test@gmail.com'){
            return toast.error("This email cannot be added to this list. Please enter a different email address.")
            // window.alert('This email cannot be added to this list. Please enter a different email address.')
        }
        if(isValid===true){
            onValidated({
                EMAIL: email,
                SMSPHONE: phone 
            });
        }

        if(phone){
            setcomplete(true)
        }else{
            setStoreEmail(email)
        }
            
    };


console.log("email ----->",storeEmail)


useEffect(()=>{
if(status==='error'){
    if(message==='There was an error, please try again later'){
   
       toast.error('Network issue')
    }else{
        if(message==='An unexpected error occurred during sms opt-in')
        {
       toast.error('Check your number is correct?')
        } else{   
        toast.error(message)
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
        // setStoreEmail(email)
        if(isEmailSubscribedIn===true){
            if(complete===true){
                setisCompleted(true)
                setIsEmailSubscribed(false)
            }
        }
        setIsEmailSubscribedIn(true) 
        setIsEmailSubscribed(true)
        }
    }, [message, status])

 

const handleEmailValidityChange = (isValid: boolean) => {
    setIsValid(isValid)
};

const handleChange = (value: string) => {
    setEmail(value);
  };



  const handleChange2 = (value: string) => {
    
    const numericValue = value.replace(/\D/g, '');
    let formattedPhoneNumber = '';
    if (numericValue.length <= 3) {
        formattedPhoneNumber = numericValue;
    } else if (numericValue.length <= 6) {
        formattedPhoneNumber = `(${numericValue.slice(0, 3)}) ${numericValue.slice(3)}`;
    } else {
        formattedPhoneNumber = `(${numericValue.slice(0, 3)}) ${numericValue.slice(3, 6)}-${numericValue.slice(6, 10)}`;
    }

    setPhone(formattedPhoneNumber);
};

console.log('is valid in the subscription ----',isValid)
    

console.log("subscribed or not ---",isEmailSubscribedIn)


    return (<>
    { isEmailSubscribedIn===false ?(
        <Form style={{['margin-top' as any]: marginTop}} onSubmit={(e) => handleSubmit(e)} className='subscribe'>
            <div className='newsletter_wrapper'>
            <div className='mobile_input'>
            <InputField
           //   label="Email"
                type="email"
                value={email}
                onChangeHandler={handleChange} 
                placeholder="Enter your email"
                isRequired={true}
                name="email"
                onValidityChange={handleEmailValidityChange}
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
                    // disabled={!isValid}
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
                onChangeHandler={(value: string) => handleChange2(value)} 
                type="tel"
                value={phone}
                placeholder={phonePlaceholder}
                isRequired
                // maxLength={14}
                />
             </div>
            <div className='submit_btn'>
            <button className='submit_btn' disabled={phone.length!=14} onClick={(e) => handleSubmit(e)}>SUBMIT</button>
               {/* <StyledButtonInput
                    type="submit"
                    formValues={[phone]}
                    label={"Submit" }
                /> */}
               </div>
            </div>
        
        </Form>)} 
        <Toaster  position="top-right" />
        </>
    )
}   

export default SubscribeForm
