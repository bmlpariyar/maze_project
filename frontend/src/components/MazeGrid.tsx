import React from "react";
import { Maze, Solution } from "../types/maze";

interface MazeGridProps {
  maze: Maze;
  solution: Solution;
  currentStep: any;
  isSolutionReached: boolean;
}

const MazeGrid: React.FC<MazeGridProps> = ({
  maze,
  solution,
  currentStep,
  isSolutionReached,
}) => {
  const cellSize = 20; // pixels

  const getCellColor = (x: number, y: number, cell: number) => {
    if (cell === 1) return "#373837"; // Wall
    if (
      isSolutionReached &&
      solution.some(([sx, sy]) => sx === x && sy === y)
    ) {
      return "#61ba56"; // Final solution path
    }
    if (currentStep) {
      if (currentStep.path.some(([px, py]: number[]) => px === x && py === y)) {
        return "#ffff00"; // Current path
      }
      if (
        currentStep.visited.some(([vx, vy]: number[]) => vx === x && vy === y)
      ) {
        return "#ADD8E6"; // Visited cell
      }
      if (
        currentStep.type === "explore" &&
        currentStep.cell[0] === x &&
        currentStep.cell[1] === y
      ) {
        return "#FFA500"; // Exploring cell
      }
    }
    return "white"; // Open path
  };

  return (
    <div className="flex items-center justify-center mt-5 px-10 py-10">
      <div className="maze-grid" style={{ display: "inline-block" }}>
        {maze.map((row, y) => (
          <div key={y} style={{ display: "flex" }}>
            {row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                style={{
                  width: cellSize,
                  height: cellSize,
                  backgroundColor: getCellColor(x, y, cell),
                  border: "0.1px solid #e0e0e0",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MazeGrid;
