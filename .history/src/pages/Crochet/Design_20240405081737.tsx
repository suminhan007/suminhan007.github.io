import React from "react";
import styled from "styled-components";

type Props = {};
const Design: React.FC<Props> = ({}) => {
  return <StyleDesignWrap className="p-24">
    {/* 展示区 */}
    <StyleDesignDisplay className="width-100 border radius-12 ratio"></StyleDesignDisplay>
  </StyleDesignWrap>;
};

const StyleDesignWrap = styled.div`
 
`;
const StyleDesignDisplay = styled.div``;
export default Design;