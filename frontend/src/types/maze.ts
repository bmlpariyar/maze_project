export type MazeCell = 0 | 1; // 0 for path, 1 for wall
export type Maze = MazeCell[][];
export type Position = [number, number];
export type Solution = Position[];

export type GenerationAlgorithm = "recursiveBacktracking" | "kruskal" | "prim";
export type SolvingAlgorithm =
  | "depthFirstSearch"
  | "breadthFirstSearch"
  | "aStar";

export interface ComplexityData {
  timeComplexity: string;
  spaceComplexity: string;
  bigONotation: string;
}
