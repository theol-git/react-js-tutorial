import { useState } from "react";

function MyButton() {
  const [clickCount, setClickCount] = useState(0)

  function handleClick() {
    console.log("Button clicked!");
    setClickCount(clickCount + 1)
  }

  return (
    <>
      <div> You clicked this button {clickCount} times. </div>
      <button onClick={handleClick}>
        Click me
      </button>
    </>
  );
}
export default function App() {
  return (
    <div>
      <h1>Counters that update seperately</h1>
      <MyButton />
      <MyButton />
    </div>
  )
}