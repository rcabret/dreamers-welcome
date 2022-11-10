import React, { useEffect } from 'react'
import { BannerGridImage, GridModule, Stat } from '../../styles/global'
import BannerContent from '../../_components/UI/BannerContent'
import Blurb from '../../_components/UI/Blurb'
import { getAbout } from '../../_lib/api'
import Block from '../../_components/UI/Block'
import Header from '../../_components/Typography/Header'
import BodyText from '../../_components/Typography/BodyText'
import GridImage from '../../_components/UI/GridImage'
import { NewsTextWrapper } from '../../_components/NewsItem/styles'
import { ConceptTextContainer, StaffMetadata } from '../../styles/about/styles'

const About = ({ about, setHeaderData, setNavTheme }: any) => {
    const { bannerImage, bannerHeader, blurb, concept, founders, ourReach } =
        about

    useEffect(() => {
        setHeaderData({
            bucket: undefined,
        })
        setNavTheme('light')
    }, [])
    return (
        <>
            <BannerGridImage
                imageObj={bannerImage}
                border={false}
                borderRadius={false}
                fullHeight
            >
                <BannerContent headerText={bannerHeader} />
            </BannerGridImage>
            <Blurb text={blurb} />
            <Block
                title="CONCEPT"
                content={
                    <ConceptTextContainer>
                        <BodyText size="xlg">{concept}</BodyText>
                    </ConceptTextContainer>
                }
            />
            <Block
                title="FOUNDERS"
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
                    <GridModule columns={4} sideScrollOnMobile>
                        {ourReach &&
                            ourReach.map((stat: any, i: number) => {
                                const { title, text } = stat.fields
                                return (
                                    <div key={title}>
                                        <Stat>{text}</Stat>
                                        <BodyText size="md">{title}</BodyText>
                                    </div>
                                )
                            })}
                    </GridModule>
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
