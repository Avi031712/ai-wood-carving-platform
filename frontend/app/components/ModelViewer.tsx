"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Environment } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

function STLModel({ url }: { url: string }) {
  const geometry = useLoader(STLLoader, url);

  geometry.computeVertexNormals();
  geometry.center();

  return (
    <mesh geometry={geometry} scale={1.5} rotation={[-Math.PI / 2, 0, 0]}>
      <meshPhysicalMaterial
        color="#d4a373"
        metalness={0.2}
        roughness={0.5}
        clearcoat={1}
        clearcoatRoughness={0.2}
      />
    </mesh>
  );
}

export default function ModelViewer({ modelPath }: { modelPath: string }) {
  if (!modelPath) return null;

  return (
    <div
      style={{
        width: "100%",
        height: "600px",
        borderRadius: "20px",
        overflow: "hidden",
        background: "#020617",
      }}
    >
      <Canvas camera={{ position: [0, 120, 220], fov: 45 }}>
        {/* Lighting */}
        <ambientLight intensity={1.2} />

        <directionalLight
          position={[100, 100, 100]}
          intensity={2}
        />

        <pointLight
          position={[-100, 100, -100]}
          intensity={1.5}
        />

        {/* Environment */}
        <Environment preset="city" />

        {/* Stage */}
        <Stage environment="city" intensity={0.6}>
          <STLModel url={`http://127.0.0.1:8000/${modelPath}`} />
        </Stage>

        {/* Controls */}
        <OrbitControls
          autoRotate
          autoRotateSpeed={1.5}
          enablePan={true}
          enableZoom={true}
          minDistance={100}
          maxDistance={500}
        />
      </Canvas>
    </div>
  );
}