import './App.css';
import {Stage, Sprite} from "@inlet/react-pixi"
import wizard from "./wizard.png";

const App = () => {
    return (
        <Stage width={300} height={300} options={{backgroundColor: 0x012b30, antialias: true}}>
            <Sprite image={wizard}/>
        </Stage>
    )
}
export default App;
