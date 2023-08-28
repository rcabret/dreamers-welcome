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
  const [blurb, setBlurb] = useState()

  const [_news, setNews] = useState<any[]>([
  ]);
  const [otherNews, setOtherNews] = useState<any[]>([
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
        setRes(newsData);
        setTest(newsData?.test)
        setDate(newsData?.date)
        setText(newsData?.text)
        setImage(newsData?.titleImage)
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

  return (
    <>
        <Content padding>
          <div className='grid_head border-0 mt-0'>

          <a href='/news'>
            <p style={{ display: 'flex', alignItems: "center", cursor: "pointer" }}>
              <AiOutlineArrowLeft className='mr-1' />News & Updates
            </p>
          </a>
          <TopSection padding>
            <Header size={2} className='text-center mb-5'>
              {title}
            </Header>
          
          </TopSection>
          </div>
         <div className='grid_head'>
         <div className='mt-custom'>
              <BodyText size="sm" className='mb-2'>{moment(date).format('MMMM Do YYYY')}</BodyText>
              {test && <BodyText size="md" className='mb-2'>Categories: {test.join(', ')}</BodyText>}
            </div>
         </div>
      <div style={{ height: '50%', alignItems: 'center', margin: "auto", marginBottom: "4em" }} className='grid_view'>
          {/* <SubNavigation
                activeSlug={activeSlug}
                data={links}
                queryParam="type"
                queryArray={'/news' || []}
            /> */}
          
          {/* <BlockContent showOverflow={true} fullWidth={false}> */}
            
          
            {/* </BlockContent> */}
          {/* {blurb && <Blurb text={blurb} />} */}
         
                      <GridImage
            className='grid_view_image'
            sizes={'33vw'}
            imageObj={titleImage}
            // metadata={
            //   <GuidesMetadata>
            //     <div id="rich-text-body" className='htmlText' dangerouslySetInnerHTML={{ __html: renderedHtml }} />
            //   </GuidesMetadata>
            // }
          />
          <div>
          <div id="rich-text-body" className='htmlText' dangerouslySetInnerHTML={{ __html: renderedHtml }} />
          </div>
          {/* <Block
                content={
                    <ConceptTextContainer>
                      
                      <div id="rich-text-body" className='htmlText' dangerouslySetInnerHTML={{ __html: renderedHtml }} />
                        <MarkdownModule data={description} />
                    </ConceptTextContainer>
                }
            /> */}
           {/* <GridImage
                imageObj={titleImage}
                // mobileImageObj={mobileBannerImage}
                border={false}
                borderRadius={false}
                fullHeight
            >
                <BannerContent headerText={title} />
            </GridImage> */}
            {/* {blurb && <Blurb text={blurb} />} */}
             {/* <Block
                content={
                    <ConceptTextContainer>
                      <div id="rich-text-body" className='htmlText' dangerouslySetInnerHTML={{ __html: renderedHtml }} />
                        <MarkdownModule data={description} />
                    </ConceptTextContainer>
                }
            /> */}
       
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
              {otherNews &&  (otherNews.map((news: News, i: number) => (
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