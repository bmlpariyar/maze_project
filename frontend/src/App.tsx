import React from "react";
import MazeVisualizer from "./components/MazeVisualizer";
import "./App.css";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <main>
        <MazeVisualizer />
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
};

export default App;
