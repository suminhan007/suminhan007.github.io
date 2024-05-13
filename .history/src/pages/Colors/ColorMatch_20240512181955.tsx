import React, { Fragment, useMemo, useState } from "react";
import Flex from "../../components/Flex";
import styled from "styled-components";
import Title from "../../components/Title";
import ColorPicker from "../../components/ColorPicker";
import { IconAdd, IconArrow, IconCloseCircle } from "../../components/Icon";
import { StyleAddColorBtn } from "./ImgColorPicker";
import { MY_COLORS } from "./mock";
import Select from "../../components/Select";
import Button from "../../components/Button";
import tinycolor from "tinycolor2";
import Check from "../../components/Check";

type Props = {};

const ColorMatch: React.FC<Props> = ({}) => {
  const [colorArr, setColorArr] = useState<{ id: string; value: string }[]>([]);
  const [showMoreColor, setShowMoreColor] = useState<boolean>(false);
  /* 主色 */
  const [mainColor, setMainColor] = useState<string>("0");
  /* 数量 */
  const [number, setNumber] = useState<string>("1");
  /* 类型 */
  const [type, setType] = useState<string>("1");
  /* 比例 */
  const [percentage, setPercentage] = useState<string>("0");
  const submitDisabled = useMemo(() => {
    if (colorArr.length === 0) {
      return true;
    }
    if (type === "0") {
      return true;
    }
    if (number === "0") {
      return true;
    }
  }, [colorArr, type, number]);
  const NumberSelects = useMemo(() => {
    if (type === "1") {
      return [{ id: "1", value: "2" }];
    } else {
      return [
        { id: "1", value: "2" },
        { id: "2", value: "3" },
        { id: "3", value: "4" },
      ];
    }
  }, [type]);
  /* 模版 */
  const template = useMemo(() => {
    if (type === "1") {
      return [{ id: "1", element: <div></div> }];
    } else {
    }
  }, [type, number]);
  const [mapColors, setMapColors] = useState<any[]>([]);
  function luminance(r, g, b) {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }
  const getMapColors = () => {
    let mapColors: any[] = [];
    for (let i = 0; i < colorArr.length; i++) {
      for (let j = i + 1; j < colorArr.length; j++) {
        const hex1 = `#${tinycolor(colorArr[i].value).toHex()}`;
        const hex2 = `#${tinycolor(colorArr[j].value).toHex()}`;
        const rgb1 = tinycolor(colorArr[i].value).toRgb();
        const rgb2 = tinycolor(colorArr[j].value).toRgb();
        const l1 = luminance(r: rgb1.r, g: rgb1.g, b: rgb1.b);
        const contrast =
          l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
        mapColors.push([
          { color: hex1, contrast: contrast.toFixed(2) },
          { color: hex2 },
        ]);
      }
    }
    setMapColors(mapColors);
  };
  const [filterChecked, setFilterChecked] = useState<boolean>(false);
  return (
    <StyleColorContainer className="flex items-center height-100">
      <StyleLeftBox className="flex column height-100">
        <div className="flex-1 width-100 px-24 flex column gap-24 pt-32 pb-24 overflow-auto">
          {/* 输入颜色 */}
          <Flex column gap={12}>
            <Flex column gap={8}>
              <Title title="Step 01: 选取颜色" type="h3" />
              <Title
                title="输入自定义颜色，或从颜色库中选取颜色（支持 1-10 个颜色）"
                type="p"
                className="color-gray-4"
              />
            </Flex>
            {/* 颜色列表 */}
            <div className="flex column items-center gap-12 p-12 width-100 border radius-6">
              {colorArr.length > 0 && (
                <div className="flex flex-wrap both-center gap-12 ">
                  <>
                    {colorArr?.map((item: { id: string; value: string }) => (
                      <StyleColorItem
                        className="relative"
                        onClick={() => setMainColor(item.value)}
                      >
                        <ColorPicker
                          value={item.value}
                          input={false}
                          showDrop={false}
                          pop="标记为主色"
                          active={mainColor === item.value}
                        />
                        <div
                          className="absolute cursor-pointer close-icon"
                          onClick={() => {
                            const newColorLost = colorArr.filter(
                              (itm: any) => itm.id !== item.id
                            );
                            setColorArr(newColorLost);
                          }}
                        >
                          <IconCloseCircle fill="var(--color-red-6)" />
                        </div>
                      </StyleColorItem>
                    ))}
                  </>
                </div>
              )}
              {colorArr?.length < 10 && (
                <ColorPicker
                  showList={false}
                  showOpacity={false}
                  onClick={(value) =>
                    setColorArr([...colorArr, { id: value, value: value }])
                  }
                >
                  <StyleAddColorBtn className="StyleAddColorBtn relative flex both-center border radius-50 cursor-pointer">
                    <IconAdd />
                  </StyleAddColorBtn>
                </ColorPicker>
              )}
            </div>
            {/* 颜色库 */}
            <div className="relative flex flex-wrap both-center gap-12 p-12 pb-24 width-100 border radius-6">
              <StyleColorsLib
                className={`width-100 ${showMoreColor ? "show" : ""}`}
              >
                {MY_COLORS.map((item: any) => (
                  <Fragment key={item.id}>
                    <p className="fs-14 mb-8 color-gray-3">【{item.name}】</p>
                    <Flex wrap gap={12}>
                      {item.data.map((color: any) => (
                        <StyleColorItem
                          onClick={() =>
                            setColorArr([
                              ...colorArr,
                              { id: color.value, value: color.value },
                            ])
                          }
                        >
                          <ColorPicker
                            size={36}
                            value={color.value}
                            input={color.name}
                            showDrop={false}
                            pop={color.value}
                          />
                        </StyleColorItem>
                      ))}
                    </Flex>
                  </Fragment>
                ))}
              </StyleColorsLib>
              {/* 收起展开按钮 */}
              <StyleToggleBtn
                className="StyleToggleBtn absolute flex both-center px-12 py-4 border radius-12 cursor-pointer bg-hover-gray"
                onClick={() => setShowMoreColor(!showMoreColor)}
              >
                <IconArrow stroke="var(--color-text-4)" />
              </StyleToggleBtn>
            </div>
          </Flex>
          {/* 数量 & 类型 */}
          <Flex column gap={12}>
            <Title title="Step 02: 设置配色数量与类型" type="h3" />
            <Flex gap={12}>
              <Select
                title="配色类型"
                info={`选择生成的配色类型\n类型的选择影响数量与模板的选择`}
                placeholder="请选择"
                width={124}
                data={[
                  { id: "1", value: "文字" },
                  { id: "2", value: "色块" },
                  { id: "3", value: "渐变" },
                ]}
                selected={type}
                onChange={(item) => {
                  setType(item.id);
                }}
                className="flex-1"
              />
              <Select
                title="数量"
                info="类型"
                placeholder="请选择"
                width={124}
                data={NumberSelects}
                selected={number}
                onChange={(item) => {
                  setNumber(item.id);
                }}
                className="flex-1"
              />
              <Select
                title="比例"
                info="类型"
                placeholder="请选择"
                data={[
                  { id: "1", value: "文字" },
                  { id: "2", value: "6" },
                  { id: "3", value: "8" },
                ]}
                selected={percentage}
                onChange={(item) => {
                  setPercentage(item.id);
                }}
                className="flex-1"
              />
            </Flex>
          </Flex>
          {/* 选择模版 */}
          <Flex column gap={12}>
            <Flex column gap={8}>
              <Title title="Step 03: 设置配色模版" type="h3" />
              <Title
                title="根据色彩占比等因素选择合适的配色模板"
                type="p"
                className="color-gray-4"
              />
            </Flex>
            <StyleTemplateBox className="grid gap-8 width-100 p-12 border">
              {template?.map((item) => (
                <div className="cursor-pointer" style={{ aspectRatio: 1 }}>
                  {item.element}
                </div>
              ))}
            </StyleTemplateBox>
          </Flex>
        </div>
        <div className="px-24 py-24 width-100 border-top">
          <Button
            text="立即生成"
            type="background"
            status="primary"
            width="100%"
            disabled={submitDisabled}
            pop={submitDisabled ? "请先填写完整" : ""}
            onClick={() => {
              getMapColors();
              setFilterChecked(false);
            }}
          />
        </div>
      </StyleLeftBox>
      <StyleRightBox
        className="flex-1 pl-32 pr-24 height-100 py-32 border-left overflow-auto"
        style={{ flexShrink: 0 }}
      >
        {/* 操作项 */}
        {mapColors.length !== 0 && (
          <div className="flex gap-12 mb-12">
            <Check
              text="自动过滤"
              pop="勾选后将过滤掉对比度不理想的结果"
              checked={filterChecked}
              onChange={() => {
                setFilterChecked(!filterChecked);
                setMapColors(mapColors.filter((itm) => itm[0].contrast > 4.5));
              }}
            />
          </div>
        )}
        <StyleTemplateBox className="grid gap-12 width-100">
          {mapColors.map((item) => (
            <Fragment>
              {type === "1" && (
                <div className="flex">
                  {Array.from({ length: 2 }).map(
                    (_item1: any, index: number) => (
                      <StyleTemplateCard className="flex column">
                        <div
                          className="p-12 flex-2"
                          style={{
                            backgroundColor: item[index].color,
                            color: item[1 - index].color,
                          }}
                        >
                          <p className="fs-12">
                            The quick, brown, cerise red, and energy yellow fox
                            jumped over the lazy dog.
                          </p>
                          <p className="fs-12">
                            {item[0].color} {item[1].color}
                          </p>
                        </div>
                        {/* 结果 */}
                        <div className="flex-1 flex items-center gap-4 px-12 color-gray-3 bg-gray">
                          <p
                            style={{
                              color:
                                item[0].contrast > 4.5
                                  ? "var(--color-green-6)"
                                  : "var(--color-red-6)",
                            }}
                          >
                            {item[0].contrast > 4.5 ? "success" : "fail"}
                          </p>
                          <p className="fs-12">
                            对比度：
                            <span className="fs-16 fw-600">
                              {item[0].contrast}
                            </span>
                            :1
                          </p>
                        </div>
                      </StyleTemplateCard>
                    )
                  )}
                </div>
              )}
              {type === "3" && (
                <div
                  style={{
                    aspectRatio: 1,
                    background: `linear-gradient(to bottom, ${item[0].color} 0%, ${item[1].color} 100%)`,
                  }}
                ></div>
              )}
            </Fragment>
          ))}
        </StyleTemplateBox>
      </StyleRightBox>
    </StyleColorContainer>
  );
};

const StyleColorContainer = styled.div`
  height: calc(100vh - 64px);
  @media screen and (max-width: 800px) {
    flex-direction: column;
    height: fit-content;
  }
`;

const StyleLeftBox = styled.div`
  @media screen and (max-width: 800px) {
    width: 100vw;
  }
`;

const StyleColorItem = styled.div`
  .close-icon {
    top: -6px;
    right: -6px;
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--transition-15) linear;
    will-change: opacity;
  }
  &:hover .close-icon {
    opacity: 1;
    pointer-events: all;
  }
`;

const StyleRightBox = styled.div`
  @media screen and (max-width: 800px) {
    width: 100vw;
  }
`;

const StyleColorsLib = styled.div`
  height: 84px;
  & + .StyleToggleBtn svg {
    transition: transform var(--transition-15) ease;
  }
  &.show {
    height: fit-content;
    overflow: visible;
    & + .StyleToggleBtn svg {
      transform: rotate(180deg);
    }
  }
`;
const StyleToggleBtn = styled.div`
  bottom: 0;
  left: 50%;
  background-color: var(--color-bg-white);
  transform: translate(-50%, 50%);
`;

const StyleTemplateBox = styled.div`
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  @media screen and (max-width: 800px) {
    width: calc(100vw - 48px);
  }
`;

const StyleTemplateCard = styled.div`
  aspect-ratio: 0.75;
  line-height: 1.15em;
  animation: showin 0.3s linear 0s 1;
  @keyframes showin {
    from{
      filter: blur(2px);
    }
    to{
      filter: blur(0px);
    }
  }
`

export default ColorMatch;
