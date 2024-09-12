from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from maze.generator import generate_maze
from maze.solver import solve_maze
from pydantic import BaseModel

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
    maze: list
    algorithm: str

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
        solution, time_complexity, space_complexity = solve_maze(request.maze, request.algorithm)
        return {
            "solution": solution,
            "time_complexity": f"{time_complexity:.6f}",
            "space_complexity": f"{space_complexity}"
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)