// Import Swiper React components
import { SwiperSlide } from 'swiper/react'
import 'swiper/css'
import React, { Component } from 'react'
import GridImage from '../GridImage'
import { StyledSwiper } from './styles'
import Swiper from 'swiper'
import { ContentfulImage } from '../../../_constants/DataTypes'
import dynamic from 'next/dynamic'

const PropertyGridItem = dynamic(() => import('../../PropertyGridItem'))

interface SwiperProps {
    items: ContentfulImage[] | any[]
    slidesPerView?: number
    slug: string
    isProperties?: boolean
    spaceBetween?: number
}

class ImageGridSlider extends Component {
    private readonly images: any
    private readonly slidesPer: number
    private readonly slug: string
    private readonly isProperties: boolean
    private readonly spaceBetween: number

    constructor(props: SwiperProps) {
        super(props)
        const {
            items,
            slidesPerView,
            slug,
            isProperties = false,
            spaceBetween = 0,
        } = props as SwiperProps

        this.isProperties = isProperties
        this.images = items
        this.slug = slug
        this.slidesPer = slidesPerView || 1
        this.spaceBetween = spaceBetween

        this.state = {
            swiper: undefined,
        }
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
                    spaceBetween={this.spaceBetween}
                    freeMode
                    grabCursor={true}
                    slidesPerView={this.slidesPer}
                    onSwiper={(swiper) => this.setState({ swiper: swiper })}
                    onUpdate={(swiper) => {
                        swiper.slideTo(0)
                    }}
                >
                    {this.images &&
                        this.images.length &&
                        this.images.map((x: any, i: number) => {
                            return (
                                <>
                                    <SwiperSlide
                                        className="next"
                                        key={Math.random() * i}
                                    >
                                        {this.isProperties ? (
                                            <PropertyGridItem propertyObj={x} />
                                        ) : (
                                            <GridImage
                                                sizes="25vw"
                                                imageObj={x}
                                                border={false}
                                                borderRadius={true}
                                            />
                                        )}
                                    </SwiperSlide>
                                </>
                            )
                        })}
                </StyledSwiper>
            </>
        )
    }
}

export default ImageGridSlider
