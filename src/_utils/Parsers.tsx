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
    const hrsReg = /HRS|hrs/
    const hrReg = /HR|hr/
    const mnsReg = /MNS|mns/

    if (testString.indexOf('$') > -1) {
        return (
            <>
                <SmallSpan size={size}>$</SmallSpan>
                {x.replace('$', '')}
            </>
        )
    }

    let r: { reg: RegExp; string: string } | null = null
    if (amReg.test(x)) {
        r = {
            reg: amReg,
            string: 'AM',
        }
    } else if (pmReg.test(x)) {
        r = {
            reg: pmReg,
            string: 'PM',
        }
    } else if (hrsReg.test(x)) {
        r = {
            reg: hrsReg,
            string: 'HRS',
        }
    } else if (mnsReg.test(x)) {
        r = {
            reg: mnsReg,
            string: 'MNS',
        }
    } else if (hrReg.test(x)) {
        r = {
            reg: hrReg,
            string: 'HR',
        }
    }

    if (r) {
        return (
            <>
                {x.replace(r.reg, '').trim()}
                <SmallSpan size={size}>{r.string}</SmallSpan>
            </>
        )
    } else {
        return x
    }
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

export const bucketToPath = (bucket: string) => {
    return bucket.toLowerCase().trim().replace(' ', '')
}
