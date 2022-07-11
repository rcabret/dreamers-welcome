// Import Swiper React components
import { SwiperSlide } from 'swiper/react'
import 'swiper/css'
import React, { Component } from 'react'
import GridImage from '../GridImage'
import { StyledSwiper } from './styles'
import { Navigation } from 'swiper'
import { ContentfulImage } from '../../../_constants/DataTypes'

interface SwiperProps {
    items: ContentfulImage[]
    slidesPerView?: number
}
class ImageSlider extends Component {
    private readonly images: any
    private readonly slidesPer: number

    constructor(props: SwiperProps) {
        super(props)
        const { items, slidesPerView } = props
        this.images = items
        this.slidesPer = slidesPerView || 1
        this.state = {
            activeIndex: 0,
        }
    }

    nextSlide = (index: number) => {
        let nextIndex: number
        if (index == 0) {
            nextIndex = this.images.length - 1
        } else {
            nextIndex = index - 1 >= this.images.length ? 0 : index - 1
        }
        this.setState({
            activeIndex: nextIndex,
        })
    }

    render() {
        return (
            <>
                <StyledSwiper
                    loop={false}
                    spaceBetween={20}
                    freeMode
                    grabCursor={true}
                    slidesPerView={this.slidesPer}
                    onSlideChange={(swiper) =>
                        this.nextSlide(swiper.activeIndex)
                    }
                   /* navigation={true}
                    modules={[Navigation]}*/
                >
                    {this.images &&
                        this.images.length &&
                        this.images.map((x: ContentfulImage, i: number) => {
                            return (
                                <>
                                    <SwiperSlide
                                        className="next"
                                        key={Math.random() * i}
                                    >
                                        <GridImage
                                            sizes="75vw"
                                            imageObj={x}
                                            border={false}
                                            borderRadius={true}
                                        />
                                    </SwiperSlide>
                                </>
                            )
                        })}
                </StyledSwiper>
            </>
        )
    }
}

export default ImageSlider
