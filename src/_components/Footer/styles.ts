import styled from 'styled-components'
import { rem } from 'polished'
import DWLogo from '../UI/Icons/DWLogo'
import Button from '../UI/Buttons/Button'
import { BREAKPOINTS } from '../../_constants/brekpoints'

export const FooterStyled = styled.footer`
  
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
        height: unset;
        padding: ${rem(10)};
        ul {
            margin-right: 5vw;
        }
        .absolute{
            position:relative;
            padding-top:3em;
            left:0px;
            padding-left: 18px;
        }
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
        padding: 0 20px;
        float: none;
        display: flex;
        margin-left: 0;
        margin-top: ${rem(100)};

        ul {
            width: 100%;
        }
    }
`

export const ContactUs = styled(Button)`
    position: absolute;
    right: ${rem(30)};
    top: ${rem(30)};

    @media (max-width: ${BREAKPOINTS.MOBILE}) {
        right: ${rem(15)};
    }
`

export const Copyright = styled.span`
    color: #575757;
`

export const Policies = styled.span`
    margin-left: 10px;
    color: #575757;

    a:hover {
        text-decoration: underline;
    }
`


