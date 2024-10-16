import './App.css';
import Navbar from './Components/Navbar';
import { useState, useEffect } from 'react';
import Bars from "./Components/Bars"
import Info from "./Components/Info";


// Algorithms
import bubbleSort from './algorithms/bubbleSort'
import insertionSort from './algorithms/insertionSort'
import selectionSort from './algorithms/selectionSort'
import mergeSort from './algorithms/mergeSort'
import quickSort from './algorithms/quickSort'

function App() {
  //setting max len of array len
  let maxLen = 30;
  let initialSpeed = 80; 
  //setting max length for mobile size slider
  if (window.innerWidth <= 500) {
    maxLen = 12; 
    initialSpeed = 250;
  }

  // States
  const [algo, setAlgo] = useState("mergeSort");
  const [len, setLength] = useState(maxLen);
  const [blocks, setBlocks] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [completed, setCompleted] = useState(true);
  const [speed, setSpeed] = useState(initialSpeed);
  const [compare, setCompare] = useState([]);
  const [swap, setSwap] = useState([]);
  const [sortedIndex, setSortedIndex] = useState([]);

  // Generating shuffled array of 1 to len
  const generateRandomArray = (len) => {
    setCompleted(false);
    setSorting(false);
    setSortedIndex([]);

    const randomArray = Array.from(Array(len + 1).keys()).slice(1);

    for (let i = randomArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i - 1));
      const temp = randomArray[i];

      randomArray[i] = randomArray[randomIndex];
      randomArray[randomIndex] = temp;
    }

    setBlocks(randomArray);
  };

  // Generating random array every time the length is changed by the user
  useEffect(() => {
    generateRandomArray(len);
  }, [len, algo]);

  // setting the selected algorithm
  const handleAlgo = (event) => {
    setAlgo(event.target.value);
  };

  // handling the length of the array
  const handleLength = (event) => {
    setLength(Number(event.target.value));
  };

  // handling the speed of sorting
  const handleSpeed = (event) => {
    setSpeed(Math.ceil(400 / Number(event.target.value)));
  };

  // Sorting according to the algorithm
  const handleSort = () => {
    const sortAccOrder = (order) => {
      (function loop(i) {
        setTimeout(function () {
          const [j, k, arr, index] = order[i];
          setCompare([j, k]);
          setSwap([]);

          if (index !== null) {
            setSortedIndex((prevState) => [...prevState, index]);
          }

          if (arr) {
            setBlocks(arr);
            if (j !== null || k != null) setSwap([j, k]);
          }

          if (++i < order.length) {
            loop(i);
          } else {
            setSorting(false);
            setCompleted(true);
          }
        }, speed);
      })(0);
    };

    setSorting(true);

    algo === "bubbleSort"
      ? sortAccOrder(bubbleSort(blocks))
      : algo === "insertionSort"
      ? sortAccOrder(insertionSort(blocks))
      : algo === "selectionSort"
      ? sortAccOrder(selectionSort(blocks))
      : algo === "mergeSort"
      ? sortAccOrder(mergeSort(blocks))
      : algo === "quickSort"
      ? sortAccOrder(quickSort(blocks))
      : (() => {
          setSorting(false);
          setCompleted(true);
        })();
  };

  return (
    <div className="App wrapper">
      <Navbar
        generateRandomArray={() => generateRandomArray(len)}
        handleLength={handleLength}
        handleSpeed={handleSpeed}
        handleAlgo={handleAlgo}
        handleSort={handleSort}
        sorting={sorting}
        completed={completed}
        len={len}
        speed={speed}
        algo={algo}
      />

      <Bars
        blocks={blocks}
        compare={sorting && compare}
        swap={sorting && swap}
        sorted={sortedIndex}
      />

      <Info algo={algo} />

      <div className="topCircle"></div>
      <div className="bottomCircle"></div>
    </div>
  );
}

export default App;
