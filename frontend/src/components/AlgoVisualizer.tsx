import React from "react";
import { spaceComplexity, timeComplexity } from "../types/maze";

interface VisualizerProps {
  time: timeComplexity;
  space: spaceComplexity;
}

const AlgoVisualizer: React.FC<VisualizerProps> = ({ time, space }) => {
  return (
    <div className="algo-visualizer mt-5">
      <p className="block mb-2 text-sm font-medium text-gray-900">
        Time Complexity: {time} ms
      </p>
      <p className="block mb-2 text-sm font-medium text-gray-900">
        Space Complexity: {space} bytes
      </p>
    </div>
  );
};

export default AlgoVisualizer;
