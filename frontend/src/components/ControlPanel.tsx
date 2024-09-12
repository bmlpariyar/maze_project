import React, { useState } from "react";
import { GenerationAlgorithm, SolvingAlgorithm } from "../types/maze";
import AlgoVisualizer from "./AlgoVisualizer";

interface ControlPanelProps {
  onGenerateMaze: (
    width: number,
    height: number,
    algorithm: GenerationAlgorithm
  ) => void;
  onSolveMaze: (algorithm: SolvingAlgorithm) => void;
  isGenerating: boolean;
  isSolving: boolean;
  timeComplexity: string;
  spaceComplexity: string;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onGenerateMaze,
  onSolveMaze,
  isGenerating,
  isSolving,
  timeComplexity,
  spaceComplexity,
}) => {
  const [width, setWidth] = useState(50);
  const [height, setHeight] = useState(30);
  const [genAlgorithm, setGenAlgorithm] = useState<GenerationAlgorithm>(
    "recursiveBacktracking"
  );
  const [solveAlgorithm, setSolveAlgorithm] =
    useState<SolvingAlgorithm>("depthFirstSearch");

  const handleGenerate = () => {
    onGenerateMaze(width, height, genAlgorithm);
  };

  const handleSolve = () => {
    onSolveMaze(solveAlgorithm);
  };

  return (
    <div className="control-panel flex flex-col mt-10 items-center justify-center">
      <div>
        <label>Width: </label>
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(parseInt(e.target.value))}
          min="5"
          max="50"
        />
      </div>
      <div>
        <label>Height: </label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(parseInt(e.target.value))}
          min="5"
          max="50"
        />
      </div>
      <div>
        <label>Generation Algorithm: </label>
        <select
          value={genAlgorithm}
          onChange={(e) =>
            setGenAlgorithm(e.target.value as GenerationAlgorithm)
          }
        >
          <option value="recursiveBacktracking">Recursive Backtracking</option>
          <option value="kruskal">Kruskal's Algorithm</option>
          <option value="prim">Prim's Algorithm</option>
        </select>
      </div>
      <button onClick={handleGenerate} disabled={isGenerating}>
        {isGenerating ? "Generating..." : "Generate Maze"}
      </button>
      <div>
        <label>Solving Algorithm: </label>
        <select
          value={solveAlgorithm}
          onChange={(e) =>
            setSolveAlgorithm(e.target.value as SolvingAlgorithm)
          }
        >
          <option value="depthFirstSearch">Depth-First Search</option>
          <option value="breadthFirstSearch">Breadth-First Search</option>
          <option value="aStar">A* Algorithm</option>
        </select>
      </div>
      <button onClick={handleSolve} disabled={isSolving}>
        {isSolving ? "Solving..." : "Solve Maze"}
      </button>
      <AlgoVisualizer time={timeComplexity} space={spaceComplexity} />
    </div>
  );
};

export default ControlPanel;
