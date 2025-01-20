// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import React, { Component } from 'react';
import GridImage from '../GridImage';
import { NavigationWrap, StyledSwiper } from './styles';
import Swiper from 'swiper';
import { ContentfulImage } from '../../../_constants/DataTypes';
import dynamic from 'next/dynamic';

const PropertyGridItem = dynamic(() => import('../../PropertyGridItem'));

interface SwiperProps {
  items: ContentfulImage[] | any[];
  slidesPerView?: number | 'auto';
  slug: string;
  isProperties?: boolean;
  centeredSlides?: boolean;
  spaceBetween?: number;
  fixedHeight?: number;
  slidesOffsetBefore?: number;
  slidesOffsetAfter?: number;
}

interface SwiperState {
  swiper?: Swiper;
  height?: number;
}

class ImageGridSlider extends Component<SwiperProps, SwiperState> {
  private readonly images: any[];
  private readonly slug: string;
  private readonly isProperties: boolean;
  private readonly centeredSlides: boolean;
  private readonly spaceBetween: number;
  private readonly slidesOffsetBefore: number;
  private readonly slidesOffsetAfter: number;

  constructor(props: SwiperProps) {
    super(props);

    const {
      items,
      slug,
      centeredSlides = false,
      slidesOffsetBefore = 10,
      slidesOffsetAfter = 10,
      isProperties = false,
      spaceBetween = 0,
      fixedHeight,
    } = props;

    this.images = items || [];
    this.slug = slug;
    this.isProperties = isProperties;
    this.centeredSlides = centeredSlides;
    this.spaceBetween = spaceBetween;
    this.slidesOffsetBefore = slidesOffsetBefore;
    this.slidesOffsetAfter = slidesOffsetAfter;

    this.state = {
      swiper: undefined,
      height: fixedHeight,
    };
  }

  componentDidUpdate(prevProps: SwiperProps) {
    if (prevProps.fixedHeight !== this.props.fixedHeight) {
      this.setState({ height: this.props.fixedHeight });
    }

    if (prevProps.slug !== this.slug && this.state.swiper) {
      this.state.swiper.slideTo(0);
    }
  }

  nextSlide = () => {
    const { swiper } = this.state;
    if (swiper) {
      const nextIndex = Math.min(swiper.activeIndex + 1, this.images.length - 1);
      swiper.slideTo(nextIndex);
    }
  };

  prevSlide = () => {
    const { swiper } = this.state;
    if (swiper) {
      const prevIndex = Math.max(swiper.activeIndex - 1, 0);
      swiper.slideTo(prevIndex);
    }
  };

  render() {
    const { height } = this.state;

    // Define responsive breakpoints for slidesPerView and spaceBetween
    const breakpoints = {
      320: {
        spaceBetween: 15,
      },
      768: {
        spaceBetween: 15,
      },
      1024: {
        spaceBetween: 20,
      },
    };

    return (
      <>
        {this.images.length > 1 && (
          <NavigationWrap className="navigation-wrap">
            <div onClick={this.prevSlide}>
              <svg viewBox="0 0 8 16">
                <polyline points="0 0, 8 8, 0 16" />
              </svg>
            </div>
            <div onClick={this.nextSlide}>
              <svg viewBox="0 0 8 16">
                <polyline points="0 0, 8 8, 0 16" />
              </svg>
            </div>
          </NavigationWrap>
        )}
        <StyledSwiper
          loop={false}
          spaceBetween={this.spaceBetween}
        //   slidesOffsetBefore={this.slidesOffsetBefore}
        //   slidesOffsetAfter={this.slidesOffsetAfter}
          grabCursor={true}
          slidesPerView={'auto'}
          centeredSlides={this.centeredSlides}
          breakpoints={breakpoints} // Pass breakpoints to Swiper
          onSwiper={(swiper) => this.setState({ swiper })}
        >
          {this.images.map((x, i) => (
            <SwiperSlide key={`${this.slug}-${i}`}>
              {this.isProperties ? (
                <PropertyGridItem collapsed propertyObj={x} />
              ) : (
                <GridImage
                  sizes="100vw"
                  fixedHeight={height}
                  ratio="natural"
                  imageObj={x}
                  border={false}
                  borderRadius={true}
                />
              )}
            </SwiperSlide>
          ))}
        </StyledSwiper>
      </>
    );
  }
}

export default ImageGridSlider;
