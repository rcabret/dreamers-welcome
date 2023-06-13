import React, { useContext, useEffect } from 'react'

import {
    BannerGridImage,
    GridModule,
    Stat,
    StatsGridModule,
} from '../../styles/global'
import BannerContent from '../../_components/UI/BannerContent'
import Blurb from '../../_components/UI/Blurb'
import { getAbout } from '../../_lib/api'
import Block from '../../_components/UI/Block'
import Header from '../../_components/Typography/Header'
import BodyText from '../../_components/Typography/BodyText'
import GridImage from '../../_components/UI/GridImage'
import { NewsTextWrapper } from '../../_components/NewsItem/styles'
import { ConceptTextContainer, StaffMetadata } from '../../styles/about/styles'
import { parseMoneyOrTime } from '../../_utils/Parsers'
import { viewportContext } from '../../_utils/ViewportProvider'
import MarkdownModule from '../../_components/Typography/MarkdownModule'

const About = ({ about, setHeaderData, setNavTheme }: any) => {
    const {
        bannerImage,
        bannerHeader,
        mobileBannerImage,
        blurb,
        concept,
        founders,
        ourReach,
    } = about

    const breakpoint = useContext(viewportContext)

    useEffect(() => {
        setNavTheme('light')
    }, [])
    return (
        <>
            <BannerGridImage imageObj={bannerImage} mobileImageObj={mobileBannerImage} border={false} borderRadius={false} fullHeight >
                <BannerContent headerText={bannerHeader} />
            </BannerGridImage>
            <Blurb text={blurb} />
            <Block
                title="CONCEPT"
                content={
                    <ConceptTextContainer>
                        <MarkdownModule data={concept} />
                    </ConceptTextContainer>
                }
            />
            <Block
                title="FOUNDERS"
                noPaddingBottom
                content={
                    <GridModule columns={2} sideScrollOnMobile={false}>
                        {founders &&
                            founders.map((founder: any, i: number) => {
                                return (
                                    <div key={~~(Math.random() * i)}>
                                        <GridImage
                                            sizes={'33vw'}
                                            imageObj={founder.fields.coverImage}
                                            ratio={1}
                                        />
                                        <StaffMetadata>
                                            <Header size={3}>
                                                {founder.fields.name}
                                            </Header>
                                            <NewsTextWrapper>
                                                <BodyText size="md">
                                                    {founder.fields.description}
                                                </BodyText>
                                            </NewsTextWrapper>
                                        </StaffMetadata>
                                    </div>
                                )
                            })}
                    </GridModule>
                }
            />
            <Block
                title="BY THE NUMBERS"
                content={
                    <StatsGridModule columns={4}>
                        {ourReach &&
                            ourReach.map((stat: any, i: number) => {
                                const { title, text } = stat.fields
                                return (
                                    <div key={title}>
                                        {breakpoint == 'mobile' && (
                                            <BodyText size="md">
                                                {title}
                                            </BodyText>
                                        )}
                                        <Stat>
                                            {parseMoneyOrTime(text, 30)}
                                        </Stat>
                                        {breakpoint !== 'mobile' && (
                                            <BodyText size="md">
                                                {title}
                                            </BodyText>
                                        )}
                                    </div>
                                )
                            })}
                    </StatsGridModule>
                }
            />
        </>
    )
}

export default About

export async function getStaticProps() {
    const about = await getAbout()
    return {
        props: {
            about,
        },
    }
}
