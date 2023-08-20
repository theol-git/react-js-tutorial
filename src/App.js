import { useState } from "react";

function MyButton({ clickCount, onClick }) {
  return (
    <>
      <div> You clicked this button {clickCount} times. </div>
      <button onClick={onClick}>Click me</button>
    </>
  );
}
export default function App() {
  const [clickCount, setClickCount] = useState(0);

  function handleClick() {
    console.log("Button clicked!");
    setClickCount(clickCount + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton clickCount={clickCount} onClick={handleClick} />
      <MyButton clickCount={clickCount} onClick={handleClick} />
    </div>
  );
}
