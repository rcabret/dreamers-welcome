import React, { Component } from 'react'
import styled from 'styled-components'
import { rem } from 'polished'
import Header from '../../Typography/Header'
import Cross from '../../UI/Icons/Cross'
import MarkdownModule from '../../Typography/MarkdownModule'

import AnimateHeight from 'react-animate-height'

interface ListProps {
    data: any[]
}

interface ListStyleProps {
    noPaddingTop?: boolean
    noPaddingBottom?: boolean
}

const ListWrapper = styled.div`
    position: relative;

    p {
        padding-top: ${rem('10px')};
        padding-bottom: ${rem('20px')};
    }

    .extraPadding {
        p {
            padding-top: ${rem('30px')};
        }
    }

    a {
        display: block;
    }

    svg {
        position: absolute;
        right: ${rem('4px')};
        margin-right: ${rem('10px')};
    }
`

const Title = styled.div`
    padding: ${rem('14px')} 0;
    border-top: 1px solid #c1c1c1;
    display: flex;
    cursor: pointer;
    ${({ noPaddingBottom }: ListStyleProps) =>
        noPaddingBottom &&
        `
        padding-bottom: 0;
    `}
    ${({ noPaddingTop }: ListStyleProps) =>
        noPaddingTop &&
        `
        border-top: none;
        padding-top: 0;
    `}
`

class CollapsableList extends Component<any, any> {
    constructor(props: ListProps) {
        super(props)
    }

    state = {
        activeIndex: -1,
    }

    toggle = (index: number) => {
        const { activeIndex } = this.state

        this.setState({
            activeIndex: activeIndex === index ? -1 : index,
        })
    }

    render() {
        const { data = [] } = this.props as ListProps

        return (
            <ListWrapper>
                {data &&
                    data.length &&
                    data.map(
                        (
                            item: { fields: { title: string; text: string } },
                            i: number
                        ) => {
                            const { title, text } = item.fields
                            return (
                                <>
                                    <Title
                                        noPaddingTop={i === 0}
                                        noPaddingBottom={i === data.length - 1}
                                        onClick={() => this.toggle(i)}
                                    >
                                        <Header size={3}>{title}</Header>
                                        <Cross
                                            expanded={
                                                i == this.state.activeIndex
                                            }
                                        />
                                    </Title>
                                    <AnimateHeight
                                        height={
                                            this.state.activeIndex === i
                                                ? 'auto'
                                                : 0
                                        }
                                        className={
                                            i === data.length - 1
                                                ? 'extraPadding'
                                                : ''
                                        }
                                        duration={500}
                                    >
                                        <MarkdownModule data={text} />
                                    </AnimateHeight>
                                </>
                            )
                        }
                    )}
            </ListWrapper>
        )
    }
}

export default CollapsableList
