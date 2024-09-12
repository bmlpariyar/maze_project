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
): Promise<{
  maze: Maze;
  time_complexity: string;
  space_complexity: string;
}> => {
  try {
    const response = await axios.post(`${API_URL}/generate_maze`, {
      width,
      height,
      algorithm,
    });
    return {
      maze: response.data.maze,
      time_complexity: response.data.time_complexity,
      space_complexity: response.data.space_complexity,
    };
  } catch (error) {
    console.error("Error generating maze:", error);
    throw error;
  }
};

export const solveMaze = async (
  maze: Maze,
  algorithm: SolvingAlgorithm
): Promise<{
  maze: Solution;
  time_complexity: string;
  space_complexity: string;
}> => {
  try {
    const response = await axios.post(`${API_URL}/solve_maze`, {
      maze,
      algorithm,
    });
    console.log(response);
    return {
      maze: response.data.solution,
      time_complexity: response.data.time_complexity,
      space_complexity: response.data.space_complexity,
    };
  } catch (error) {
    console.error("Error solving maze:", error);
    throw error;
  }
};
