import React from "react";
import { Maze, Solution } from "../types/maze";

interface MazeGridProps {
  maze: Maze;
  solution: Solution;
}

const MazeGrid: React.FC<MazeGridProps> = ({ maze, solution }) => {
  const cellSize = 20; // pixels

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="maze-grid" style={{ display: "inline-block" }}>
        {maze.map((row, y) => (
          <div key={y} style={{ display: "flex" }}>
            {row.map((cell, x) => {
              const isPath = solution.some(([sx, sy]) => sx === x && sy === y);
              return (
                <div
                  key={`${x}-${y}`}
                  style={{
                    width: cellSize,
                    height: cellSize,
                    backgroundColor:
                      cell === 1 ? "black" : isPath ? "#33db1d" : "white",
                    border: "0.1px solid #ccc",
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MazeGrid;
