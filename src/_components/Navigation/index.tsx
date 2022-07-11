import React from 'react'
import styled from 'styled-components'
import { rem } from 'polished'

const Navigation = styled.nav`
    position: fixed;
    top: 0;
    color: white;
    height: ${rem('50px')};
    z-index: 1;
    display: flex;
    align-items: center;
    padding: 0 ${rem('30px')};
`
const TopNav = ({ bucket }: { bucket?: string }) => {
    return <Navigation>{bucket}</Navigation>
}

export default TopNav
