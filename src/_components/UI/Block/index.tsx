import React from 'react'
import { BlockContent, BlockWrapper, Title } from './styles'
import Header from '../../Typography/Header'
import Link from 'next/link'

interface BlockProps {
    title?: string
    titleOverride?: any
    content: any
    className?: string
    hideSeparator?: boolean
    fullWidth?: boolean
    noPaddingBottom?: boolean
    showOverflow?: boolean
    link?: string
}
const Block = ({
    title,
    titleOverride,
    content,
    className,
    hideSeparator = false,
    fullWidth = false,
    noPaddingBottom = false,
    showOverflow = false,
    link,
}: BlockProps) => {
    return (
        <BlockWrapper noPaddingBottom={noPaddingBottom} className={className}>
            {!hideSeparator && <div className="separator" />}
            {(title || titleOverride) && (
                <Title fullWidth={fullWidth}>
                    <>
                        {titleOverride ? (
                            <div>{titleOverride}</div>
                        ) : (
                            <Header size={4} uppercase>
                                {title}
                            </Header>
                        )}
                        {link && <p className='desktop_link'><Link href={link}>VIEW ALL</Link></p>}
                    </>
                </Title>
            )}
            <BlockContent showOverflow={showOverflow} fullWidth={fullWidth}>
                {content}
            {link && <p className='mobile_link'> <Link href={link}>VIEW ALL</Link></p>}
            </BlockContent>
        </BlockWrapper>
    )
}

export default Block
