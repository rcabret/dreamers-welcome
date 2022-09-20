import React from 'react'
import Highlight from './Highlight'

interface SuiteProps {
    data: {
        fields: {
            highlights: []
        }
    }
    slug: string
    hideFirstSeparator?: boolean
}
const Suite = ({ data, hideFirstSeparator, slug = '' }: SuiteProps) => {
    const { fields } = data
    const { highlights } = fields
    return (
        <>
            {highlights && highlights.length
                ? highlights.map((x: { fields: any }, i: number) => {
                      const { highlightName, blurb, images } = x.fields
                      return (
                          // @ts-ignore
                          <Highlight
                              slug={slug}
                              key={~~(i * Math.random()) + highlightName}
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
