import { ItemWrapper } from '../../styles/global'
import styled from 'styled-components'
import { rem } from 'polished'

export const ItemWrapperStyled = styled(ItemWrapper)`
    .border {
        padding: ${rem('14px')};
    }

    > p {
        color: #818080;
    }

    h3 {
        margin-top: ${rem('12px')};
        margin-bottom: ${rem('14px')};
    }
`

export const NewsTextWrapper = styled.div`
    margin-bottom: ${rem('14px')};
`
