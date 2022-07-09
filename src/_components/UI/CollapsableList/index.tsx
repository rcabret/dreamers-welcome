import React, { Component } from 'react'
import styled from 'styled-components'
import { rem } from 'polished'
import Header from '../../Typography/Header'
import Cross from '../../UI/Icons/Cross'
import MarkdownModule from '../../Typography/MarkdownModule'
import dynamic from 'next/dynamic'

const AnimateHeight = dynamic(() => import('react-animate-height'))

interface ListProps {
    data: { items: any }
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
    border-top: 1px solid black;
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

class CollapsableList extends Component {
    constructor(props: ListProps) {
        super(props)
    }

    state = {
        activeIndex: 0,
    }

    toggle = (index: number) => {
        const { activeIndex } = this.state

        this.setState({
            activeIndex: activeIndex === index ? -1 : index,
        })
    }

    render() {
        const { data } = this.props as ListProps
        const { items } = data
        return (
            <ListWrapper>
                {items &&
                    items.map(
                        (
                            item: { title: string; content: string },
                            i: number
                        ) => {
                            return (
                                <>
                                    <Title
                                        noPaddingTop={i === 0}
                                        noPaddingBottom={i === items.length - 1}
                                        onClick={() => this.toggle(i)}
                                    >
                                        <Header size={3}>{item?.title}</Header>
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
                                            i === items.length - 1
                                                ? 'extraPadding'
                                                : ''
                                        }
                                        duration={500}
                                    >
                                        <MarkdownModule data={item.content} />
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
