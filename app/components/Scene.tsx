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
  const [titanName, setTitanName] = useState("Godzilla");

  // @TODO: states for button click
  const [buttonState, setButtonState] = useState(titanName);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.table(`titanName: ${titanName}`);
    setButtonState(titanName);
  };

  return (
    <>
      <nav className="flex flex-1 p-4 m-2 justify-between items-center md:text-2xl text-l">
        <h2 className="flex items-center">Monsters World</h2>
        <div id="titan-container" className="flex md:gap-4 gap-2 text-wrap">
          <label id="select-titan" className="flex flex-col md:text-2xl text-sm md:gap-2">
            <span>Select titan:</span> 
            <select
              id="titan"
              name="titan"
              value={titanName}
              onChange={(e) => setTitanName(e.target.value)}
              className="text-black md:text-2l text-sm bg-white rounded-l shadow-lg flex items-center"
            >
              <option value="Godzilla">Godzilla</option>
              <option value="Kong">Kong</option>
            </select>
          </label>
          <button
            type="submit"
            className="rounded-l bg-green"
            onClick={handleSubmit}
          >
            {" "}
            Submit
          </button>
        </div>
      </nav>

      <Canvas
        className="w-screen h-1/2"
        camera={{ position: [0, 1, 4], fov: 40 }}
      >
        <ambientLight intensity={6} color={textColor} />
        <Suspense fallback={<Loader />}>
          <Text
            position={[-2, 10, -120]} // Adjust the z position to be behind the model
            fontSize={4}
            color={textColor}
            anchorX={12}
            anchorY="middle"
          >
            {buttonState} &nbsp; &nbsp; World!
          </Text>
          <Model setTextColor={setTextColor} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </>
  );
}
