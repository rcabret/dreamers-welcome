import React, { useContext, useEffect, useState } from 'react';
import { HighlightBlurb, SliderWrap } from './styles';
import BodyText from '../../Typography/BodyText';
import ImageGridSlider from '../../UI/Swiper';
import { ContentfulImage } from '../../../_constants/DataTypes';
import Block from '../../UI/Block';
import { viewportContext } from '../../../_utils/ViewportProvider';
import MarkdownModule from '../../Typography/MarkdownModule';

interface HighlightProps {
  title: string;
  blurb: string;
  images: ContentfulImage[];
  hideSeparator?: boolean;
  slug: string;
}

const Highlight = ({
  title,
  blurb,
  images,
  hideSeparator = false,
  slug,
}: HighlightProps) => {
  const breakpoint = useContext(viewportContext);

  const getCarouselHeight = () => {
    switch (breakpoint) {
      case 'tablet':
        return 400;
      case 'mobile':
        return 300;
      case 'desktop':
      default:
        return 500;
    }
  };

  const getCenterMode = () => {
    switch (breakpoint) {
      case 'tablet':
        return false;
      case 'mobile':
        return true;
      case 'desktop':
      default:
        return false;
    }
  };

  const getBreakpoints = () => ({
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 'auto',
      spaceBetween: 15,
    },
  
  });

  const [height, setHeight] = useState(getCarouselHeight());
  const [centerMode, setCenterMode] = useState(getCenterMode());
  const [breakpoints, setBreakpoints] = useState(getBreakpoints());

  useEffect(() => {
    setHeight(getCarouselHeight());
    setCenterMode(getCenterMode());
    setBreakpoints(getBreakpoints());
  }, [breakpoint]);

  return (
    <Block
      title={title}
      fullWidth
      hideSeparator={hideSeparator}
      showOverflow
      noPaddingBottom
      content={
        <>
          <SliderWrap className="slider_wrapper">
            <ImageGridSlider
              fixedHeight={height}
              slug={slug}
              items={images}
              spaceBetween={20}
              centeredSlides={true}
              slidesOffsetBefore={10} // Add padding on the left
              slidesOffsetAfter={10}
              breakpoints={breakpoints}
            />
          </SliderWrap>
          <HighlightBlurb>
            {blurb && <MarkdownModule data={blurb} />}
          </HighlightBlurb>
        </>
      }
    />
  );
};

export default Highlight;
