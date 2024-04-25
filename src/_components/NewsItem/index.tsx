import React, { useContext, useEffect, useState } from 'react'
import BodyText from '../Typography/BodyText'
import Header from '../Typography/Header'
import GridImage from '../UI/GridImage'
import moment from 'moment'
import { News } from '../../_constants/DataTypes'
import { ItemWrapperStyled, NewsTextWrapper } from './styles'
import { viewportContext } from '../../_utils/ViewportProvider'
import { getNews, getNewsEntry } from '../../_lib/api'
import Link from 'next/link';

const NewsItem = ({ newsObj }: { newsObj: News }) => {
  // Check if newsObj is defined before destructuring
  if (!newsObj) {
    // Handle the case when newsObj is undefined
    return null; // Or display a placeholder or error message
  }

  const { date, title, text, titleImage, tileImage, test, slug } = newsObj

  const [_res, setRes] = useState()
  const [id, setId] = useState();
  const _test = test && test.join(', ')

  const stringDate = moment(date).format('MMMM Do YYYY')
  const breakpoint = useContext(viewportContext)

  useEffect(() => {
    async function fetchData() {
      try {
        const newsData = await getNews();
        setRes(newsData);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }

    fetchData();
  }, []);


  useEffect(() => {
    const filteredArray = _res?.filter(item => item.fields.title == title);

    if(!filteredArray) return

    const sys = filteredArray.map((x: { sys: string }) => x.sys.id)
    setId(sys)
  }, [_res, title])

  const handleClick = async () => {
    const filteredArray = _res.filter(item => item.fields.title == title);
    const sys = filteredArray.map((x: { sys: string }) => x.sys.id)

    setId(sys)
  }

  let default_slug = 'field'


  return (
    slug ? (
      <a href={slug?.startsWith('http') ? slug : `/news/${slug}`}  target={slug.startsWith('http') ? '_blank' : '_self'} className='news_anchor'>
        <div className="border">
          <Header size={3} className='grid_heading'>{title}</Header>
          <GridImage border={false} imageObj={titleImage ? titleImage : tileImage} className='grid_image' />
          <div className='grid_head'>
            <div className='mt-custom1'>
              <BodyText size="sm" className='mb-2'>{moment(date).format('MMMM Do YYYY')}</BodyText>
              {test && <BodyText size="sm" className='mb-2'>Categories: {test.join(', ')}</BodyText>}
            </div>
          </div>
          {/* {breakpoint !== 'mobile' && ( */}
          <NewsTextWrapper className='grid_desc'>

            {/* <BodyText size="sm" className='mb-2'>Categories: {_test}</BodyText> */}
            <BodyText size='sm' className='grid_body'>{text}</BodyText>
          </NewsTextWrapper>
          {/* )} */}

        </div>
      </a> 
      
    )
      :
      (
        <a
        onClick={handleClick}
        // href={`/news/${id}`}
        href={`/news/${default_slug}?Id=${id}`}
        className='news_anchor' >
          {/* <ItemWrapperStyled> */}
          <div className="border">
            <Header size={3} className='grid_heading'>{title}</Header>
            <GridImage border={false} imageObj={titleImage ? titleImage : tileImage} className='grid_image' />
            <div className='grid_head'>
              <div className='mt-custom1'>
                <BodyText size="sm" className='mb-2'>{moment(date).format('MMMM Do YYYY')}</BodyText>
                {test && <BodyText size="sm" className='mb-2'>Categories: {test.join(', ')}</BodyText>}
              </div>
            </div>
            {/* {breakpoint !== 'mobile' && ( */}
            <NewsTextWrapper className='grid_desc'>

              {/* <BodyText size="sm" className='mb-2'>Categories: {_test}</BodyText> */}
              <BodyText size='sm' className='grid_body'>{text}</BodyText>
            </NewsTextWrapper>
            {/* )} */}

          </div>
          {/* </ItemWrapperStyled> */}
        </a>
      )

  )
}

export default NewsItem
