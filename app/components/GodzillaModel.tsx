import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Group } from "three";
console.log(`DEV env: ${process.env.NEXT_PUBLIC_DEV}`);
const modelPath =
  process.env.NEXT_PUBLIC_DEV === "true"
    ? "/godzilla.glb"
    : "/threeJs-monsters-world/godzilla.glb";
const audioPath =
  process.env.NEXT_PUBLIC_DEV === "true"
    ? "/roar.mp3"
    : "/threeJs-monsters-world/roar.mp3";
useGLTF.preload(modelPath);

export default function GodzillaModel({ setTextColor }: any) {
  const group = useRef<Group>(null);

  const { animations, scene } = useGLTF(modelPath);
  const { actions } = useAnimations(animations, scene);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const textColorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { viewport } = useThree();

  const animatedAction = actions["Godzilla, Why are you soo creepy?"]

  useEffect(() => {
    if (animatedAction) {
      animatedAction.play().paused = true;
    }
    audioRef.current = new Audio(audioPath);
  }, [actions]);

  const handleClick = () => {
    if (animatedAction) {
      // Clear any existing timeouts
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
      if (textColorTimeoutRef.current) {
        clearTimeout(textColorTimeoutRef.current);
      }

      // Start animation and sound
      animatedAction.reset().play();
      if (audioRef.current) {
        audioRef.current.volume = 1;
        audioRef.current.play();
      }

      // Change text
      setTextColor("#00F1F3");

      // Set timeout to start fade-out
      animationTimeoutRef.current = setTimeout(() => {
        const fadeOutDuration = 1000; // 1 second fade-out duration
        const fadeOutStart = Date.now();

        const fadeOut = () => {
          const elapsed = Date.now() - fadeOutStart;
          const progress = elapsed / fadeOutDuration;

          if (animatedAction) {
            animatedAction.timeScale = Math.max(
              1 - progress,
              0
            );
          }

          if (audioRef.current) {
            audioRef.current.volume = Math.max(1 - progress, 0);
          }

          if (progress < 1) {
            requestAnimationFrame(fadeOut);
          } else {
            if (animatedAction) {
              animatedAction.paused = true;
              animatedAction.timeScale = 1; // Reset timeScale
            }
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0; // Reset the audio
            }

            // Change text color back to white
            textColorTimeoutRef.current = setTimeout(() => {
              setTextColor("white");
            }, 1000);
          }
        };

        fadeOut();
      }, 4000);

      // Set timeout to reset animation state after 5 seconds
      resetTimeoutRef.current = setTimeout(() => {
        if (animatedAction) {
          animatedAction.time = 0; // Reset the animation
        }
      }, 5000);
    }
  };

  return (
    <group
      ref={group}
      position={[0, -viewport.aspect * 70, -viewport.aspect * 135]}
      scale={[
        viewport.aspect / 1.5,
        viewport.aspect / 1.5,
        viewport.aspect / 1.5,
      ]}
      onClick={handleClick}
    >
      <primitive object={scene} />
    </group>
  );
}