// Import Swiper React components
import { SwiperSlide } from 'swiper/react'
import 'swiper/css'
import React, { Component } from 'react'
import GridImage from '../GridImage'
import { CaptionWrapper, StyledSwiper } from './styles'
import { Navigation } from 'swiper'

class ImageSlider extends Component {
    private readonly links: any

    constructor(props) {
        super(props)
        const { items } = props.data
        this.links = items.data

        this.state = {
            activeIndex: 0,
            activeCaption: this.links[0].attributes.caption,
        }
    }

    nextSlide = (index: number) => {
        let nextIndex: number
        if (index == 0) {
            nextIndex = this.links.length - 1
        } else {
            nextIndex = index - 1 >= this.links.length ? 0 : index - 1
        }
        this.setState({
            activeIndex: nextIndex,
            activeCaption: this.links[nextIndex].attributes.caption,
        })
    }

    render() {
        return (
            <>
                <StyledSwiper
                    loop={true}
                    spaceBetween={0}
                    slidesPerView={1}
                    onSlideChange={(swiper) =>
                        this.nextSlide(swiper.activeIndex)
                    }
                    navigation={true}
                    modules={[Navigation]}
                >
                    {this.links &&
                        this.links.length &&
                        this.links.map((x: {}, i) => {
                            return (
                                <SwiperSlide
                                    className="next"
                                    key={Math.random() * i}
                                >
                                    <GridImage
                                        sizes="75vw"
                                        imageObj={x}
                                        border={false}
                                        borderRadius={false}
                                    />
                                </SwiperSlide>
                            )
                        })}
                </StyledSwiper>
                <CaptionWrapper>
                    {/* @ts-ignore */}
                    <p>{this.state.activeCaption}</p>
                    <span>
                        {/* @ts-ignore */}
                        {this.state.activeIndex + 1}/{this.links.length}
                    </span>
                </CaptionWrapper>
            </>
        )
    }
}

export default ImageSlider
