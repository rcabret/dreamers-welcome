import React from 'react'
import Highlight from './Highlight'
import Block from '../UI/Block'
import { BlockListWrap, GridModule } from '../../styles/global'
import Header from '../Typography/Header'
import MarkdownModule from '../Typography/MarkdownModule'

interface SuiteProps {
    data: {
        fields: {
            highlights: []
            features: []
        }
    }
    propertySlug: string
    hideFirstSeparator?: boolean
}
const Suite = ({ data, hideFirstSeparator, propertySlug = '' }: SuiteProps) => {
    if (data && !data.fields) {
        return null
    }
    const { fields } = data
    const { highlights, features } = fields
    return (
        <>
            {highlights && highlights.length
                ? highlights.map((x: { fields: any }, i: number) => {
                      const { highlightName, blurb, images, slug } = x.fields
                      return (
                          // @ts-ignore
                          <Highlight
                              slug={propertySlug}
                              key={slug}
                              title={highlightName}
                              blurb={blurb}
                              images={images}
                              hideSeparator={hideFirstSeparator && i === 0}
                          />
                      )
                  })
                : null}
            {features && (
                <Block
                    title="FEATURES"
                    noPaddingBottom
                    content={
                        <GridModule
                            columns={3}
                            sideScrollOnMobile={false}
                        >
                            {features &&
                                features.map((feature: any) => (
                                    <BlockListWrap key={feature.fields.title}>
                                        <Header size={4}>
                                            {feature.fields.title}
                                        </Header>
                                        <MarkdownModule
                                            data={feature.fields.text}
                                        />
                                    </BlockListWrap>
                                ))}
                        </GridModule>
                    }
                />
            )}
        </>
    )
}

export default Suite
