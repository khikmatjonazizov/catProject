import React from "react";
import styled from "styled-components";

type CheckboxProps = {
    onChange: () => void;
    label?: string;
    isChecked: boolean;
}

const CheckboxStyled = styled.input`
    cursor: pointer;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

export const Checkbox: React.FC<CheckboxProps> = (props) => {
    const {isChecked, label, onChange} = props;

    if (label) {
        return (
            <CheckboxLabel>
                <CheckboxStyled
                    type="checkbox"
                    onChange={onChange}
                    checked={isChecked}
                />
                {label}
            </CheckboxLabel>
        )
    }

    return (
        <CheckboxStyled
            type="checkbox"
            onChange={onChange}
            checked={isChecked}
        />
    )
}
