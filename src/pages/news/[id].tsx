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
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import SubNavigation from '../../_components/Navigation/SubNavigation'

const links: { name: string; slug: string }[] = [
  {
    name: 'VIEW ALL',
    slug: 'view_all',
  },
  {
    name: 'ENTERTAINMENT',
    slug: 'Entertainment',
  },
  {
    name: 'SPORTS',
    slug: 'Sports',
  },
  {
    name: 'WELLNESS',
    slug: 'Wellness',
  },
  {
    name: 'WORLD AFFAIRS',
    slug: 'World Affairs',
  },
  {
    name: 'LOCAL',
    slug: 'Local',
  },
]

const NewsItemDetails = ({
  setNavTheme,
  setHeaderData,
}: {
  setNavTheme: any
  setHeaderData: any
}) => {
  useEffect(() => {
    setNavTheme('dark')
    const bucket = localStorage.getItem('bucket')
    setHeaderData({
      bucket: bucket,
    })
  }, [])

  const [_res, setRes] = useState([])
  const router = useRouter();
  const [date, setDate] = useState();
  const [text, setText] = useState();
  const [test, setTest] = useState([]);
  const [titleImage, setImage] = useState();
  const [title, setTitle] = useState();
  const [renderedHtml, setRenderedHtml] = useState<string>('');
  const [description, setDesc] = useState()
  const { id } = router.query;

  const [_news, setNews] = useState<any[]>([
  ]);

  const [_newsBottom, setNewsBottom] = useState<any[]>([
  ]);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await getNews()
        const news = res.map((x: { fields: {} }) => x.fields)
        setNews(news)
        setNewsBottom(news)
      } catch (error) {
        console.error("Error in getNews: ", error)
      }
    }
    fetchNews();
  }, [])

  const [activeSlug, setSlug] = useState<string>(
    (router.query.type as string)
  )
  const [activeNews, setActiveNews] = useState<any[]>([
    ..._news,
  ])

  useEffect(() => {
    const queryTag = (router.query.type as string)
    // @ts-ignore
    setSlug(queryTag)

    const checkForTags = (tags: any[], slug: string) => {

      // if (!tags.length) {
      //     return [..._news]
      // }
      return tags.find((tag: any) => tag === slug)
    }

    const newsToView =
      queryTag !== 'view_all'
        ? [..._news].filter((news: any) =>
          checkForTags(news.test, queryTag)
        )
        : [..._news]

    setNews(newsToView)
  }, [router, router.query])
  useEffect(() => { }, [activeNews])

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
        setDesc(newsData?.description)
        const rawRichTextField = newsData?.description;
        const htmlString = documentToHtmlString(rawRichTextField);
        setRenderedHtml(htmlString);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }
    fetchData(id);
  }, [router]);

  return (
    <>
      <div style={{ width: '90%', height: '50%', alignItems: 'center', margin: "auto", marginBottom: "4em" }} className='grid_view'>
        <Content padding>
          <a href='/news'>
            <p style={{ display: 'flex', alignItems: "center", cursor: "pointer" }}>
              <AiOutlineArrowLeft className='mr-1' />News & Updates
            </p>
          </a>
          {/* <SubNavigation
                activeSlug={activeSlug}
                data={links}
                queryParam="type"
                queryArray={'/news' || []}
            /> */}
          <TopSection padding>
            <Header size={2} uppercase className='text-center mb-2'>
              {title}
            </Header>
            <div className='mt-custom'>
              <BodyText size="md" className='mb-2'>{moment(date).format('MMMM Do YYYY')}</BodyText>
              {test && <BodyText size="md" className='mb-2'>Categories: {test.join(', ')}</BodyText>}
            </div>
            {/* <nav className={'breadcrumbs'} aria-label="breadcrumbs"><ol className={'_2jvtI'}><li><a href="/">Home</a></li><li>{'>'}</li><li>News</li></ol></nav> */}
          </TopSection>
          <GridImage
            className='grid_view_image'
            sizes={'33vw'}
            imageObj={titleImage}
            metadata={
              <GuidesMetadata>
                <div id="rich-text-body" className='htmlText' dangerouslySetInnerHTML={{ __html: renderedHtml }} />
              </GuidesMetadata>
            }
          />
        </Content>
      </div>

      {_newsBottom && (

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
              {_newsBottom && _newsBottom.length >= 4 ? (_newsBottom.sort(() => 0.5 - Math.random()).slice(0, 4).map((news: News, i: number) => (
                <NewsItem key={news.slug + i} newsObj={news}></NewsItem>)
              )) : (_news.map((news: News, i: number) => (
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