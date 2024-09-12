from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from maze.generator import generate_maze
from pydantic import BaseModel
from typing import List, Tuple
import time
import sys

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MazeRequest(BaseModel):
    width: int
    height: int
    algorithm: str

class SolveRequest(BaseModel):
    maze: List[List[int]]
    algorithm: str

def solve_maze(maze, algorithm):
    # Import the appropriate solving function based on the algorithm
    if algorithm == 'depthFirstSearch':
        from maze.solver import depth_first_search as solve_func
    elif algorithm == 'breadthFirstSearch':
        from maze.solver import breadth_first_search as solve_func
    elif algorithm == 'aStar':
        from maze.solver import a_star as solve_func
    else:
        raise ValueError(f"Unknown algorithm: {algorithm}")
    
    # Run the solver and collect all steps
    steps = list(solve_func(maze))
    
    # Extract the final solution (if any) from the last step
    solution = next((step['path'] for step in reversed(steps) if step['type'] == 'solution'), None)
    
    return steps, solution

@app.post("/generate_maze")
async def api_generate_maze(request: MazeRequest):
    try:
        maze, time_taken, space_used = generate_maze(request.width, request.height, request.algorithm)
        return {
            "maze": maze,
            "time_complexity": f"{time_taken:.6f}",
            "space_complexity": f"{space_used}"
            }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/solve_maze")
async def api_solve_maze(request: SolveRequest):
    try:
        start_time = time.time()
        steps, solution = solve_maze(request.maze, request.algorithm)
        time_taken = time.time() - start_time
        space_used = sys.getsizeof(steps) + sys.getsizeof(solution)
        
        return {
            "steps": steps,
            "solution": solution,
            "time_complexity": f"{time_taken:.6f}",
            "space_complexity": f"{space_used}"
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)