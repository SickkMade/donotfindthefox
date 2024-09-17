import GameBoard from "./components/GameBoard"
import Tiles from "./components/Tiles"
import './css/foxgame.css'
import { useState } from "react"

function App() {
  //very not eligant! i can make it pretty later
  let array = ['f', 'f', 'f', 'f', 'f', 'o', 'o', 'o', 'o', 'o', 'o', 'x', 'x', 'x', 'x', 'x']
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  const [tileList, setTileList] = useState(array)
  return (
    <section id="main">
    <div className="foxgame--title-div"><h1 className="foxgame--title__underline">DO NOT</h1><h1>FIND THE FOX</h1></div>
    <GameBoard tileList={tileList} setTileList={setTileList}/>
    <Tiles tileLength={tileList.length}/>
    </section>
  )
}

export default App