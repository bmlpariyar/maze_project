import React, { useState } from "react";
import MazeGrid from "./MazeGrid";
import ControlPanel from "./ControlPanel";
import { generateMaze, solveMaze } from "../services/api";
import {
  Maze,
  Solution,
  GenerationAlgorithm,
  SolvingAlgorithm,
} from "../types/maze";

const MazeVisualizer: React.FC = () => {
  const [maze, setMaze] = useState<Maze>([]);
  const [solution, setSolution] = useState<Solution>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSolving, setIsSolving] = useState(false);

  const handleGenerateMaze = async (
    width: number,
    height: number,
    algorithm: GenerationAlgorithm
  ) => {
    setIsGenerating(true);
    try {
      const newMaze = await generateMaze(width, height, algorithm);
      setMaze(newMaze);
      setSolution([]);
    } catch (error) {
      console.error("Error generating maze:", error);
    }
    setIsGenerating(false);
  };

  const handleSolveMaze = async (algorithm: SolvingAlgorithm) => {
    setIsSolving(true);
    try {
      const newSolution = await solveMaze(maze, algorithm);
      setSolution(newSolution);
    } catch (error) {
      console.error("Error solving maze:", error);
    }
    setIsSolving(false);
  };

  return (
    <div className="maze-visualizer">
      <ControlPanel
        onGenerateMaze={handleGenerateMaze}
        onSolveMaze={handleSolveMaze}
        isGenerating={isGenerating}
        isSolving={isSolving}
      />
      <MazeGrid maze={maze} solution={solution} />
    </div>
  );
};

export default MazeVisualizer;