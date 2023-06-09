import React, { useEffect } from 'react'
import { CloseX, ImageBox, LightBoxContainer } from './styles'
import GridImage from '../UI/GridImage'

const LightBox = ({ toggle, items = null }: any) => {

    useEffect(() => {
        const body = document.querySelector('body')
        if (body) {
            body.style.overflow = 'hidden'
        }
        return () => {
            if (body) {
                body.style.overflow = 'auto'
            }
        }
    }, [])

    return (
        <LightBoxContainer>
            <CloseX onClick={() => toggle(false)}>
                <svg viewBox="0 0 42 42"><polyline points="1 1, 40 40" /><polyline points="40 1, 1 40" /></svg>
            </CloseX>
            <ImageBox>
                {items && items.length && items.map((image: any) => {return <GridImage ratio="natural" imageObj={image} />})}
            </ImageBox>
        </LightBoxContainer>
    )
}

export default LightBox
