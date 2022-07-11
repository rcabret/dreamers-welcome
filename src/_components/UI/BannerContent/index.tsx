import React from 'react'
import styled from 'styled-components'
import { rem } from 'polished'
import Header from '../../Typography/Header'
import BodyText from '../../Typography/BodyText'

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

interface BannerContentProps {
    headerText: string
    headerSubheader: string
    bookNowLink?: string
    description?: string[] | string
}
const BannerContent = ({
    description,
    headerText,
    headerSubheader,
    bookNowLink,
}: BannerContentProps) => {
    return (
        <BannerContentWrap>
            <Text>
                <Header size={1} uppercase>
                    {headerText}
                </Header>
                <BodyText size="md">{headerSubheader}</BodyText>
            </Text>
            <Description>
                <BodyText size="md">
                    {Array.isArray(description)
                        ? description.map((x, i) => {
                              return `${x} ${
                                  i < description.length - 1 ? '· ' : ''
                              }`
                          })
                        : description}
                </BodyText>
            </Description>
        </BannerContentWrap>
    )
}

export default BannerContent
