import React from 'react'
import styled from 'styled-components'
import { rem } from 'polished'

const StyledInput = styled.input`
    border-radius: ${rem(40)};
    height: ${rem(50)};
    width: 100%;
    outline: none;
    box-shadow: none;
    border: 1px solid #c1c1c1;
    padding: ${rem(20)};
    font-size: ${rem(18)};
`

const StyledButton = styled.button`
    border: none;
    background: none;
    outline: none;
`

const InputField = ({
    className,
    label,
    type,
    onChangeHandler,
    value,
    isRequired,
    name,
    formValues,
    placeholder,
}: any) => {
    const validateInput = (values: any) => {
        if (
            values.some((f: any) => f === '') ||
            values[0].indexOf('@') === -1
        ) {
            return true
        } else {
            return false
        }
    }

    if (type === 'submit') {
        return (
            <StyledButton
                className={className}
                type="submit"
                disabled={validateInput(formValues)}
            >
                {label}
            </StyledButton>
        )
    } else if (type === 'textarea') {
        return (
            <label>
                {label}
                <textarea
                    onChange={(e) => onChangeHandler(e.target.value)}
                    placeholder={placeholder}
                    value={value}
                    required={isRequired}
                    className="inputField__field"
                    rows={7}
                    name={name}
                />
            </label>
        )
    } else {
        return (
            <label>
                {label && label}
                <StyledInput
                    onChange={(e) => onChangeHandler(e.target.value)}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    required={isRequired}
                    name={name}
                />
            </label>
        )
    }
}

export default React.memo(InputField)
