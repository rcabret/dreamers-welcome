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
    const { date, title, text, tileImage, slug } = newsObj
    const [_res, setRes] = useState()
    const [id, setId] = useState();
    
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
    
    const handleClick = async () => {
        const filteredArray = _res.filter(item => item.fields.title == title);
        const sys = filteredArray.map((x: {sys: string }) => x.sys.id)
        setId(sys)        
    }

    return (
        <a
          onClick={handleClick}
          href={`/news/${id}`}
        >
            <ItemWrapperStyled>
                <div className="border">
                    <Header size={3}>{title}</Header>
                    {breakpoint !== 'mobile' && (
                        <NewsTextWrapper>
                            <BodyText size="sm">{stringDate}</BodyText>
                            <BodyText size="sm">{text.slice(0, 200)}...</BodyText>
                        </NewsTextWrapper>
                    )}
                    <GridImage border={false} imageObj={tileImage} />
                </div>
            </ItemWrapperStyled>
        </a>
    )
}

export default NewsItem
