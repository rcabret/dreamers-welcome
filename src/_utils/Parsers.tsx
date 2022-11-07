import styled from 'styled-components'
import { rem } from 'polished'

const SmallSpan = styled.span`
    font-size: ${({ size }: { size: number }) => rem(size)} !important;
`
export const parseMoneyOrTime = (x: string, size = 20) => {
    if (x === undefined) {
        return ''
    }
    const testString = x
    const amReg = /AM|am/
    const pmReg = /PM|pm/

    if (testString.indexOf('$') > -1) {
        return (
            <>
                <SmallSpan size={size}>$</SmallSpan>
                {x.replace('$', '')}
            </>
        )
    }
    if (amReg.test(x)) {
        return (
            <>
                {x.replace(amReg, '')}
                <SmallSpan size={size}>AM</SmallSpan>
            </>
        )
    }
    if (pmReg.test(x)) {
        return (
            <>
                {x.replace(pmReg, '')}
                <SmallSpan size={size}>PM</SmallSpan>
            </>
        )
    }
    return x
}

export const pathToBucket = (bucket: string) => {
    switch (bucket) {
        default:
        case 'puertorico':
            return 'Puerto Rico'
        case 'northcarolina':
            return 'North Carolina'
    }
}
