import React from 'react'
import styled from 'styled-components'
import { rem } from 'polished'
import Header from '../../Typography/Header'
import BodyText from '../../Typography/BodyText'
import Button from '../Buttons/Button'
import {BREAKPOINTS} from "../../../_constants/brekpoints";
//import Breadcrumbs from 'nextjs-breadcrumbs';

const BannerContentWrap = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    color: white;
`

const Text = styled.div`
    text-align: center;
    width: 100%;
    align-self: center;
    justify-content: center;

    p {
        margin-top: ${rem('20px')};
    }
`

const Description = styled.div`
    text-align: center;
    width: 100%;
    justify-content: center;
    position: absolute;
    bottom: ${rem('30px')};

    * {
        margin: 0;
        padding: 0;
    }
`

const StyledButton = styled(Button)`
    position: fixed !important;
    right: ${rem(30)};
    bottom: ${rem(26)};
    margin-left: 0;
    z-index: 90;
  
  @media(max-width: ${BREAKPOINTS.MOBILE}) {
      right: ${rem(15)};
  }
`

const OpacityLayer = styled.aside`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.12);
`

interface BannerContentProps {
    headerText: string
    headerSubheader?: string
    bookNowLink?: string
    description?: string[] | string
    showOpacity?: boolean
    ctaText?: string
}

const BannerContent = ({
    description,
    headerText,
    headerSubheader,
    bookNowLink,
    showOpacity = true,
    ctaText = 'BOOK NOW',
}: BannerContentProps) => {
    return (
        <div>
            {showOpacity && <OpacityLayer />}
            <BannerContentWrap>
                <Text>
                    <Header size={1} uppercase> {headerText} </Header>
                    {headerSubheader && ( <BodyText size="lg">{headerSubheader}</BodyText> )}
                </Text>
                {/* <Text>
                    <Header size={1} uppercase>
                    {headerText == 'travel well'? <nav className={'breadcrumbs'} aria-label="breadcrumbs"><ol className={'_2jvtI'}><li>Home</li></ol></nav>  : <nav className={'breadcrumbs'} aria-label="breadcrumbs"><ol className={'_2jvtI'}><li><a href="/">Home</a></li> <li>{'>'}</li><li>{headerText}</li></ol></nav>  }
                    </Header>
                    {headerSubheader && ( <BodyText size="lg">{headerSubheader}</BodyText> )}               
                </Text> */}

                {description && (
                    <Description>
                        <BodyText size="lg">
                            {Array.isArray(description)
                                ? description.map((x, i) => {
                                      return `${x} ${i < description.length - 1 ? '· ' : '' }`
                                  })
                                : description}
                        </BodyText>
                    </Description>
                )}
            </BannerContentWrap>
            {bookNowLink && (
                <StyledButton outsideLink href={bookNowLink}>
                    {ctaText}
                </StyledButton>
            )}
        </div>
    )
}

export default BannerContent
