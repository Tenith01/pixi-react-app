import React, {useState, useEffect} from 'react';
import './App.css';
import {Stage, Sprite, withFilters, Container} from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import wizard from "./wizard.gif";
import json from "./Comp1-animation-data.json";

const Filters = withFilters(Container, {
    blur: PIXI.filters.BlurFilter
});

const App = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentScaleIndex, setCurrentScaleIndex] = useState(0);
    const [position, setPosition] = useState(25); // percentage value
    const [scaleValue, setScaleValue] = useState(12); // percentage value

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((currentIndex) => (currentIndex + 1) % json.length);
            setCurrentScaleIndex((currentScaleIndex) => (currentScaleIndex + 1) % json.length);
        }, 1000 / 24);

        return () => clearInterval(interval);
    }, []);

    const currentData = json[currentIndex];
    const currentScaleData = json[currentScaleIndex];

    const [x, y] = currentData.p.map((val) => val * (position / 100));
    const [width, height] = currentData.s.map((val) => val * (position / 100));
    const [scaleX, scaleY] = currentScaleData.s.map((val) => val * (scaleValue / 100));

    return (
        <div>
            <div>
                <label>
                    Position:
                    <input type="range" min="0" max="100" value={position}
                           onChange={(event) => setPosition(parseInt(event.target.value))}/>
                    {position}%
                </label>
            </div>
            <div>
                <label>
                    Scale:
                    <input type="range" min="0" max="100" value={scaleValue}
                           onChange={(event) => setScaleValue(parseInt(event.target.value))}/>
                    {scaleValue}%
                </label>
            </div>
            <Stage width={1920} height={1080} options={{backgroundColor: 0x012b30, antialias: true}}>
                <Filters blur={{blur: 0}}>
                    <Sprite image={wizard} x={x} y={y} width={width} height={height} scale={{x: scaleX, y: scaleY}}/>
                </Filters>
            </Stage>
        </div>
    );
};

export default App;