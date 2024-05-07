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

type ModelProps = {};
const Model: React.FC<ModelProps> = ({}) => {
  const { nodes } = useGLTF("banner.glb");
  return (
    <mesh position={[0, 0, 0]}>
      <primitive object={nodes.scene} />
    </mesh>
  );
};
export default Banner;
