import React, { ReactNode } from 'react'
import { BlockContent, BlockWrapper, Title } from './styles'
import Header from '../../Typography/Header'

interface BlockProps {
    title?: string
    content: any
    className?: string
    hideSeparator?: boolean
    fullWidth?: boolean
    noPaddingBottom?: boolean
    showOverflow?: boolean
}
const Block = ({
    title,
    content,
    className,
    hideSeparator = false,
    fullWidth = false,
    noPaddingBottom = false,
    showOverflow = false,
}: BlockProps) => {
    return (
        <BlockWrapper noPaddingBottom={noPaddingBottom} className={className}>
            {!hideSeparator && <div className="separator" />}
            {title && (
                <Title fullWidth={fullWidth}>
                    <Header size={4} uppercase>
                        {title}
                    </Header>
                </Title>
            )}
            <BlockContent showOverflow={showOverflow} fullWidth={fullWidth}>
                {content}
            </BlockContent>
        </BlockWrapper>
    )
}

export default Block
