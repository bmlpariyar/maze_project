import React from "react";
import MazeVisualizer from "./components/MazeVisualizer";
import "./App.css";
import Navbar from "./components/NavBar";

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <main>
        <MazeVisualizer />
      </main>
    </div>
  );
};

export default App;
