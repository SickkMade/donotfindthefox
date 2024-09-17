import GameBoard from "./components/GameBoard"
import Tiles from "./components/Tiles"
import './css/foxgame.css'
import { useState } from "react"

function App() {
  //very not eligant! i can make it pretty later
  const shuffle = () => {
    let array = ['f', 'f', 'f', 'f', 'f', 'o', 'o', 'o', 'o', 'o', 'o', 'x', 'x', 'x', 'x', 'x']
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  const newGame = () =>{
    window.location.reload();
  }

  const [tileList, setTileList] = useState(shuffle())
  const [isGameOver, setIsGameOver] = useState(false)
  const [isGameWin, setIsGameWin] = useState(false)
  return (
    <section id="main">
    <div className="foxgame--title-div"><h1 className="foxgame--title__underline">DO NOT</h1><h1>FIND THE FOX</h1></div>
    {(isGameOver || isGameWin) && <button className="foxgame--center-button" onClick={newGame}>{isGameWin ? 'Play Again' : 'Try Again'}</button>}
    {isGameOver && <h1 className='foxgame--center-text'>YOU LOSE</h1>}
    {isGameWin && <h1 className='foxgame--center-text'>YOU WIN</h1>}
    <GameBoard tileList={tileList} setTileList={setTileList} isGameOver={isGameOver} setIsGameOver={setIsGameOver} newGame={newGame} isGameWin={isGameWin} setIsGameWin={setIsGameWin}/>
    <Tiles tileLength={tileList.length}/>
    </section>
  )
}

export default App