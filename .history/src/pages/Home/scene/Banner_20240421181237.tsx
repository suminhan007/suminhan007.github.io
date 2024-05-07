import React from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

type Props = {};
const Banner: React.FC<Props> = ({}) => {
  return (
    <Canvas style={{ height: "100vh" }}>
      <color attach={"background"} args={["gray"]} />
      <Model url="untitled.glb" />
    </Canvas>
  );
};

function Model(url: string) {
  const { scene, nodes } = useGLTF(url);
  const model = nodes["panelr"];
  return <primitive object={scene} dispose={null} />;
}
export default Banner;
