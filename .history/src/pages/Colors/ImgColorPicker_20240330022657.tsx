import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Uploader from "../../components/Uploader";
import Pop from "../../components/Pop";
import Message from "../../components/Message";
import ColorPicker from "../../components/ColorPicker";
import { IconCloseCircle, IconColorPicker } from "../../components/Icon";
import Button from "../../components/Button";

type Props = {};
const ImgColorPicker: React.FC<Props> = ({}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [colors, setColors] = useState<any>([]);
  const [size, setSize] = useState<{ w: number; h: number }>();
  useEffect(() => {
    if (!imgRef.current) return;
    const img = imgRef.current?.getBoundingClientRect();
    setSize({ w: img.width, h: img.height });
  }, [imgUrl]);

  const convertRgbToHex = (rgb: string) => {
    let arr: string[] = rgb.slice(0, rgb.length).split(",");
    let hexColor: string = "#";
    for (let i = 0; i < arr.length; i++) {
      let t = Number(arr[i]).toString(16);
      if (t == "0") {
        t = t + "0";
      }
      hexColor += t;
    }
    return hexColor;
  };
  const [colorArr, setColorArr] = useState<any>([]);

  useEffect(() => {
    if (colorArr.length === 0) {
      let arr: { id: number; value: string }[] = [];
      colors?.map((item: any, index: number) => {
        arr.push({
          id: index + 1,
          value: convertRgbToHex(item[0]),
        });
      });
      setColorArr(arr);
    }
  }, [colors]);

  const handlePick = () => {
    if (colorArr.length >= 0) {
      if (colorArr.length < 8) {
        if (!window.EyeDropper) return;
        let color: string = "";
        const eyeDropper = new EyeDropper();
        eyeDropper
          .open()
          .then((result) => {
            color = result.sRGBHex;
            setColorArr([
              ...colorArr,
              { id: colorArr.length + 1, value: color },
            ]);
          })
          .catch((e) => {
            resultElement.textContent = e;
          });
      } else {
        handleShowToast(true, "已达上限～长按删除后重试");
      }
    } else {
      handleShowToast(true, "请先上传图片～");
    }
  };
  const handleDeleteColor = (id: number) => {
    const newColorLost = colorArr.filter((itm: any) => itm.id != id);
    setColorArr(newColorLost);
  };
  //提示信息
  const [toast, setToast] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string>("");
  const handleShowToast = (show: boolean, text: string) => {
    setToastText(text);
    setToast(show);
    const timer = setTimeout(() => {
      setToast(false);
      clearTimeout(timer);
    }, 1000);
  };
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /** 分析图片数据 */
  const analyzeImageData = (imageData: any) => {
    let data: any = imageData;
    let rgbCounts: any = {};
    var r0,
      g0,
      b0 = 0;
    for (let i = 0; i < data.length; i += 24) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];
      // 将RGB组合成一个键，并计数
      if (
        Math.abs(r - r0) >= 10 ||
        Math.abs(g - g0) >= 10 ||
        Math.abs(b - b0) >= 10
      ) {
        let rgbKey = `${r},${g},${b}`;
        rgbCounts[rgbKey] = (rgbCounts[rgbKey] || 0) + 1;
      }
      r0 = data[i];
      g0 = data[i + 1];
      b0 = data[i + 2];
    }

    // 排序并获取出现次数最多的RGB值
    let sortedRgbCounts = Object.entries(rgbCounts).sort(
      (a: any, b: any) => b[1] - a[1]
    );
    let topRgbValues = sortedRgbCounts.slice(0, 6);
    // 输出或处理结果
    return topRgbValues;
  };
  /* 展示的颜色数据 */
  const [imageColor, setImageColor] = useState<[string, unknown][]>([]);

  /* 将图片绘制在canvas上 */
  const getImgData = (url: string) => {
    if (!canvasRef.current || !url) return;
    const ctx = canvasRef.current.getContext("2d");
    const img = new Image(); // 加载图片
    img.crossOrigin = "anonymous"; // 处理跨域问题
    img.src = url;
    img.onload = () => {
      // 设置canvas尺寸与图片相同
      if (canvasRef.current) {
        canvasRef.current.width = img.width;
        canvasRef.current.height = img.height;
      }
      // 将图片绘制到canvas上
      ctx?.drawImage(img, 0, 0, img.width, img.height);

      // 获取图片的像素数据
      const imageData = ctx?.getImageData(0, 0, img.width, img.height).data;
      // 处理像素数据
      setImageColor(analyzeImageData(imageData));
    };
    // 图片加载失败时设置为空字符串
    img.onerror = () => setImageColor([]);
  };
  useEffect(() => {
    imgUrl ? setColors(imageColor) : handleShowToast(true, "请先上传图片～");
  }, [imageColor]);
  useEffect(() => {
    getImgData(imgUrl);
  }, [imgUrl]);
  return (
    <div className="flex column items-center gap-12 px-24">
      {/* 上传框 */}
      <Uploader
        fileType="image/*"
        onUpload={(url) => {
          setImgUrl(url);
        }}
        desc="点击上传图片或将图片拖拽于此"
        className="radius-12 mt-32"
        style={{ height: "240px" }}
      >
        {imgUrl && (
          <img ref={imgRef} src={imgUrl} className="height-100 radius-8" />
        )}
      </Uploader>
      {/* 颜色列表 */}
      <StyleColorList
        className={`StyleColorList flex items-center flex-wrap gap-12 p-24 ${
          colors.length ? "show" : "hide"
        }`}
      >
        {colorArr?.map((item: any) => (
          <StyleColorItem
            className="flex column relative justify-center gap-4"
            onClick={() => handleShowToast(true, "已复制~")}
          >
            <ColorPicker value={item.value} showDrop={false} />
            <div
              className="absolute cursor-pointer close-icon"
              onClick={() => handleDeleteColor(item.id)}
            >
              <IconCloseCircle fill="var(--color-red-6)" />
            </div>
          </StyleColorItem>
        ))}
        {colors.length ? (
          <StyleAddColorBtn
            className="StyleAddColorBtn relative flex both-center border radius-50 cursor-pointer hover-pop"
            onClick={() => handlePick()}
          >
            <IconColorPicker />
            <Pop content="点击吸取颜色" />
          </StyleAddColorBtn>
        ) : null}
      </StyleColorList>
      {colorArr && <canvas className="none" ref={canvasRef} />}
      <Message text={toastText} show={toast} />
      {/* 色卡 */}
      {colorArr.length !== 0 && (
        <StyleColorCardWrap className="grid mx-32 gap-24">
          {Array.from({ length: 4 }).map((_itm, index) => (
            <div className="flex column items-center gap-12">
              <StyleColorCardBox
                className={`border cursor-pointer p-24 width-100 card-${index}`}
                width={size.w}
                height={size.h}
                dir={size.w > size.h ? "h" : size.w < size.h ? "v" : "s"}
              >
                <div className="color-img">
                  <img src={imgUrl} />
                </div>
                <div className="color-list">
                  {colorArr.map((itm: any) => (
                    <div
                      key={itm.id}
                      style={{
                        background: itm.value,
                        border:
                          itm.value !== "#ffffff"
                            ? "none"
                            : "1px solid var(--color-border-1)",
                      }}
                      className="color-item flex both-center"
                    >
                      <p
                        style={{
                          mixBlendMode:
                            itm.value !== "#ffffff" ? "soft-light" : "unset",
                          color:
                            itm.value !== "#ffffff"
                              ? "var(--color-text-1)"
                              : "var(--color-border-2)",
                        }}
                      >
                        {itm.value}
                      </p>
                    </div>
                  ))}
                </div>
              </StyleColorCardBox>
              <Button type="background" className="width-100" text="保存色卡" />
            </div>
          ))}
        </StyleColorCardWrap>
      )}
    </div>
  );
};

const StyleColorList = styled.div`
  width: fit-content;
  max-width: 100%;
  &.show {
    opacity: 1;
    pointer-events: all;
    & + .ImgColorPicker {
      transform: translateY(0px);
    }
  }
  &.hide {
    opacity: 0;
    pointer-events: none;
    & + .ImgColorPicker {
      transform: translateY(-24px);
    }
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

const StyleAddColorBtn = styled.div`
  width: 48px;
  height: 48px;
  color: var(--color-text-3);
`;

const StyleColorCardWrap = styled.div`
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
`;

const StyleColorCardBox = styled.div<{
  width: number;
  height: number;
  dir?: string;
}>`
  display: flex;
  flex-direction: ${(props) => (props.dir === "h" ? "column" : "row")};
  position: relative;
  box-sizing: border-box;
  font-size: 8px;
  p {
    mix-blend-mode: soft-light;
  }
  img {
    object-fit: contain;
  }
  &.card-0,
  &.card-1,
  &.card-2,
  &.card-3 {
    gap: 4px;
    .color-img {
      width: 100%;
      aspect-ratio: ${(props) => props.width / props.height};
    }
    img {
      width: 100%;
    }
    .color-list {
      display: grid;
      gap: 4px;
      grid-auto-flow: column;
    }
    .color-item {
      height: 32px;
    }
  }
  &.card-1 {
    img,
    .color-item {
      border-radius: 4px;
    }
  }
  &.card-2 {
    .color-list {
      display: flex;
      justify-content: space-between;
    }
    .color-item {
      border-radius: 50%;
      aspect-ratio: 1;
    }
  }
  &.card-3 {
    .color-item {
      height: 12px;
    }
    p {
      margin-top: 24px;
      mix-blend-mode: unset;
    }
  }
`;
export default ImgColorPicker;
