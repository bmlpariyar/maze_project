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
  onToggleAnimation: () => void;
  isAnimating: boolean;
  isSolutionReached: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onGenerateMaze,
  onSolveMaze,
  isGenerating,
  isSolving,
  timeComplexity,
  spaceComplexity,
  onToggleAnimation,
  isAnimating,
}) => {
  const [width, setWidth] = useState(50);
  const [height, setHeight] = useState(30);
  const [genAlgorithm, setGenAlgorithm] = useState<GenerationAlgorithm>(
    "recursiveBacktracking"
  );
  const [solveAlgorithm, setSolveAlgorithm] =
    useState<SolvingAlgorithm>("depthFirstSearch");

  const handleGenerate = () => onGenerateMaze(width, height, genAlgorithm);
  const handleSolve = () => onSolveMaze(solveAlgorithm);

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setWidth(value > 80 ? 80 : value);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setHeight(value > 80 ? 80 : value);
  };

  return (
    <div className="control-panel flex flex-col items-center justify-center px-20">
      <div className="flex w-full justify-between mb-6">
        <div className="w-5/12 p-10">
          <h3 className="text-lg font-semibold mb-4">Maze Generation</h3>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Width:{" "}
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="number"
              value={width}
              onChange={handleWidthChange}
              min="5"
              max="80"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Height:{" "}
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="number"
              value={height}
              onChange={handleHeightChange}
              min="5"
              max="80"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Generation Algorithm:{" "}
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={genAlgorithm}
              onChange={(e) =>
                setGenAlgorithm(e.target.value as GenerationAlgorithm)
              }
            >
              <option value="recursiveBacktracking">
                Recursive Backtracking
              </option>
              <option value="kruskal">Kruskal's Algorithm</option>
              <option value="prim">Prim's Algorithm</option>
            </select>
          </div>
          <button
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate Maze"}
          </button>
        </div>
        <div className="w-5/12 p-10">
          <h3 className="text-lg font-semibold mb-4">Solving</h3>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Solving Algorithm:{" "}
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
          <button
            className="w-full text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mt-4"
            onClick={handleSolve}
            disabled={isSolving}
          >
            {isSolving ? "Solving..." : "Solve Maze"}
          </button>
          <AlgoVisualizer time={timeComplexity} space={spaceComplexity} />
          <button
            className=" mt-5 w-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-6"
            onClick={onToggleAnimation}
            disabled={isSolving || isGenerating}
          >
            {isAnimating ? "Pause Animation" : "Start Animation"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
