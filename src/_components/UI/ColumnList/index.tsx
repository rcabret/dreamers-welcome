import React from 'react'
import { GridModule } from '../../../styles/global'
import MarkdownModule from '../../Typography/MarkdownModule'
import Header from '../../Typography/Header'

const ColumnList = ({ items }: any) => {
    return (
        <GridModule columns={items.length}>
            {items &&
                items.length &&
                items.map((item: any) => {
                    return (
                        <div>
                            <Header size={4}>{item.fields.title}</Header>
                            <MarkdownModule data={item.fields.text} />
                        </div>
                    )
                })}
        </GridModule>
    )
}

export default ColumnList
