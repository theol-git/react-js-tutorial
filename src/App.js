import { useState } from "react";

function Square({ value, onSquareClick, highlighted }) {
  const buttonClass = `square ${highlighted ? "active" : ""}`;
  return (
    <button className={buttonClass} onClick={onSquareClick}>
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
      return [a, b, c];
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

  const winnerSquares = calculateWinner(squares);
  let status;
  if (winnerSquares) {
    const winner = squares[winnerSquares[0]];
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${isXTurn ? "X" : "O"}`;
  }

  return (
    <div>
      {[0, 1, 2].map((row) => {
        return (
          <div className="board-row">
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              const highlighted = winnerSquares
                ? winnerSquares.includes(index)
                : false;
              return (
                <Square
                  value={squares[index]}
                  highlighted={highlighted}
                  onSquareClick={() => {
                    handleSquareClick(index);
                  }}
                />
              );
            })}
          </div>
        );
      })}
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
