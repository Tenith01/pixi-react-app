import React, { useRef, useEffect, useState } from 'react';
import { Stage, Sprite, withFilters, Container } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';

import wizard from "./aa.png";
import animationData from "./animation-data.json";

const Filters = withFilters(Container, {
    blur: PIXI.filters.BlurFilter
});

const App = () => {
    const spriteRef = useRef(null);
    const [scale, setScale] = useState(12);
    const [positionAmplitude, setPositionAmplitude] = useState(25);

    useEffect(() => {
        let currentFrame = 0;
        const frameRate = 24;
        const frameDuration = 1000 / frameRate;
        let animationInterval = null;

        const animate = () => {
            if (spriteRef.current) {
                const animationFrame = animationData[currentFrame % animationData.length];
                const scaleValue = scale / 100;
                const x = animationFrame[0] + positionAmplitude * Math.sin(currentFrame / animationData.length * 2 * Math.PI);
                const y = animationFrame[1] + positionAmplitude * Math.cos(currentFrame / animationData.length * 2 * Math.PI);

                spriteRef.current.scale.set(scaleValue);
                spriteRef.current.x = x;
                spriteRef.current.y = y+-200;

                currentFrame += 1;
            }
        };

        animationInterval = setInterval(animate, frameDuration);

        return () => clearInterval(animationInterval);
    }, [scale, positionAmplitude]);

    const handleScaleSliderChange = (event) => {
        const value = event.target.value;
        setScale(value);
    };

    const handlePositionSliderChange = (event) => {
        const value = event.target.value;
        setPositionAmplitude(value);
    };

    return (
        <div>
            <div>
                <label htmlFor="scaleSlider">Scale:</label>
                <input id="scaleSlider" type="range" min="0" max="100" defaultValue="12" onChange={handleScaleSliderChange} />
            </div>
            <div>
                <label htmlFor="positionSlider">Position Amplitude:</label>
                <input id="positionSlider" type="range" min="0" max="50" defaultValue="25" onChange={handlePositionSliderChange} />
            </div>
            <Stage width={1920} height={1080} options={{backgroundColor: 0x012b30, antialias: true}}>
                <Filters blur={{blur: 0}}>
                    <Sprite image={wizard} ref={spriteRef} x={animationData[0][0]} y={animationData[0][1]} scale={scale * 0.01} />
                </Filters>
            </Stage>
        </div>
    )
};

export default App;