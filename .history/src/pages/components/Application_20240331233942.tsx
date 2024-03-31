import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Colors from "../Colors";
import { IconArrowLine } from "../../components/Icon";

type Props = {
  data?: {
    name: string;
    icon: string | React.ReactNode;
    path: string;
  }[];
};

const Application: React.FC<Props> = ({
  data = [
    { name: "首页", icon: <>🏠🏠🏠</>, path: "/" },
    {
      name: "Colors",
      icon: <>🌈🌈🌈</>,
      path: "/Colors",
      component: <Colors />,
    },
  ],
}) => {
  return (
    <StyleApplicationWrap className="flex column">
      {data.map((item, index) => (
        <Link to={item.path}>
          <div className="flex gap-12">
            {item.icon}
            <p className="fs-16">{item.name}</p>
          </div>
          {index === 0 && (
            <IconArrowLine style={{ transform: "rotate(-90deg)" }} />
          )}
        </Link>
      ))}
    </StyleApplicationWrap>
  );
};

const StyleApplicationWrap = styled.div`
  width: 200px;
  a {
    padding: var(--padding-medium);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50%;
    border-radius: var(--radius-6);
    &:hover {
      background-color: var(--color-bg-1);
    }
    &:first-of-type {
      width: 100%;
    }
  }
  p {
    font-size: 16px;
    color: var(--color-text-1);
    font-weight: var(--font-weight-600);
  }
`;
export default Application;
