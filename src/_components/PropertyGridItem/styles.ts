import styled from 'styled-components'
import { rem } from 'polished'

export const ItemWrapper = styled.div`
    border: 1px solid #c1c1c1;
    border-radius: ${rem('10px')};
    overflow: hidden;
    margin: ${rem('10px')};
`

export const Metadata = styled.aside`
    padding: ${rem('10px')} ${rem('14px')} ${rem('14px')} ${rem('14px')};

    p {
        opacity: 0.4;
    }

    h2 {
        margin-top: ${rem('10px')};
        font-size: ${rem('32px')};
        font-weight: 200;
        width: 100%;
    }
`
