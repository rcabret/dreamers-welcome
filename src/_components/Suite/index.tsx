import React, { useContext } from 'react'
import Highlight from './Highlight'
import Block from '../UI/Block'
import { BlockListWrap, GridModule } from '../../styles/global'
import Header from '../Typography/Header'
import MarkdownModule from '../Typography/MarkdownModule'
import CollapsableList from '../UI/CollapsableList'
import { viewportContext } from '../../_utils/ViewportProvider'

interface SuiteProps {
    data: {
        fields: {
            highlights: []
            features: []
            description?: string
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
    const { highlights, features, description } = fields

    const breakpoint = useContext(viewportContext)

    return (
        <>
            {description && ( <Block  hideSeparator title="OVERVIEW" content={<MarkdownModule data={description} />} /> )}
            {highlights && highlights.length
                ? highlights.map((x: { fields: any }, i: number) => {
                      const { highlightName, blurb, images, slug } = x.fields
                      return (
                          // @ts-ignore
                          <Highlight  key={`${slug}-${Math.random() * i}`}  slug={propertySlug}  title={highlightName} blurb={blurb}  images={images}  hideSeparator={hideFirstSeparator && i === 0 && !description }  />
                      )
                  })
                : null}
            {features && (
                <Block
                    title="FEATURES"
                    noPaddingBottom
                    sideScrollOnMobile={false}
                    content={
                        breakpoint !== 'mobile' ? (
                            <GridModule  columns={features.length} sideScrollOnMobile={false} >
                                {features &&
                                    features.map((feature: any) => (
                                        <BlockListWrap
                                            key={feature.fields.title}
                                        >
                                            <Header size={4}>
                                                {feature.fields.title}
                                            </Header>
                                            <MarkdownModule
                                                data={feature.fields.text}
                                            />
                                        </BlockListWrap>
                                    ))}
                            </GridModule>
                        ) : (
                            <CollapsableList data={features} />
                        )
                    }
                />
            )}
        </>
    )
}

export default Suite
