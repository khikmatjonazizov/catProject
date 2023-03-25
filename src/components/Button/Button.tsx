import React from "react";
import styled from "styled-components";

type ButtonProps = {
    onClick: () => void;
    children?: React.ReactNode;
    disabled?: boolean;
}

const ButtonStyled = styled.button`
  margin: 0;
  padding: 10px 20px;
  border: none;
  background-color: grey;
  width: 100%;
  
  &:not(:disabled) {
    &:hover {
      opacity: 0.8;
    }
    cursor: pointer;
  }
`;
export const Button: React.FC<ButtonProps> = (props) => {
    const { onClick, children, disabled } = props;

    return (
        <ButtonStyled onClick={onClick} disabled={disabled}>
            {children}
        </ButtonStyled>
    );
}
