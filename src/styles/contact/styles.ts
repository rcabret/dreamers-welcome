import styled from 'styled-components'
import { rem } from 'polished'

export const FormContainer = styled.div`
    max-width: ${rem(700)};
    margin: ${rem(40)} auto;
    padding: ${rem(40)};
    border-radius: ${rem(10)};
    border: 1px solid #c1c1c1;
    margin-bottom: ${rem(100)};

    input,
    select,
    textarea {
        width: 100%;
        outline: none;
        box-shadow: none;
        border: 1px solid #c1c1c1;
        font-size: ${rem(18)} !important;
        display: block;
        margin-top: ${rem(20)};
        font-family: 'Yellix', sans-serif !important;
        padding: ${rem(10)} ${rem(20)};
        background: rgba(217, 217, 217, 0.45);
    }

    textarea {
        padding: ${rem(20)};
        resize: none;
    }

    input[type='submit'] {
        background: black;
        border-radius: ${rem(40)};
        color: white;
    }

    h4,
    h2 {
        text-align: center;
        margin-bottom: ${rem(40)};
        display: inline-block;
        width: 100%;
    }

    h2 {
        margin-top: ${rem(40)};
        padding-bottom: ${rem(30)};
        border-bottom: 1px solid #c1c1c1;
        margin-bottom: ${rem(40)};
    }
`

export const StyledInput = styled.input`
    border-radius: ${rem(40)};
    height: ${rem(50)};
    padding: ${rem(20)};
`

export const StyledSelect = styled.select`
    border-radius: ${rem(40)};
    height: ${rem(50)};

    option:disabled {
        color: #c1c1c1 !important;
    }

    label {
        position: relative;
    }
    label:after {
        right: 80px;
    }
`

export const StyledTextarea = styled.textarea`
    border-radius: ${rem(10)};
    height: ${rem(150)};
`
