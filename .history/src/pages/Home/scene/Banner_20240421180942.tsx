import React from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

type Props = {};
const Banner: React.FC<Props> = ({}) => {
  return (
    <Canvas style={{ height: "100vh" }}>
      <color attach={"background"} args={["gray"]} />
      <Model />
    </Canvas>
  );
};

function Model({}) {
  const { scene } = useGLTF("banner.glb");
  const model = nodes["panelr"];
  return <primitive object={model} dispose={null} />;
}
export default Banner;
