import React from 'react';
import './App.css';
import {Slider} from "./components/Slider/Slider";
import {data} from "./components/Slider/data";

function App() {
  return (
    <div className="App">
      <Slider reviews={data}/>
    </div>
  );
}

export default App;
