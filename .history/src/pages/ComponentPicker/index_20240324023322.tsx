import React, { useState } from 'react'
import LandInput from '../../components/Input'
import LandButton from '../../components/Button'
import { IconClear } from '../../components/Icon'
// import {/}
type Props = {};
const ComponentPicker: React.FC<Props> = ({}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const handleSubmit = (url: string) => {
    // setSrc(url);
    // const siteDom = WebsiteRef.current?.querySelector('.thumbplayer');
    // console.log(siteDom);
  };
  return (
    <div className="StyleWrap">
      <StyleContentWrap className="StyleContentWrap flex column items-center">
        <div className="flex gap-12" style={{ width: "480px", height: "40px" }}>
          <LandInput
            placeholder="请输入你想探索的网站"
            value={inputValue}
            onChange={(val) => setInputValue(val)}
            suffix={
              <IconClear
                size={22}
                color="#999"
                className="pointer"
                onClick={() => setInputValue("")}
              />
            }
          />
          <LandButton
            text="start"
            type="primary"
            width={80}
            onClick={() => inputValue && handleSubmit(inputValue)}
          />
        </div>
        {/* <StyleIframe className="StyleIframe mt-24 width-100" ref={WebsiteRef} src={src} /> */}
      </StyleContentWrap>
      {/* <Link>链接</Link> */}
      <Button>按钮</Button>
    </div>
  );
};

export default ComponentPicker;
