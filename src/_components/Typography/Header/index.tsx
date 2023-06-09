import React from 'react'
import {
    H1Styled,
    H2Styled,
    H3Styled,
    H4Styled,
    H5Styled,
    H6Styled,
} from './styles'

interface HeaderProps {
    className?: string
    children: any
    format?: 'strong' | 'silent'
    size?: number
    bold?: boolean
    responsive?: boolean
    uppercase?: boolean
}

const Header = ({
    className,
    children,
    bold = false,
    responsive = false,
    size = 1,
    uppercase = false,
}: HeaderProps) => {
    switch (size) {
        default:
        case 1:
            return (
                <H1Styled className={className}  bold={bold} responsive={responsive} uppercase={uppercase} > {children} </H1Styled>
            )
        case 2:
            return (
                <H2Styled className={className}  bold={bold} responsive={responsive} uppercase={uppercase} > {children} </H2Styled>
            )
        case 3:
            return (
                <H3Styled className={className} bold={bold} responsive={responsive} uppercase={uppercase} > {children} </H3Styled>
            )
        case 4:
            return (
                <H4Styled className={className} bold={bold} responsive={responsive}  uppercase={uppercase} > {children} </H4Styled>
            )
        case 5:
            return (
                <H5Styled className={className} bold={bold} responsive={responsive} uppercase={uppercase} > {children} </H5Styled>
            )
        case 6:
            return (
                <H6Styled className={className} bold={bold} responsive={responsive} uppercase={uppercase} >  {children} </H6Styled>
            )
    }
}

export default Header
