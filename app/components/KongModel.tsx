import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Group } from "three";

const modelPath =
  process.env.NEXT_PUBLIC_DEV === "true"
    ? "/king_kong.glb"
    : "/threeJs-monsters-world/king_kong.glb";

const audioPath =
  process.env.NEXT_PUBLIC_DEV === "true"
    ? "/king_kong.mp3"
    : "/threeJs-monsters-world/king_kong.mp3";

useGLTF.preload(modelPath);

export default function KongModel({ setTextColor }: any) {
  const group = useRef<Group>(null);

  const { animations, scene } = useGLTF(modelPath);
  const { actions } = useAnimations(animations, scene);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const textColorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { viewport } = useThree();

  const animatedAction = actions["King_Kong_Legendary_2021_skeleton|roar"]
  const animatedActionIdle = actions["King_Kong_Legendary_2021_skeleton|idle"]

  useEffect(() => {
    if (animatedAction && animatedActionIdle) {
        animatedAction.play().paused = true;
        animatedActionIdle.play()
    }
    audioRef.current = new Audio(audioPath);
  }, [actions]);

  const handleClick = () => {
    if (animatedAction && animatedActionIdle) {
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
      animatedActionIdle.paused = true;
      // Start animation and sound
      animatedAction.reset().play();
      if (audioRef.current) {
        audioRef.current.volume = 1;
        audioRef.current.play();
      }

      // Change text
      setTextColor("#dc7500");

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
            if (animatedAction && animatedActionIdle) {
                animatedAction.paused = true;
                animatedActionIdle.reset().play()
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
      }, 3000);

      // Set timeout to reset animation state
      resetTimeoutRef.current = setTimeout(() => {
        if (animatedAction) {
            animatedAction.time = 0; // Reset the animation
        }
      }, 4000);
    }
  };

  return (
    <group
      ref={group}
      position={[0, -viewport.aspect * 8, -viewport.aspect * 18]}
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
