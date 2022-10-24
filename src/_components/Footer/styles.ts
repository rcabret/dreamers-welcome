import styled from 'styled-components'
import { rem } from 'polished'
import DWLogo from '../UI/Icons/DWLogo'
import Button from '../UI/Buttons/Button'

export const FooterStyled = styled.footer`
    height: ${rem(350)};
    border-top: ${rem(1)} solid #c1c1c1;
    padding: ${rem(30)};
    position: relative;
    background: white;

    ul {
        list-style: none;
        margin-top: ${rem(10)};

        li {
            float: left;
            margin-right: 5vw;
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
    display: flex;
    align-items: center;
    margin-left: 8vw;

    ul {
        margin-top: 0;
        width: 20%;
        float: left;
        font-size: ${rem(20)};
        font-weight: 300;

        li {
            margin-bottom: ${rem(6)};
        }
    }
`

export const ContactUs = styled(Button)`
    position: absolute;
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
    margin-left: ${rem(20)};

    a:hover {
        text-decoration: underline;
    }
`
