import React, { useContext, useEffect, useState } from 'react'
import BodyText from '../Typography/BodyText'
import Header from '../Typography/Header'
import GridImage from '../UI/GridImage'
import moment from 'moment'
import { News } from '../../_constants/DataTypes'
import { ItemWrapperStyled, NewsTextWrapper } from './styles'
import { viewportContext } from '../../_utils/ViewportProvider'
import { getNews, getNewsEntry } from '../../_lib/api'

const NewsItem = ({ newsObj }: { newsObj: News }) => {

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
        const filteredArray = newsData.filter(item => item.fields.title == title);
        const sys = filteredArray.map((x: { sys: string }) => x.sys.id)
        setId(sys)
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }

    fetchData();
  }, []);

  return (
    slug ? (
      <a href={slug} target='_blank'>
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
          href={`/news/${id}`}
        >
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
