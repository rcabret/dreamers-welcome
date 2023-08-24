import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import BodyText from '../../_components/Typography/BodyText'
import Header from '../../_components/Typography/Header'
import GridImage from '../../_components/UI/GridImage'
import { GuidesMetadata } from '../../_components/GuideItem/styles'
import { getNewsEntry, getNews } from '../../_lib/api'
import { Content, GridModule, StyledBlockForGrid, TopSection } from '../../styles/global'
import moment from 'moment'
import NewsItem from '../../_components/NewsItem'
import { News } from '../../_constants/DataTypes'

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
  const [_news, setNews] = useState<any[]>([
]);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await getNews()
        const news = res.map((x: { fields: {} }) => x.fields)
        setNews(news)
      } catch (error) {
        console.error("Error in getNews: ", error)
      }
    }
    fetchNews();
  }, [])

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
            <Header size={2} uppercase className='text-center mb-2'>
              {title}
            </Header>
            <hr />
            <BodyText size="md" className='mb-2 mt-2'>{moment(date).format('MMMM Do YYYY')}</BodyText>
            {test && <BodyText  size="md">Categories: {test}</BodyText>}
            <hr />{/* <nav className={'breadcrumbs'} aria-label="breadcrumbs"><ol className={'_2jvtI'}><li><a href="/">Home</a></li><li>{'>'}</li><li>News</li></ol></nav> */}
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

       {_news && (
        
        <StyledBlockForGrid
          title='MORE NEWS'
          fullWidth
          noPaddingBottom
          link="/news"
          content={
            <GridModule
              columns={4}
              sideScrollOnMobile
            >
              {/* .sort(() => 0.5 - Math.random()) */}
              {_news && _news.length >=4 ? ( _news.sort(() => 0.5 - Math.random()).slice(0,4).map((news: News, i: number) => (
                <NewsItem key={news.slug + i} newsObj={news}></NewsItem>)
              )): ( _news.map((news: News, i: number) => (
                <NewsItem key={news.slug + i} newsObj={news}></NewsItem>)
              ))}
            </GridModule>
          }
          />
            )}
    </>
  )
}
export default NewsItemDetails