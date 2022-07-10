import { rem } from 'polished'
import styled from 'styled-components'
import { BREAKPOINTS } from '../../../_constants/brekpoints'

const ColumnsMap: Record<string, number> = {
    one: 1,
    two: 2,
    three: 3,
}

interface MarkdownStyleProps {
    padding?: boolean
    columns?: number
}

export const MarkupWrapper = styled.div`
    padding: ${({ padding }: MarkdownStyleProps) =>
        padding ? rem('20px') : 0};
    column-count: ${({ columns = ColumnsMap.one }) => ColumnsMap[columns]};

    table {
        width: 100%;
        margin-bottom: ${rem('20px')};

        td {
            font-size: ${rem('18px')};
            font-weight: 500;
            line-height: 1.5;
        }

        tbody {
            tr {
                td:first-child {
                    width: ${rem('150px')};
                }
            }
        }

        thead {
            display: none;
        }
    }

    h1:last-of-type,
    h2:last-of-type {
        margin-bottom: ${rem('40px')};
        column-span: all;
    }

    h3 {
        margin-bottom: ${rem('20px')};
        max-width: ${rem('500px')};
    }

    h5 {
        max-width: ${rem('550px')};
        break-before: column;
    }

    p:last-of-type {
        margin-bottom: 0;
    }

    p {
        margin-bottom: ${rem('20px')};
        max-width: ${rem('800px')};
        padding-right: ${rem('40px')};
    }

    p {
        a:last-of-type {
            margin-bottom: 0;
        }
    }

    ul {
        margin-bottom: ${rem('20px')};
        margin-left: ${rem('30px')};
        max-width: ${rem('800px')};

        li:last-child {
            margin-bottom: 0;
        }
        li {
            font-size: ${rem('18px')};
            margin-bottom: ${rem('20px')};
        }
    }

    @media (max-width: ${BREAKPOINTS.MOBILE}) {
        column-count: ${({ columns = ColumnsMap.one }: MarkdownStyleProps) =>
            ColumnsMap[columns] - 1};

        h1:last-of-type,
        h2:last-of-type {
            margin-bottom: ${rem('26px')};
            column-span: all;
        }

        p {
            padding-right: 0;
        }
    }
`

export const Separator = styled.div`
    display: inline-block;
    width: 100%;
    border-bottom: 1px solid black;
    margin-bottom: ${rem('20px')};
    margin-top: ${rem('16px')};
`
