import styled from 'styled-components'

export const SubNav = styled.div`
    position: sticky;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50px;
    z-index: 10;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(14px);

    .separator {
        margin: 0 30px;
        height: 1px;
        background-color: #c1c1c1;
        width: calc(100% - 60px);
        position: absolute;
        bottom: 0;
    }
`

export const SubLink = styled.div`
    display: inline-block;
    margin: 0 40px;
    cursor: pointer;

    .active {
        text-decoration: underline;
    }
`
