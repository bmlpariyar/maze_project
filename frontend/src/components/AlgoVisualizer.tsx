import React from "react";
import { spaceComplexity, timeComplexity } from "../types/maze";

interface VisualizerProps {
  time: timeComplexity;
  space: spaceComplexity;
}

const AlgoVisualizer: React.FC<VisualizerProps> = ({ time, space }) => {
  return (
    <div className="algo-visualizer">
      <p className="">Time Complexity: {time} ms</p>
      <p className="">Space Complexity: {space} bytes</p>
    </div>
  );
};

export default AlgoVisualizer;
