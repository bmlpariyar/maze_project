import React, { useState, useCallback, useRef, useEffect } from "react";
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
  const [timeComplexity, setTimeComplexity] = useState<string>("");
  const [spaceComplexity, setSpaceComplexity] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [solvingSteps, setSolvingSteps] = useState<any[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSolutionReached, setIsSolutionReached] = useState(false);
  const animationRef = useRef<number>();

  const handleGenerateMaze = async (
    width: number,
    height: number,
    algorithm: GenerationAlgorithm
  ) => {
    setIsGenerating(true);
    try {
      const newMaze = await generateMaze(width, height, algorithm);
      setMaze(newMaze.maze);
      setSolution([]);
      setTimeComplexity(newMaze.time_complexity);
      setSpaceComplexity(newMaze.space_complexity);
      setSolvingSteps([]);
      setCurrentStep(0);
      setIsSolutionReached(false);
    } catch (error) {
      console.error("Error generating maze:", error);
    }
    setIsGenerating(false);
  };

  const handleSolveMaze = async (algorithm: SolvingAlgorithm) => {
    setIsSolving(true);
    try {
      const result = await solveMaze(maze, algorithm);
      setSolvingSteps(result.steps);
      setSolution(result.solution);
      setTimeComplexity(result.time_complexity);
      setSpaceComplexity(result.space_complexity);
      setCurrentStep(0);
      setIsSolutionReached(false);
    } catch (error) {
      console.error("Error solving maze:", error);
    }
    setIsSolving(false);
  };

  const animate = useCallback(() => {
    if (currentStep < solvingSteps.length - 1 && !isSolutionReached) {
      setCurrentStep((prev) => prev + 1);
      if (solvingSteps[currentStep + 1].type === "solution") {
        setIsSolutionReached(true);
        setIsAnimating(false);
      } else {
        animationRef.current = requestAnimationFrame(animate);
      }
    } else {
      setIsAnimating(false);
    }
  }, [currentStep, solvingSteps, isSolutionReached]);

  useEffect(() => {
    if (isAnimating) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animationRef.current!);
    }
    return () => cancelAnimationFrame(animationRef.current!);
  }, [isAnimating, animate]);

  const toggleAnimation = () => {
    setIsAnimating((prev) => !prev);
  };

  return (
    <div className="maze-visualizer">
      <ControlPanel
        onGenerateMaze={handleGenerateMaze}
        onSolveMaze={handleSolveMaze}
        isGenerating={isGenerating}
        isSolving={isSolving}
        spaceComplexity={spaceComplexity}
        timeComplexity={timeComplexity}
        onToggleAnimation={toggleAnimation}
        isAnimating={isAnimating}
        isSolutionReached={isSolutionReached}
      />
      <div className="flex flex-col items-center justify-center">
        <p className="block mb-2 text-xl font-extrabold text-gray-900">
          Steps: {currentStep + 1} / {solvingSteps.length}
        </p>
      </div>
      <MazeGrid
        maze={maze}
        solution={solution}
        currentStep={solvingSteps[currentStep]}
        isSolutionReached={isSolutionReached}
      />
    </div>
  );
};

export default MazeVisualizer;
