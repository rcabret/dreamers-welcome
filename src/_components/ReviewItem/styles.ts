import styled from 'styled-components'
import { ItemWrapper } from '../../styles/global'
import { rem } from 'polished'

export const ItemWrapperStyled = styled(ItemWrapper)`
    padding: ${rem(10)};
    border-radius: ${rem(20)};
    box-shadow: 0 20px 50px rgba(18, 17, 39, 0.08);
`

export const TopSection = styled.div`
    margin-bottom: ${rem(20)};

    section {
        margin-left: ${rem(10)};
        display: inline-block;
        vertical-align: top;
        margin-top: ${rem(20)};

        p:first-child {
            margin-bottom: ${rem(8)};
            color: #1a1a1a;
        }

        p {
            color: #c1c1c1;
        }
    }
`

export const ImageWrapper = styled.div`
    overflow: hidden;
    display: inline-block;
    border-radius: 50%;
    width: ${rem(80)};
    height: ${rem(80)};
`
