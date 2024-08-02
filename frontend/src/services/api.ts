import axios from "axios";
import {
  Maze,
  Solution,
  GenerationAlgorithm,
  SolvingAlgorithm,
} from "../types/maze";

const API_URL = "http://localhost:8000";

export const generateMaze = async (
  width: number,
  height: number,
  algorithm: GenerationAlgorithm
): Promise<Maze> => {
  try {
    const response = await axios.post(`${API_URL}/generate_maze`, {
      width,
      height,
      algorithm,
    });
    return response.data.maze;
  } catch (error) {
    console.error("Error generating maze:", error);
    throw error;
  }
};

export const solveMaze = async (
  maze: Maze,
  algorithm: SolvingAlgorithm
): Promise<Solution> => {
  try {
    const response = await axios.post(`${API_URL}/solve_maze`, {
      maze,
      algorithm,
    });
    return response.data.solution;
  } catch (error) {
    console.error("Error solving maze:", error);
    throw error;
  }
};
