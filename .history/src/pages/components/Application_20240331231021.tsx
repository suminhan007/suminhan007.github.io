import React from "react";

type Props = {
    home
  data?: { name: string; icon: string | React.ReactNode; link?: string }[];
};

const Application: React.FC<Props> = ({
    data = [
        {name:'首页'}
    ]
}) => {
    return <div>
        {data.map(item =>
            <div></div>
        )}
  </div>;
};
export default Application;