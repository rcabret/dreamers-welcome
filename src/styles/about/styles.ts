import styled from 'styled-components'
import { rem } from 'polished'
import { BREAKPOINTS } from '../../_constants/brekpoints'

export const StaffMetadata = styled.div`
    padding: ${rem('20px')};

    p {
        margin-top: ${rem('40px')};
    }
`

export const ConceptTextContainer = styled.div`
    padding-right: ${rem(40)};

    a {
        text-decoration: underline;
    }
  
    * {
        font-size: ${rem(29)};
        max-width: ${rem(1000)} !important;
    }

    @media (max-width: ${BREAKPOINTS.TABLET}) {
        * {
            font-size: ${rem(26)};
        }
    }

    @media (max-width: ${BREAKPOINTS.MOBILE}) {
        padding-right: 0;

        * {
            font-size: ${rem(22)};
        }
    }
`
