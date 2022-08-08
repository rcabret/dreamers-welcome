import React from 'react'
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

const About = ({ about }: any) => {
    const {
        bannerImage,
        bannerHeader,
        blurb,
        concept,
        countries,
        properties,
        awards,
        founders,
        monthlyGuests,
    } = about

    const stats = [
        { name: 'Countries', data: countries },
        { name: 'Properties', data: properties },
        { name: 'Awards', data: awards },
        { name: 'Guests Hosted', data: monthlyGuests },
    ]

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
                title="OUR REACH"
                content={
                    <GridModule columns={4} sideScrollOnMobile dontBreak>
                        {stats &&
                            stats.map((stat, i: number) => {
                                return (
                                    <div key={~~(Math.random() * i)}>
                                        <Stat>{stat.data}</Stat>
                                        <BodyText size="md">
                                            {stat.name}
                                        </BodyText>
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
