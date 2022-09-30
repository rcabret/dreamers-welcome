import styled from 'styled-components'
import { rem } from 'polished'

const SmallSpan = styled.span`
    font-size: ${({ size }: { size: number }) => rem(size)} !important;
`
export const parseMoneyOrTime = (x: string, size = 20) => {
    const testString = x
    if (testString.indexOf('$') > -1) {
        return (
            <>
                <SmallSpan size={size}>$</SmallSpan>
                {x.replace('$', '')}
            </>
        )
    }
    if (testString.indexOf('AM') > -1) {
        return (
            <>
                {x.replace('AM', '')}
                <SmallSpan size={size}>AM</SmallSpan>
            </>
        )
    }
    if (testString.indexOf('PM') > -1) {
        return (
            <>
                {x.replace('PM', '')}
                <SmallSpan size={size}>PM</SmallSpan>
            </>
        )
    }
    return x
}
