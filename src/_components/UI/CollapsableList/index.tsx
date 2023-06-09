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

    .extraPadding {
        p { padding-top: ${rem('30px')}; }
    }

    a { display: block; }

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

    h3 { margin-right: ${rem(60)}; }

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
const Wrap = styled.div`
    padding-top: ${rem(40)};
    padding-bottom: ${rem(20)};
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
                                    <Title noPaddingTop={i === 0} noPaddingBottom={i === data.length - 1} onClick={() => this.toggle(i)} >
                                        <Header size={3}>{title}</Header>
                                        <Cross expanded={ i == this.state.activeIndex } />
                                    </Title>
                                    <AnimateHeight height={ this.state.activeIndex === i ? 'auto' : 0 } duration={500} >
                                        <Wrap> <MarkdownModule data={text} /> </Wrap>
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
