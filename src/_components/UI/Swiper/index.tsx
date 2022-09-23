// Import Swiper React components
import { SwiperSlide } from 'swiper/react'
import 'swiper/css'
import React, { Component } from 'react'
import GridImage from '../GridImage'
import { StyledSwiper } from './styles'
import Swiper, { Navigation } from 'swiper'
import { ContentfulImage } from '../../../_constants/DataTypes'

interface SwiperProps {
    items: ContentfulImage[]
    slidesPerView?: number
    slug: string
}
class ImageSlider extends Component {
    private readonly images: any
    private readonly slidesPer: number
    private readonly slug: string
    private readonly widthQuery?: number

    constructor(props: SwiperProps) {
        super(props)
        const { items, slidesPerView, slug } = props
        this.images = items
        this.slug = slug
        this.slidesPer = slidesPerView || 1
        this.widthQuery = widthQuery
        this.state = {
            swiper: undefined,
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

    componentDidUpdate(
        prevProps: Readonly<{ slug: string }>,
        prevState: Readonly<{ swiper: Swiper }>,
        snapshot?: any
    ) {
        if (prevProps.slug !== this.slug) {
            prevState.swiper.slideTo(0)
        }
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
                    /*onSlideChange={(swiper) => {
                        this.nextSlide(swiper.activeIndex)
                    }}*/
                    onSwiper={(swiper) => this.setState({ swiper: swiper })}
                    onUpdate={(swiper) => {
                        swiper.slideTo(0)
                    }}
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
                                            sizes="25vw"
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
