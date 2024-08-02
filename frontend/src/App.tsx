import React from "react";
import MazeVisualizer from "./components/MazeVisualizer";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App p-20">
      <header className="App-header font-bold text-3xl flex items-center justify-center">
        <h1>Maze Visualizer</h1>
      </header>
      <main>
        <MazeVisualizer />
      </main>
    </div>
  );
};

export default App;
