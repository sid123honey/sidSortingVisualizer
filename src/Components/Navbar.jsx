import React, { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = ({
  handleLength,
  handleSpeed,
  handleAlgo,
  generateRandomArray,
  handleSort,
  sorting,
  completed,
  len,
  speed,
  algo,
}) => {
  const [maxLen, setMaxLen] = useState(50);
  const [minLen, setMinLen] = useState(10); 

  useEffect(() => {
    if (window.innerWidth <= 500) {
      setMaxLen(18);
      setMinLen(5); 
    }
  }, []);



  return (
    <nav>
      <div className="glitch-wrapper">
        <div className="glitch" data-text="Sorting Visualizer">
          Sorting Visualizer
        </div>
      </div>

      <div className="toolbox">
        <div>
          <div className="group length">
            <label>
              Length <span>{len}</span>
            </label>

            <input
              type="range"
              onChange={handleLength}
              min={minLen}
              max={maxLen}
              step="1"
              disabled={sorting}
              value={len}
              className="slider"
            ></input>
          </div>

          <div className="group speed">
            <label>
              Speed <span>{Math.ceil(400 / speed)}x</span>
            </label>
            <input
              type="range"
              onChange={handleSpeed}
              min="1"
              max="10"
              value={Math.ceil(400 / speed)}
              disabled={sorting}
              className="slider"
            ></input>
          </div>

          <select onChange={handleAlgo} disabled={sorting} value={algo}>
            <option value="mergeSort">Merge Sort</option>
            <option value="quickSort">Quick Sort</option>
            <option value="bubbleSort">Bubble Sort</option>
            <option value="selectionSort">Selection Sort</option>
            <option value="insertionSort">Insertion Sort</option>
          </select>
        </div>

        <div>
          <button onClick={generateRandomArray} disabled={sorting}>
            Randomize
          </button>
          <button onClick={handleSort} disabled={sorting || completed}>
            Sort
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
