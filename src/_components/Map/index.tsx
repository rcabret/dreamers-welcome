import React from 'react'
import styled from 'styled-components'
import { rem } from 'polished'
import Block from '../UI/Block'
import {BREAKPOINTS} from "../../_constants/brekpoints";

const IFrameWrapper = styled.div`
    overflow: hidden;
    position: relative;
    padding-top: 55%;
    margin-top: ${rem(20)};
    border-radius: ${rem(10)};
    z-index: 1;

    iframe {
        top: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 0;
    }
  
   @media(max-width: ${BREAKPOINTS.TABLET}) {
     padding-top: 100%;
   }
`

const Map = ({ link }: any) => {
    return (
        <Block
            fullWidth
            title="LOCATION"
            noPaddingBottom
            content={
                <IFrameWrapper>
                    <iframe src={link} width="100%" height="auto" style={{ border: 0 }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </IFrameWrapper>
            }
        />
    )
}

export default Map
