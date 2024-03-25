import React from "react";
import styled from "styled-components";
import {
  LandLayout,
  LandHeader,
  LandMenu,
  LandContent,
    LandFooter,
  Land
} from "@suminhan/land-design";

type Props = {};
const Home: React.FC<Props> = ({}) => {
  return (
    <LandLayout className="border width-100" style={{ height: 600 }}>
      <LandHeader
        logo={<p>🌷🌷🌷</p>}
        // name={<Title title="Web Site" type="h2" />}
        // navData={[
        //   { key: 1, title: "设计", clickType: ClickType.SELF },
        //   { key: 2, title: "组件", clickType: ClickType.SELF },
        //   { key: 3, title: "文档", clickType: ClickType.SELF },
        // ]}
        actived={1}
        align="end"
      />
      <LandLayout>
        {/* <LandSider placement='left'></LandSider> */}
        <LandContent style={{ minHeight: "464px" }}></LandContent>
        {/* <LandSider placement='right'>SiderRight</LandSider> */}
      </LandLayout>
      <LandFooter>Footer</LandFooter>
    </LandLayout>
  );
};

export const StyleWrap = styled.div`
  width: 100vw;
`;
export const StyleContentWrap = styled.div`
  margin: 64px auto 0;
  width: calc(100vw - 48px);
  max-width: 960px;
`;
export default Home;
