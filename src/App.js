import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board({ isXTurn, squares, onPlay }) {
  function handleSquareClick(squareIndex) {
    if (calculateWinner(squares) || squares[squareIndex]) {
      return;
    }

    const tempSquares = [...squares]; // shallow copy
    tempSquares[squareIndex] = isXTurn ? "X" : "O";

    onPlay(tempSquares);
  }

  const winner = calculateWinner(squares);

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${isXTurn ? "X" : "O"}`;
  }
  const board = Array(3).map((_, rowIndex) => {
    return (
      <div className="board-row">
        Array(3).map(
        {(_, colIndex) => {
          return (
            <Square
              value={squares[rowIndex * 3 + colIndex]}
              onSquareClick={() => handleSquareClick(0)}
            />
          );
        }}
        );
      </div>
    );
  });
  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleSquareClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleSquareClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleSquareClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleSquareClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleSquareClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleSquareClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleSquareClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleSquareClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleSquareClick(8)} />
      </div>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isHistoryAscending, setIsHistoryAscending] = useState(true);
  const isXTurn = currentMove % 2 == 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function changeHistoryOrder() {
    setIsHistoryAscending(!isHistoryAscending);
  }

  const moves = history.map((_squares, index, history) => {
    const move = isHistoryAscending ? index : history.length - 1 - index;
    if (move == currentMove) {
      return (
        <li key={move}>
          <div>You are at move #{move}</div>
        </li>
      );
    }
    const description = move === 0 ? "Go to game start" : `Go to move #${move}`;
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board isXTurn={isXTurn} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={changeHistoryOrder}>Change history order</button>
        <ol reversed={!isHistoryAscending}>{moves}</ol>
      </div>
    </div>
  );
}
