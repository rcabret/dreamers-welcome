import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import BodyText from '../../_components/Typography/BodyText'
import Header from '../../_components/Typography/Header'
import GridImage from '../../_components/UI/GridImage'
import { GuidesMetadata } from '../../_components/GuideItem/styles'
import { getNewsEntry } from '../../_lib/api'
import { Content, TopSection } from '../../styles/global'
import moment from 'moment'

const NewsItemDetails = ({ setNavTheme }: any) => {
  useEffect(() => {
    setNavTheme('dark')
  }, [])

  const [_res, setRes] = useState([])
  const router = useRouter();
  const [date, setDate] = useState();
  const [text, setText] = useState();
  const [test, setTest] = useState();
  const [titleImage, setImage] = useState();
  const [title, setTitle] = useState();
  const [description, setDesc] = useState();
  const { id } = router.query;

  useEffect(() => {
    async function fetchData(id: any) {
      try {

        const newsData = await getNewsEntry(id);
        setRes(newsData);
        setTest(newsData?.test)
        setDate(newsData?.date)
        setText(newsData?.text)
        setImage(newsData?.titleImage)
        setTitle(newsData?.title)
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }
    fetchData(id);
  }, [router]);

  
  return (
    <>
      <div style={{ width: '60%', height: '50%', alignItems: 'center', marginLeft: '20%' }}>
        <Content padding>
          <TopSection padding>
            <Header size={2} uppercase bold className='text-center mb-2'>
              {title}
            </Header>
            <hr/>
            <BodyText size="sm"  className='mb-2 mt-2'>{moment(date).format('MMMM Do YYYY')} Categories: {test}</BodyText>
            <hr/>{/* <nav className={'breadcrumbs'} aria-label="breadcrumbs"><ol className={'_2jvtI'}><li><a href="/">Home</a></li><li>{'>'}</li><li>News</li></ol></nav> */}
          </TopSection>
          <GridImage
            sizes={'33vw'}
            imageObj={titleImage}
            metadata={
              <GuidesMetadata>
                <BodyText> </BodyText>
                <BodyText size="md">{text}</BodyText>
              </GuidesMetadata>
            }
          />
        </Content>
      </div>
    </>
  )
}

export default NewsItemDetails
