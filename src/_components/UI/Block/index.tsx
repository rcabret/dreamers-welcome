import React, { ReactNode } from 'react'
import { BlockContent, BlockWrapper, Title } from './styles'
import Header from '../../Typography/Header'

interface BlockProps {
    title: string
    content: ReactNode
    hideSeparator?: boolean
    fullWidth?: boolean
    noPaddingBottom?: boolean
}
const Block = ({
    title,
    content,
    hideSeparator = false,
    fullWidth = false,
    noPaddingBottom = false,
}: BlockProps) => {
    return (
        <BlockWrapper noPaddingBottom={noPaddingBottom}>
            {!hideSeparator && <div className="separator" />}
            <Title fullWidth={fullWidth}>
                <Header size={4} uppercase>
                    {title}
                </Header>
            </Title>
            <BlockContent fullWidth={fullWidth}>{content}</BlockContent>
        </BlockWrapper>
    )
}

export default Block
