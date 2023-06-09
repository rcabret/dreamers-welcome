// Import Swiper React components
import { SwiperSlide } from 'swiper/react'
import 'swiper/css'
import React, { Component } from 'react'
import GridImage from '../GridImage'
import { NavigationWrap, StyledSwiper } from './styles'
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
    fixedHeight?: number
}

class ImageGridSlider extends Component {
    private readonly images: any
    private readonly slidesPer: number | string
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
            fixedHeight,
        } = props as SwiperProps

        this.isProperties = isProperties
        this.images = items
        this.slug = slug
        this.slidesPer = slidesPerView || 'auto'
        this.spaceBetween = spaceBetween

        this.state = {
            swiper: undefined,
            height: fixedHeight,
        }
    }

    componentDidUpdate(
        prevProps: Readonly<{ slug: string; fixedHeight: number }>,
        prevState: Readonly<{ swiper: Swiper }>,
        snapshot?: any
    ) {
        if (prevProps.fixedHeight !== this.props.fixedHeight) {
            this.setState({
                height: this.props.fixedHeight,
            })
        }

        if (prevProps.slug !== this.slug) {
            prevState.swiper.slideTo(0)
        }
    }

    nextSlide() {
        if (this.state.swiper) {
            const { activeIndex, isBeginning, isEnd } = this.state.swiper
            // @ts-ignore
            const { items } = this.props
            const nextIndex =
                activeIndex + 1 <= items.length ? activeIndex + 1 : activeIndex
            this.state.swiper.slideTo(nextIndex)
        }
    }

    prevSlide() {
        if (this.state.swiper) {
            const { activeIndex, isBeginning, isEnd } = this.state.swiper
            // @ts-ignore
            const { items } = this.props
            const nextIndex = activeIndex - 1 < 0 ? 0 : activeIndex - 1
            this.state.swiper.slideTo(nextIndex)
        }
    }

    render() {
        return (
            <>
                <NavigationWrap className="navigation-wrap">
                    <div onClick={() => this.prevSlide()}>
                        <svg viewBox="0 0 8 16"> <polyline points="0 0, 8 8, 0 16" /> </svg>
                    </div>
                    <div onClick={() => this.nextSlide()}>
                        <svg viewBox="0 0 8 16"><polyline points="0 0, 8 8, 0 16" /></svg>
                    </div>
                </NavigationWrap>
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
                                        key={`${this.slug}-${
                                            Math.random() * i
                                        }`}
                                    >
                                        {this.isProperties ? (
                                            <PropertyGridItem collapsed propertyObj={x} />
                                        ) : (
                                            <GridImage
                                                fixedHeight={this.state.height}
                                                sizes="50vw"
                                                ratio="natural"
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
