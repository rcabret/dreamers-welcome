import styled from "styled-components";
import {rem} from "polished";

export const GuidesMetadata = styled.div`
    margin-top: ${rem('20px')};
    margin-bottom: ${rem('30px')};

    > p:first-child {
        color: #c1c1c1;
    }

    p {
        margin-top: ${rem('20px')};
        padding-right: ${rem('20px')};
    }
`