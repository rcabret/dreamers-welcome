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

    h3,
    h4 {
        margin-bottom: ${rem('20px')};
        max-width: ${rem('500px')};
    }

    h5 {
        max-width: ${rem('550px')};
        break-before: column;
    }

    p {
        margin-bottom: ${rem(20)};
        max-width: ${rem(800)};
        padding-right: ${rem(40)};
    }

    p {
        a:last-of-type {
            margin-bottom: 0;
        }
    }

    ul {
        margin-bottom: ${rem(40)};
        // margin-left: ${rem(30)};
        margin-right: ${rem(40)};
        max-width: ${rem(800)};

        li:last-child {
            margin-bottom: 0;
        }
        li {
            font-size: ${rem(18)};
            margin-bottom: ${rem(16)};
        }
    }

    a:hover {
        text-decoration: underline;
    }

    @media (max-width: ${BREAKPOINTS.TABLET}) {
        ul {
            padding-left: ${rem(20)};
        }
    }

    @media (max-width: ${BREAKPOINTS.MOBILE}) {
        column-count: ${({ columns = ColumnsMap.one }: MarkdownStyleProps) =>
            ColumnsMap[columns] - 1};

        h1:last-of-type,
        h2:last-of-type {
            margin-bottom: ${rem(26)};
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
    border-bottom: 1px solid #c1c1c1;
    margin-bottom: ${rem(20)};
    margin-top: ${rem(16)};
`
