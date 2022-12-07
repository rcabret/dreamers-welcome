import styled from 'styled-components'
import { rem } from 'polished'
import DWLogo from '../UI/Icons/DWLogo'
import Button from '../UI/Buttons/Button'
import { BREAKPOINTS } from '../../_constants/brekpoints'

export const FooterStyled = styled.footer`
    height: ${rem(350)};
    border-top: ${rem(1)} solid #c1c1c1;
    padding: ${rem(30)};
    position: relative;
    background: white;

    ul {
        list-style: none;
        margin-top: ${rem(10)};
        margin-right: 7vw;
        margin-bottom: ${rem(20)};

        li {
            display: block;
        }
    }

    @media (max-width: ${BREAKPOINTS.TABLET}) {
        height: ${rem(450)};
    }
`

export const StyledFooterLogo = styled(DWLogo)`
    height: ${rem(40)};
    left: ${rem(30)};
    top: ${rem(20)};
    position: absolute;
`

export const LeftLinks = styled.div`
    float: left;
    margin-left: ${rem(140)};

    ul {
        margin-top: 0;
        float: left;
        font-size: ${rem(20)};
        font-weight: 300;

        li {
            margin-bottom: ${rem(6)};
            display: block;
        }
    }

    @media (max-width: ${BREAKPOINTS.TABLET}) {
        margin-left: 0;
        margin-top: ${rem(80)};

        ul {
            width: 100%;
        }
    }
`

export const ContactUs = styled(Button)`
    position: absolute !important;
    right: ${rem(30)};
    top: ${rem(30)};
`

export const Copyright = styled.span`
    position: absolute;
    bottom: ${rem(30)};
    left: ${rem(30)};
    color: #575757;
`

export const Policies = styled.span`
    position: absolute;
    left: ${rem(30)};
    margin-left: ${rem(140)};
    bottom: ${rem(30)};
    color: #575757;

    a:hover {
        text-decoration: underline;
    }
`
