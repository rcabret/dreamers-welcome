import React from 'react'
import Highlight from './Highlight'

interface SuiteProps {
    data: {
        fields: {
            highlights: []
            slug: string
        }
    }
    hideFirstSeparator?: boolean
    id?: string
}
const Suite = ({ data, hideFirstSeparator, id }: SuiteProps) => {
    const { fields } = data
    const { highlights, slug } = fields
    return (
        <div id={id}>
            {highlights && highlights.length
                ? highlights.map((x, i) => (
                      // @ts-ignore
                      <Highlight
                          propertySlug={slug}
                          key={~~(i * Math.random())}
                          data={x}
                          hideSeparator={hideFirstSeparator && i === 0}
                      />
                  ))
                : null}
        </div>
    )
}

export default Suite
