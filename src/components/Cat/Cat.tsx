import React from "react";
import styled from "styled-components";

type CatProps = {
    url: string;
}

const CatStyled = styled.img`
    
`;

export const Cat: React.FC<CatProps> = (props) => {
    const { url } = props;

    return (
        <CatStyled src={url} width="100%" />
    )
}
