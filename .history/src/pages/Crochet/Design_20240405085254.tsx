import React, { useState } from "react";
import styled from "styled-components";
import Input from "../../components/Input";

type Props = {};
const Design: React.FC<Props> = ({}) => {
  const [x, setX] = useState<number>(32);
  const [y, setY] = useState<number>(32);
  const [pixelArr, setPixelArr] = useState<string[]>(
    Array.from({ length: x * y })
  );
  return (
    <StyleDesignWrap className="p-24">
      {/* 展示区 */}
      <div style={{ width: "fit-content" }}>
        <StyleDesignGrid className="grid" x={x} y={y}>
          {pixelArr?.map((item, index) => (
            <StyleDesignGridPixel
              className={`border ${index < x ? "" : "-mt-1"} ${
                index % 32 ? "-ml-1" : ""
              }`}
              style={{ backgroundColor: item }}
            ></StyleDesignGridPixel>
          ))}
        </StyleDesignGrid>
        <div className="flex gap-24 mt-12">
          <Input style={{ height: 32 }} />
          <Input style={{ height: 32 }} />
        </div>
      </div>
    </StyleDesignWrap>
  );
};

const StyleDesignWrap = styled.div``;

const StyleDesignGrid = styled.div<{
  x: number;
  y: number;
}>`
  width: 480px;
  height: ${(props) => `${(480 * props.x) / props.y}px`};
  grid-template-columns: ${(props) => `repeat(${props.x}, auto)`};
  &::before {
    content: "";
    display: flex;
    position: absolute;
  }
`;

const StyleDesignGridPixel = styled.div`
  &:hover {
    background-color: var(--color-bg-2);
  }
`;
export default Design;
