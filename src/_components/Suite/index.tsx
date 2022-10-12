import React from 'react'
import Highlight from './Highlight'

interface SuiteProps {
    data: {
        fields: {
            highlights: []
        }
    }
    propertySlug: string
    hideFirstSeparator?: boolean
}
const Suite = ({ data, hideFirstSeparator, propertySlug = '' }: SuiteProps) => {
    const { fields } = data
    const { highlights } = fields
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
        </>
    )
}

export default Suite
