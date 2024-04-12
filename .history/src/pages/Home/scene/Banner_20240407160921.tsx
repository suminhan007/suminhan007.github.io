import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  MeshTransmissionMaterial,
  RenderTexture,
  useGLTF,
} from "@react-three/drei";
import { useRef } from "react";

export default function Banner() {
  const { scene } = useGLTF("banner.glb");
  const contents = useRef();
  // The letters contents are moved to its whereabouts in world coordinates
  useFrame(() => contents.current.matrix.copy(main.current.matrixWorld));
  return (
    <Canvas style={{ height: "600px" }} camera={{ position: [6, 0, 6] }}>
      <color attach={"background"} args={["#BBBFE7"]} />
      <ambientLight intensity={5} />
      <directionalLight
        position={[5, 8, -4]}
        shadow-mapSize={1024}
        castShadow
      />
      <primitive object={scene} />
      <MeshTransmissionMaterial
        clearcoat={1}
        samples={3}
        thickness={40}
        chromaticAberration={0.25}
        anisotropy={0.4}
      />
    </Canvas>
  );
}
