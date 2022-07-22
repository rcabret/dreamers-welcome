import { ItemWrapper } from '../../styles/globla'
import styled from 'styled-components'
import { rem } from 'polished'

export const ItemWrapperStyled = styled(ItemWrapper)`
    padding: ${rem('14px')};

    > p {
        color: #818080;
    }

    h3 {
        margin-top: ${rem('12px')};
    }
`

export const NewsTextWrapper = styled.div`
    margin-top: ${'14px'};
    margin-bottom: ${rem('14px')};
`
