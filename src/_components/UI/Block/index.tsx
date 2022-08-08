import React, { ReactNode } from 'react'
import { BlockContent, BlockWrapper, Title } from './styles'
import Header from '../../Typography/Header'

interface BlockProps {
    title: string
    content: ReactNode
    hideSeparator?: boolean
}
const Block = ({ title, content, hideSeparator = false }: BlockProps) => {
    return (
        <BlockWrapper>
            {!hideSeparator && <div className="separator" />}
            <Title>
                <Header size={4} uppercase>
                    {title}
                </Header>
            </Title>
            <BlockContent>{content}</BlockContent>
        </BlockWrapper>
    )
}

export default Block
