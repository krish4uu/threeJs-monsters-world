"use client";

import { Canvas, Vector3 } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { OrbitControls, Text } from "@react-three/drei";
import { useProgress, Html } from "@react-three/drei";
import GodzillaModel from "./GodzillaModel";
import KongModel from "./KongModel";
import Navbar from "./Navbar";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(1)} % loaded</Html>;
}

export default function Scene() {
  const [textColor, setTextColor] = useState("white");
  const [titanName, setTitanName] = useState("Godzilla");
  const [buttonStateTitan, setButtonStateTitan] = useState(titanName);

  const textPOS: Record<string, Vector3> = {
    Kong: [-3, 6, -85],
    Godzilla: [-2, 10, -120],
  };

  return (
    <>
      <Navbar
        setButtonStateTitan={setButtonStateTitan}
        setTitanName={setTitanName}
        titanName={titanName}
      />
      <Canvas
        className="w-screen h-1/2"
        camera={{ position: [0, 1, 4], fov: 45 }}
      >
        <ambientLight intensity={6} color={textColor} />
        <Suspense fallback={<Loader />}>
          <Text
            position={textPOS[buttonStateTitan]} // Adjust the z position to be behind the model
            fontSize={4}
            color={textColor}
            anchorX={13}
            anchorY="middle"
          >
            {buttonStateTitan} &nbsp; &nbsp; &nbsp; World!
          </Text>
          {buttonStateTitan === "Kong" ? (
            <KongModel setTextColor={setTextColor} />
          ) : (
            <GodzillaModel setTextColor={setTextColor} />
          )}
        </Suspense>
        <OrbitControls />
      </Canvas>
    </>
  );
}
