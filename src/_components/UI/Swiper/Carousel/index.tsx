// Import Swiper React components
import { SwiperSlide } from 'swiper/react'
import 'swiper/css'
import React, { Component } from 'react'
import GridImage from '../../GridImage'
import { SeeAllButton, StyledSwiper } from '../styles'
import { Navigation, Pagination } from 'swiper'
import { ContentfulImage } from '../../../../_constants/DataTypes'

interface ImageSliderProps {
    items: ContentfulImage[] | any[]
}

class ImageSlider extends Component {
    private readonly items: any

    constructor(props: ImageSliderProps) {
        super(props)
        const { items } = props
        this.items = items

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
                    onSlideChange={(swiper) =>
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
                                <SwiperSlide
                                    className="next"
                                    key={Math.random() * i}
                                >
                                    <GridImage
                                        sizes="100vw"
                                        imageObj={x}
                                        border={false}
                                        borderRadius={false}
                                    />
                                </SwiperSlide>
                            )
                        })}
                </StyledSwiper>
                <SeeAllButton onClick={() => console.log('open sesame')}>
                    All photos
                </SeeAllButton>
            </>
        )
    }
}

export default ImageSlider
