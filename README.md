# ThreeJs interactive 3D Model (Currently Godzilla)

This project is planned to have different `interactive 3D Titan Monsters models` and Currently showcases a 3D model of Godzilla using Three.js with `react-three-fiber` in a Next.js application. The model performs animations, reacts to mouse clicks, and changes the GodZilla and text color based on user interactions.

## Features

- 3D model rendering with Three.js and `react-three-fiber`
- Animated Godzilla model with click-triggered animation and sound
- Dynamic text and GodZilla color changes
- Smooth transitions and interaction handling
- Handle camera angles with mouse (`hold right or hold left` click)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm
- You have a modern web browser (Chrome)

## Installation

1. Clone the repository:

```sh
git clone https://github.com/krish4uu/threeJs-monsters-world.git
cd threeJs-monsters-world

```
2. Install dependencies:

```sh
npm install

```

## Running the Project

1. Create `.env.local` file at root:

```sh 
 NEXT_PUBLIC_DEV = true

```

2. Start the development server:

```sh 
npm run dev

```

3. Open your browser and navigate to:

```sh
http://localhost:3000

```
## Usage

- Click on the Godzilla model to trigger the animation and sound.
- The text and GodZilla's color will change to `sky-blue` while the animation is playing.
- After the animation completes, the colors will smoothly transition back to their original states.

## ScreenShot

https://github.com/user-attachments/assets/d337fab6-8973-498c-91b0-bc0f7a026fe4


### Reference

- GodZilla GLB Model From:  `https://sketchfab.com`
