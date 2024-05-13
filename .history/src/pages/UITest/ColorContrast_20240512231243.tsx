import React, { useMemo, useState } from "react";
import Flex from "../../components/Flex";
import ColorPicker from "../../components/ColorPicker";
import styled from "styled-components";
import { getColorContrast } from "../../utils/getColorContrast";
import Link from "../../components/Link";
import Pop from "../../components/Pop";

type Props = {};

const ColorContrast: React.FC<Props> = ({}) => {
  const [background, setBackground] = useState<string>("#fafafa");
  const [text, setText] = useState<string>("#0d0d0d");
  const isWhiteBg = useMemo(() => {
    return (
      background === "#fff" ||
      background === "#ffffff" ||
      background === "#FFF" ||
      background === "#FFFFFF"
    );
  }, [background]);
  const contrast = useMemo(() => {
    return getColorContrast(background, text).toFixed(2);
  }, [background, text]);
  const isSmallContrastOK = useMemo(() => {
    return Number(contrast) >= 7;
  }, [contrast]);
  const isContrastOK = useMemo(() => {
    return Number(contrast) >= 4.5;
  }, [contrast]);
  const isBigContrastOK = useMemo(() => {
    return Number(contrast) >= 3;
  }, [contrast]);
  return (
    <StyleColorContrastWrap className="width-100 height-100 flex">
      <div
        className={`flex-1 height-100 fs-20 p-24 ${
          isWhiteBg ? "border-right" : ""
        }`}
        style={{
          background: background,
          color: text,
        }}
      >
        The quick, brown, cerise red, and energy yellow fox jumped over the lazy
        dog. 无障碍色彩对比度 什么是对比度 ？
        对比度是两种颜色之间的亮度或颜色差异。对比度的比值越低，它们之间的差异越小。
        WCAG 的 AA级 与 AAA级 标准 ？
        为了确保尽可能多的人可以使用您的产品，对比度需要符合WCAG 的 AA级 与
        AAA级 标准。 WCAG 的 AA级
        要求小文本与背景的对比度至少为4.5：1，大文本与背景的对比度至少为3：1。
        WCAG 的 AAA级
        要求小文本与背景的对比度至少为7：1，大文本与背景的对比度为4.5：1。
        小文本指字号在19px以下的粗体文本类型，或者是字号在24px以下的常规文本类型。
        大文本指字号至少是19px以上，字重为粗体的文本类型，或者字号是24px以上的常规体文本。
      </div>
      <Flex column gap={24} className="flex-1 p-24" align="center">
        <div
          className="flex column bg-gray items-center p-24"
          style={{ width: "100%", height: "fit-content" }}
        >
          {isBigContrastOK ? <p className="fs-20">✅</p> : <p>❌</p>}
          <div className="fs-14">
            对比度：<span className="fs-32 fw-600">{contrast} </span>
            <span className="fs-20 fw-600">: 1</span>
          </div>
          <p className="fs-12 color-gray-4">
            Contrast Results based on{" "}
            <Link href="https://www.w3.org/TR/WCAG20/">WCAG 2.0</Link>
          </p>
          <Flex gap={16} justify="center" className="mt-16">
            <Flex align="baseline" gap={8}>
              <div>小文本</div>
              <span
                className="fs-12"
                style={{
                  color: isSmallContrastOK
                    ? "var(--color-green-6)"
                    : "var(--color-red-6)",
                }}
              >
                {isSmallContrastOK ? "Success" : "Fail"}
              </span>
            </Flex>
            <Flex align="baseline" gap={8}>
              <div>正常文本</div>
              <span
                className="fs-12"
                style={{
                  color: isContrastOK
                    ? "var(--color-green-6)"
                    : "var(--color-red-6)",
                }}
              >
                {isContrastOK ? "Success" : "Fail"}
              </span>
            </Flex>
            <Flex align="baseline" gap={8}>
              <div className="relative hover-pop cursor-pointer">
                大文本
                <Pop
                  theme="dark"
                  content="至少 18 点或 14 点粗体或字体大小可产生与中文、日文和韩文 (CJK)字体相同的大小"
                  style={{ maxWidth: "160px" }}
                />
              </div>
              <span
                className="fs-12"
                style={{
                  color: isBigContrastOK
                    ? "var(--color-green-6)"
                    : "var(--color-red-6)",
                }}
              >
                {isBigContrastOK ? "Success" : "Fail"}
              </span>
            </Flex>
          </Flex>
        </div>
        <Flex gap={24} className="width-100" justify="center">
          <ColorPicker
            size={160}
            input={
              <Flex className="" align="baseline" justify="space-between">
                <span className="fs-16">Text</span>
                <span className="fs-12">{text}</span>
              </Flex>
            }
            value={text}
            onChange={(val) => setText(val)}
          />
          <ColorPicker
            size={160}
            input={
              <Flex className="" align="baseline" justify="space-between">
                <span className="fs-16">Background</span>
                <span className="fs-12">{text}</span>
              </Flex>
            }
            value={background}
            onChange={(val) => setBackground(val)}
          />
        </Flex>
      </Flex>
    </StyleColorContrastWrap>
  );
};

const StyleColorContrastWrap = styled.div`
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

export default ColorContrast;
