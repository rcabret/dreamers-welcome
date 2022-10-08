// Import Swiper React components
import { SwiperSlide } from 'swiper/react'
import 'swiper/css'
import React, { Component, ReactComponentElement, ReactNode } from 'react'
import GridImage from '../GridImage'
import { StyledSwiper } from './styles'
import Swiper, { Navigation } from 'swiper'
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

class ImageSlider extends Component {
    private readonly images: any
    private readonly slidesPer: number
    private readonly slug: string
    private readonly isProperties: boolean

    constructor(props: SwiperProps) {
        super(props)
        const { items, slidesPerView, slug, isProperties = false, spaceBetween = 0 } = props as SwiperProps;
        this.isProperties = isProperties
        this.images = items
        this.slug = slug
        this.slidesPer = slidesPerView || 1
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
                    spaceBetween={this.props.spaceBetween}
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

export default ImageSlider
