import React from 'react'
import { BannerGridImage, GridModule, Stat } from '../../styles/globla'
import BannerContent from '../../_components/UI/BannerContent'
import Blurb from '../../_components/UI/Blurb'
import { getAbout } from '../../_lib/api'
import Block from '../../_components/UI/Block'
import Header from '../../_components/Typography/Header'
import BodyText from '../../_components/Typography/BodyText'

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

    const stats = [countries, properties, awards, monthlyGuests]

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
                content={<BodyText size="xlg">{concept}</BodyText>}
            />
            <Block
                title="FOUNDERS"
                content={
                    <GridModule columns={2} sideScrollOnMobile={false}>
                        {founders &&
                            founders.map((founder: any, i: number) => {
                                return (
                                    <div key={~~(Math.random() * i)}>
                                        {founder.fields.name}
                                    </div>
                                )
                            })}
                    </GridModule>
                }
            />
            <Block
                title="OUR REACH"
                content={
                    <GridModule columns={4} sideScrollOnMobile>
                        {stats &&
                            stats.map((stat: string, i: number) => {
                                return (
                                    <Stat key={~~(Math.random() * i)}>
                                        {stat}
                                    </Stat>
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
