import styled from 'styled-components'
import { rem } from 'polished'
import BodyText from '../../_components/Typography/BodyText'
import {BREAKPOINTS} from "../../_constants/brekpoints";

export const FormContainer = styled.div`
    max-width: ${rem(700)};
    min-height: ${rem(700)};
    margin: ${rem(40)} auto;
    padding: ${rem(40)};
    border-radius: ${rem(10)};
    border: 1px solid #c1c1c1;
    margin-bottom: ${rem(100)};
  
  
  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    padding: ${rem(20)};
  }

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

    input[type='submit'],
    input[type='submit']:active {
        background: #1a1a1a;
        border: 1px solid #1a1a1a;
        border-radius: ${rem(40)};
        color: white;
        cursor: pointer;
        transition: 0.3s;
        margin-top: ${rem(40)};
    }

    input[type='submit']:hover {
        background: white;
        border-radius: ${rem(40)};
        color: #1a1a1a;
    }

    input[type='submit']:disabled {
        background: #d9d9d9 !important;
        border: 1px solid #d9d9d9 !important;
        cursor: default !important;
        color: white !important;
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

    p {
        padding-left: ${rem(20)};
        margin-top: ${rem(10)};
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
  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Safari and Chrome */
  appearance: none;
  cursor: pointer;
  color: #7a7a7a !important;

  label {
    position: relative;
  }

  label:after {
    right: 80px;
  }
`

export const StyledTextarea = styled.textarea`
    border-radius: ${rem(10)};
    height: ${rem(200)};
`

export const StyledSelectWrapper = styled.div`
    position: relative;

    svg {
        position: absolute;
        right: ${rem(18)};
        top: ${rem(3)};
        height: 100%;
        width: ${rem(20)};
    }
`

export const StyledSuccessBodyText = styled(BodyText)`
    max-width: ${rem(700)};
    margin: 0 auto;
    text-align: center;
    padding-top: ${rem(200)};
`
