// Import Swiper React components
import dynamic from 'next/dynamic'
import { SwiperSlide } from 'swiper/react'
import 'swiper/css'
import React, { Component } from 'react'
import GridImage from '../../GridImage'
const SeeAllButton = dynamic(() => import('../styles').then((module) => module.SeeAllButton));
const StyledSwiper = dynamic(() => import('../styles').then((module) => module.StyledSwiper));
import { Navigation, Pagination } from 'swiper'
import { ContentfulImage } from '../../../../_constants/DataTypes'

interface ImageSliderProps {
    items: ContentfulImage[] | any[]
    toggle: any
}

class ImageSlider extends Component {
    private readonly items: any
    private readonly toggle: any

    constructor(props: ImageSliderProps) {
        super(props)
        const { items, toggle } = props
        this.items = items
        this.toggle = toggle
        this.state = {
            activeIndex: 0,
        }
    }

    nextSlide = (index: number) => {
        let nextIndex: number
        if (index == 0) {
            nextIndex = this.items.length - 1
        } else {
            nextIndex = index - 1 >= this.items.length ? 0 : index - 1
        }
        this.setState({
            activeIndex: nextIndex,
        })
    }

    toggleLightBox = () => {
        if (typeof this.toggle === 'function') {
            this.toggle(true)
        }
    }

    pagination = {
        clickable: false,
        renderBullet: function (index: number, className: string) {
            return '<div class="' + className + '">&nbsp;</div>'
        },
    }

    render() {
        return (
            <>
                <StyledSwiper
                    loop={true}
                    spaceBetween={0}
                    slidesPerView={1}
                    onSlideChange={(swiper:any) =>
                        this.nextSlide(swiper.activeIndex)
                    }
                    navigation={true}
                    pagination={this.pagination}
                    modules={[Navigation, Pagination]}
                >
                    {this.items &&
                        this.items.length &&
                        this.items.map((x: any, i: number) => {
                            return (
                                <SwiperSlide className="next" key={Math.random() * i} >
                                    <GridImage sizes="100vw" imageObj={x} border={false} borderRadius={false} />
                                </SwiperSlide>
                            )
                        })}
                </StyledSwiper>
                <SeeAllButton onClick={() => this.toggleLightBox()}>  All photos </SeeAllButton>
            </>
        )
    }
}

export default ImageSlider
