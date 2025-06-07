import { useState, createElement } from "react";
import "./App.css";

function App() {
  const [key, setKey] = useState(1);
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);

  function undoElement(event) {
    event.preventDefault();
    event.stopPropagation();
    if (elements.length > 0) {
      const lastElement = elements[elements.length - 1];
      setHistory((prevHistory) => [...prevHistory, lastElement]);
      setElements((prevElements) => prevElements.slice(0, -1));
    }
  }

  function redoElement(event) {
    event.preventDefault();
    event.stopPropagation();
    if (history.length > 0) {
      const lastHistoryElement = history[history.length - 1];
      setElements((prevElements) => [...prevElements, lastHistoryElement]);
      setHistory((prevHistory) => prevHistory.slice(0, -1));
    }
  }

  function handleClick(event) {
    event.preventDefault();
    setHistory([]);
    let x = event.pageX;
    let y = event.pageY;
    const element = createElement("div", {
      className: "bubble",
      style: {
        left: x + "px",
        top: y + "px",
        backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
      },
      key: key,
    });
    setKey((prevKey) => prevKey + 1);
    return setElements((prevElements) => [...prevElements, element]);
  }

  return (
    <>
      <div id="app" onClick={handleClick}>
        <div className="options">
          <button className="opt-btn" style={elements.length > 0 ? {opacity: 1} : {opacity: 0.5}} type="button" onClick={undoElement}>
            UNDO
          </button>
          <button className="opt-btn" style={history.length > 0 ? {opacity: 1} : {opacity: 0.5}} type="button" onClick={redoElement}>
            REDO
          </button>
        </div>
        {elements.length > 0 ? elements.map((element) => element) : <div className="placeholder">Click to create bubbles</div>}
      </div>
    </>
  );
}

export default App;
