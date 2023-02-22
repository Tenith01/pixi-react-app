import React, { useState, useEffect } from 'react';
import './App.css';
import { Stage, Sprite, withFilters, Container } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import wizard from "./wizard.gif";

const Filters = withFilters(Container, {
    blur: PIXI.filters.BlurFilter
});

const App = () => {
    const [position, setPosition] = useState({ x: 150, y: 150 });
    console.log(position,setPosition);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setPosition(prevPosition => {
                return {
                    x: prevPosition.x + Math.random() * 10 - 5,
                    y: prevPosition.y + Math.random() * 10 - 5
                };
            });
        }, 100);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Stage width={1920} height={1080} options={{ backgroundColor: 0x012b30, antialias: true }}>
            <Filters blur={{ blur: 0 }}>
                <Sprite image={wizard} x={position.x} y={position.y} width={200} height={200} />
            </Filters>
        </Stage>
    );

};

export default App;