import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import BodyText from '../../_components/Typography/BodyText'
import Header from '../../_components/Typography/Header'
import GridImage from '../../_components/UI/GridImage'
import { GuidesMetadata } from '../../_components/GuideItem/styles'
import { getNewsEntry, getNews } from '../../_lib/api'
import { Content, GridModule, StyledBlockForGrid, TopSection, BannerGridImage } from '../../styles/global'
import BannerContent from '../../_components/UI/BannerContent'
import Blurb from '../../_components/UI/Blurb'
import Block from '../../_components/UI/Block'
import { ConceptTextContainer } from '../../styles/about/styles'
import MarkdownModule from '../../_components/Typography/MarkdownModule'
import moment from 'moment'
import NewsItem from '../../_components/NewsItem'
import { News } from '../../_constants/DataTypes'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import SubNavigation from '../../_components/Navigation/SubNavigation'
import { useContentfulLiveUpdates, useContentfulInspectorMode } from '@contentful/live-preview/react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Head from 'next/head'

const links: { name: string; slug: string }[] = [
  {
    name: 'VIEW ALL',
    slug: 'view_all',
  },
  {
    name: 'NEWS',
    slug: 'News',
  },
  {
    name: 'EVENTS',
    slug: 'Events',
  },
  {
    name: 'PROMOTIONS',
    slug: 'Promotions',
  },
  {
    name: 'AWARDS',
    slug: 'Awards',
  },
  {
    name: 'PRESS',
    slug: 'Press',
  }
]

const NewsItemDetails = ({
  setNavTheme,
  setHeaderData,
  id_
}: {
  setNavTheme: any
  setHeaderData: any
  id_: any
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
  const [mobileBannerImage, setMobileImage] = useState();
  const [title, setTitle] = useState();
  const [renderedHtml, setRenderedHtml] = useState<string>('');
  const [description, setDesc] = useState()
  const { id } = router.query;
  const [_id, setId] = useState('')

  const [blurb, setBlurb] = useState()

  const [_news, setNews] = useState<any[]>([
  ]);
  const [otherNews, setOtherNews] = useState<any[]>([
  ]);
  const inspectorProps = useContentfulInspectorMode()
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
      return tags?.find((tag: any) => tag === slug)
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
        // const entries = await getNewsEntry(id);
        // const newsData = useContentfulLiveUpdates(entries);
        setRes(newsData);
        setId(id)
        setTest(newsData?.test)
        setDate(newsData?.date)
        setText(newsData?.text)
        setImage(newsData?.titleImage)
        setMobileImage(newsData?.mobileBannerImage)
        setTitle(newsData?.title)
        setDesc(newsData?.description)
        setOtherNews(newsData?.otherNews)
        setBlurb(newsData?.blurb)
        const rawRichTextField = newsData?.description;
        const htmlString = documentToHtmlString(rawRichTextField);
        setRenderedHtml(htmlString);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }
    fetchData(id);
  }, [router]);
  const options = {
    renderNode: {
      'embedded-asset-block': node => {
        const { title, description, file } = node.data.target.fields;
        const imageUrl = file.url;
        const altText = description || '';

        return  <img src={imageUrl} alt={altText} />;
      },
      'hyperlink': node => {
        const { uri } = node.data;
        return <a href={uri} target="_blank" rel="noopener noreferrer">{node.content[0].value}</a>;
      },
    },
  };
  return (
    <>
      <Head>
        <title>News | Dreamers Welcome</title>
      </Head>
      <Content padding>
        {/* <div className='grid_head border-0 mt-0'>
          <TopSection padding>
            <Header size={2} className='text-center mb-5'>
              {title}
            </Header>

          </TopSection>
        </div> */}
        <div style={{ height: '50%', alignItems: 'center', margin: "auto", marginBottom: "4em" }} className='grid_view'>
          <Block
            className='text_wrapper_1'
            content={
              <ConceptTextContainer className='text_wrapper'>
                <Header className='header-in-block' {...inspectorProps({
                  entryId: _id,
                  fieldId: 'title',
                })}>
                  {title}
                </Header>
              </ConceptTextContainer>
            }></Block>
          <div className='grid_info_wrapper'>
            {/* test */}
            <a href='/news' className='back_link'>
              <p style={{ display: 'flex', alignItems: "center", cursor: "pointer" }}>
                <AiOutlineArrowLeft className='mr-1' />News & Updates
              </p>
            </a>
            <Block
              content={
                <ConceptTextContainer className='text_wrapper'>
                  <GridImage
                    className='grid_view_image'
                    sizes={'33vw'}
                    imageObj={titleImage}
                    mobileImageObj={mobileBannerImage} />
                  <div className='grid_head'>
                    <div className='mt-custom'>
                      <BodyText size="sm" className='mb-2'>{moment(date).format('MMMM Do YYYY')}</BodyText>
                      {test && <BodyText size="sm" className='mb-2'>Categories: {test.join(', ')}</BodyText>}
                    </div>
                  </div>
                  <div  id="rich-text-body" className='htmlText'>
                  {description && documentToReactComponents(description, options)}
                  </div>
                  {/* <div id="rich-text-body" className='htmlText' */}
                  {/* // dangerouslySetInnerHTML={{ __html: renderedHtml }} */}
                  {/* /> */}
                  {/* {description && documentToReactComponents(description, options)} */}
                </ConceptTextContainer>
              }
            />
          </div>
        </div>
      </Content>

      {otherNews && (

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
              {otherNews && (otherNews.map((news: News, i: number) => (
                <NewsItem key={news.slug + i} newsObj={news?.fields}></NewsItem>)
              ))}
            </GridModule>
          }
        />
      )}
    </>
  )
}
export default NewsItemDetails