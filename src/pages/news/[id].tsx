import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import BodyText from '../../_components/Typography/BodyText'
import Header from '../../_components/Typography/Header'
import GridImage from '../../_components/UI/GridImage'
import { GuidesMetadata } from '../../_components/GuideItem/styles'
import { getNewsEntry } from '../../_lib/api'
import { Content, TopSection } from '../../styles/global'
import { log } from 'console'
import moment from 'moment'

const NewsItemDetails = ({ setNavTheme }: any) => {
  useEffect(() => {
    setNavTheme('dark')
  }, [])

  const [_res, setRes] = useState()
  const router = useRouter();
  const [date, setDate] = useState();
  const [text, setText] = useState();
  const [tileImage, setImage] = useState();
  const [title, setTitle] = useState();
  const { id } = router.query;

  useEffect(() => {
    async function fetchData(id: any) {
      try {

        const newsData = await getNewsEntry(id);
        setRes(newsData);
        setDate(newsData?.date)
        setText(newsData?.text)
        setImage(newsData?.tileImage)
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
            <Header size={4} uppercase bold>
              {title}
            </Header>
            <BodyText size="sm">{moment(date).format('MMMM Do YYYY')}</BodyText>
            {/* <nav className={'breadcrumbs'} aria-label="breadcrumbs"><ol className={'_2jvtI'}><li><a href="/">Home</a></li><li>{'>'}</li><li>News</li></ol></nav> */}
          </TopSection>
          <GridImage
            sizes={'33vw'}
            imageObj={tileImage}
            metadata={
              <GuidesMetadata>
                <BodyText> </BodyText>
                <BodyText size="sm">{text}</BodyText>
              </GuidesMetadata>
            }
          />
        </Content>
      </div>
    </>
  )
}

export default NewsItemDetails
