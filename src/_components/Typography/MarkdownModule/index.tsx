import React from 'react'
import ReactMarkdown from 'react-markdown'
import Header from '../../Typography/Header'
import remarkGfm from 'remark-gfm'
import BodyText from '../../Typography/BodyText'
import { MarkupWrapper, Separator } from './styles'
import rehypeRaw from 'rehype-raw'

interface MarkupProps {
    padding?: boolean
    border?: boolean
    data: string
    className?: string
    columns?: 'one' | 'two' | 'three'
    responsive?: boolean
    size?: 'sm' | 'md' | 'lg'
}

const MarkdownModule = ({
    padding = false,
    border = false,
    columns = 'one',
    size = 'md',
    data,
    className,
    responsive = false,
}: MarkupProps) => {
    return (
        <MarkupWrapper  className={className} columns={columns} border={border} adding={padding}  >
            <ReactMarkdown
                components={{
                    h1: ({ children }) => (
                        <Header size={1} responsive={responsive}> {children} </Header>
                    ),
                    h2: ({ children }) => (
                        <Header size={2} responsive={responsive}> {children} </Header>
                    ),
                    h3: ({ children }) => (
                        <Header size={3} responsive={responsive}> {children} </Header>
                    ),
                    h4: ({ children }) => (
                        <Header size={4} responsive={responsive}>  {children} </Header>
                    ),
                    h5: ({ children }) => (
                        <Header size={5} responsive={responsive}> {children} </Header>
                    ),
                    p: ({ children }) => (
                        <BodyText size={size}>{children}</BodyText>
                    ),
                    hr: () => <Separator />,
                }}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
            >
                {data}
            </ReactMarkdown>
        </MarkupWrapper>
    )
}

export default MarkdownModule
