"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { OrbitControls, Text } from "@react-three/drei";
import { useProgress, Html } from "@react-three/drei";
import Model from "./Model";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(1)} % loaded</Html>;
}

export default function Scene() {
  const [textColor, setTextColor] = useState("white");

  return (
    <Canvas
      className="w-full h-full"
      camera={{ position: [2, 2, 40], fov: 50 }}
    >
      <ambientLight intensity={6} color={textColor}/>
      <Suspense fallback={<Loader />}>
        <Text
          position={[-5, 10, -27]} // Adjust the z position to be behind the model
          fontSize={4}
          color={textColor}
          anchorX={17}
          anchorY="middle"
        >
          Titan                 World
        </Text>
        <Model setTextColor={setTextColor} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
