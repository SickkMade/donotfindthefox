import React, { useState } from "react"
import PropTypes from "prop-types"
import '../css/gameBoard.css'

function GameBoard({ tileList, setTileList, isGameOver, setIsGameOver, setIsGameWin, isGameWin }) {
    //new arr filled with -1
    const [gameBoard, setGameBoard] = useState(Array.from(Array(4), () => new Array(4).fill(-1)))
    const [matchesBoard, setMatchesBoard] = useState(Array.from(Array(4), () => new Array(4).fill(0)))

    const returnType = (tile, j, i) => {
        if(tile != -1){
            return <div 
            className={`gameboard--tile ${matchesBoard[i][j] === 1 && 'gameboard--tile__found'}`}
            key={`tile ${i}-${j}`}
            >{tile[0]}</div>
        }
        else{
            return j+1 + (4*i)
        }
    }

    const onClick = (i, j) => {
        if(gameBoard[i][j] != -1) return;
        const newBoard = [...gameBoard]
        newBoard[i] = [...gameBoard[i]]
        newBoard[i][j] = tileList[0]

        checkForWin(tileList.length-1)
        setTileList(tileList.slice(1))

        setGameBoard(newBoard)
        checkForFox(newBoard, i, j)
    }

    const checkForWin = (length) => {
        if(length === 0){
            setIsGameWin(true)
        }
    }

    const endGame = (dir, row, col) => {
        const newMatchesBoard = matchesBoard.map(inner => [...inner])

        newMatchesBoard[row+dir[1]][col+dir[0]] = 1
        newMatchesBoard[row+(dir[1]*2)][col+(dir[0]*2)] = 1
        newMatchesBoard[row][col] = 1

        setMatchesBoard(newMatchesBoard)
        setIsGameOver(true)
    }

    const checkForFox = (gameBoard, row, col) => {
        const dirs = [
            [0,1],
            [1,0],
            [1,1],
            [0,-1],
            [-1,0],
            [-1,-1],
            [-1,1],
            [1,-1],
        ]
        dirs.forEach(dir => {
            let word = gameBoard[row][col] //'f' or 'o' or 'x'
            //check for bounds
            if(
                (2*dir[0]) + col < gameBoard[row].length && 
                (2*dir[0]) + col >= 0 && 
                (2*dir[1]) + row < gameBoard.length &&
                (2*dir[1]) + row >= 0 
            ){
                word+=gameBoard[row+dir[1]][col+dir[0]]
                word+=gameBoard[row+(dir[1]*2)][col+(dir[0]*2)]
                if(word === 'fox' || word === 'xof'){
                    //YOU FOUND THE FOX D:
                    endGame(dir, row, col);
                }
            }
        })
    }

  return (
    <div className={`gameboard ${isGameOver && 'gameboard__game-over'} ${isGameWin && 'gameboard__game-win'}`}>
    {gameBoard.map((innerArr, i) => (
        <div className="gameboard--tile--row" key={`row ${i}`}>
        {innerArr.map((tile,j) => (
            <React.Fragment key={`cell ${i}-${j}`}>
            <div className="gameboard--backing-tile" onClick={() => onClick(i, j)} key={`backing ${i}-${j}`}>{returnType(tile, j, i)}</div>
            </React.Fragment>
        ))}
        </div>
    ))}
    </div>
  )
}

GameBoard.propTypes = {
    tileList: PropTypes.array,
    setTileList: PropTypes.func,
    isGameOver: PropTypes.bool,
    setIsGameOver: PropTypes.func,
    setIsGameWin: PropTypes.func,
    isGameWin: PropTypes.bool,
}

export default GameBoard