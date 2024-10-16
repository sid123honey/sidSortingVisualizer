import React from 'react'
import './Info.css'

const Legends = ({algo}) => {
    return (
      <div className="legends">
        <div className="key">
          <span className="sq compare"></span> Comparing
        </div>
        <div className="key">
          <span className="sq swap"></span>{" "}
          {algo !== "mergeSort" ? "Swapping" : "Using Auxilary Space"}
        </div>
        <div className="key">
          <span className="sq sorted"></span> Sorted
        </div>
      </div>
    );
}

export default Legends
