import { Canvas } from "@react-three/fiber";
import { MeshTransmissionMaterial, useGLTF, useTexture } from "@react-three/drei";

export default function Banner() {
  const { scene } = useGLTF("banner.glb");
  return (
    <Canvas style={{ height: "600px" }} camera={{ position: [0, 0, 5] }}>
      <color attach={"background"} args={["#BBBFE7"]} />
      <ambientLight intensity={5} />
      <directionalLight position={[5, 8, -4]} intensity={2} />
      <mesh>
        <boxGeometry args={[2, 2, 2]} rot/>
        <MeshTransmissionMaterial
          color={"#504FE7"}
          roughness={0.244}
          metalness={1}
          ior={1.45}
        />
      </mesh>
    </Canvas>
  );
}
