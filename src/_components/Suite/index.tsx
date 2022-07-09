import React from 'react'
import Highlight from './Highlight'

interface SuiteProps {
    data: {
        fields: {
            highlights: []
        }
    }
}
const Suite = ({ data }: SuiteProps) => {
    const { fields } = data
    const { highlights } = fields
    return (
        <>
            {highlights &&
                highlights.length &&
                highlights.map((x, i) => (
                    // @ts-ignore
                    <Highlight key={~~(i * Math.random())} data={x} />
                ))}
        </>
    )
}

export default Suite
