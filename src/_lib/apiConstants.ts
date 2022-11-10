export const getPostUrl = () => {
    return `https://dreamerswelcome.us10.list-manage.com/subscribe/post?u=${process.env.NEXT_PUBLIC_REACT_APP_MAILCHIMP_U}&id=${process.env.NEXT_PUBLIC_REACT_APP_MAILCHIMP_ID}`
}

export const getBurnerEmailPassword = () => {
    return process.env.BURNER_EMAIL_PW;
}
