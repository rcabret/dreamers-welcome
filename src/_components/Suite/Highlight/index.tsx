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
      spaceBetween: 10,
      centeredSlides:true
    },
    768: {
      spaceBetween: 15,
      centeredSlides:false
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
              breakpoints={breakpoints}
            />
          </SliderWrap>
          <HighlightBlurb>
            {blurb && <div className='mobile_content'><MarkdownModule data={blurb} /></div>}
          </HighlightBlurb>
        </>
      }
    />
  );
};

export default Highlight;
