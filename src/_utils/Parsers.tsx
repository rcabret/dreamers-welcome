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
    if (testString.indexOf('$') > -1) {
        return (
            <>
                <SmallSpan size={size}>$</SmallSpan>
                {x.replace('$', '')}
            </>
        )
    }
    if (testString.indexOf('AM') > -1 || testString.indexOf('am') > -1) {
        return (
            <>
                {x.replace('AM', '')}
                <SmallSpan size={size}>AM</SmallSpan>
            </>
        )
    }
    if (testString.indexOf('PM') > -1 || testString.indexOf('pm') > -1) {
        return (
            <>
                {x.replace('PM', '')}
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
