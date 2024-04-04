import React from "react";
import styled from "styled-components";

type SelectProps = {
  label?: string;
};
const Select: React.FC<SelectProps> = ({ label = "请选择" }) => {
  return (
    <StyleSelectWrap>
      <StyleSelctInput>{label}</StyleSelctInput>
      <StyleSelctDrop></StyleSelctDrop>
    </StyleSelectWrap>
  );
};

const StyleSelectWrap = styled.div``;
const StyleSelctInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  width: fit-content;
  height: 36px;
  border: 1px solid var(--color-border-2);
  border-radius: var(--radius-6);
`;
const StyleSelctDrop = styled.ul``;
export default Select;
