import random

from maze.kruskals_algorithm import kruskals_algorithm
from maze.prims_algorithm import prims_algorithm
from maze.recursive_backtracking import recursive_backtracking
import sys

sys.setrecursionlimit(10000)

def generate_maze(width, height, algorithm):
    if algorithm == 'recursiveBacktracking':
        return recursive_backtracking(width, height)
    elif algorithm == 'kruskal':
        return kruskals_algorithm(width, height)
    elif algorithm == 'prim':
        return prims_algorithm(width, height)
    else:
        raise ValueError(f"Unknown algorithm: {algorithm}")



def get_neighbors(cell, width, height):
    x, y = cell
    neighbors = []
    for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
        nx, ny = x + dx, y + dy
        if 0 <= nx < width and 0 <= ny < height:
            neighbors.append((nx, ny))
    return neighbors