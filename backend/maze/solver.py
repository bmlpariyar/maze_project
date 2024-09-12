import time
from collections import deque
import heapq

def solve_maze(maze, algorithm):
    if algorithm == 'depthFirstSearch':
        return depth_first_search(maze)
    elif algorithm == 'breadthFirstSearch':
        return breadth_first_search(maze)
    elif algorithm == 'aStar':
        return a_star(maze)
    else:
        raise ValueError(f"Unknown algorithm: {algorithm}")

def depth_first_search(maze):
    height, width = len(maze), len(maze[0])
    start = (1, 0)
    end = (width - 2, height - 1)
    stack = [(start, [start])]
    visited = set()
    
    while stack:
        (x, y), path = stack.pop()
        
        if (x, y) == end:
            yield {'type': 'solution', 'path': path, 'visited': list(visited)}
            return
        
        if (x, y) not in visited:
            visited.add((x, y))
            yield {'type': 'visit', 'cell': (x, y), 'path': path, 'visited': list(visited)}
            
            for nx, ny in get_neighbors((x, y), width, height):
                if maze[ny][nx] == 0 and (nx, ny) not in visited:
                    stack.append(((nx, ny), path + [(nx, ny)]))
                    yield {'type': 'explore', 'cell': (nx, ny), 'path': path + [(nx, ny)], 'visited': list(visited)}
    
    yield {'type': 'no_solution'}

def breadth_first_search(maze):
    height, width = len(maze), len(maze[0])
    start = (1, 0)
    end = (width - 2, height - 1)
    queue = deque([(start, [start])])
    visited = set()
    
    while queue:
        (x, y), path = queue.popleft()
        
        if (x, y) == end:
            yield {'type': 'solution', 'path': path, 'visited': list(visited)}
            return
        
        if (x, y) not in visited:
            visited.add((x, y))
            yield {'type': 'visit', 'cell': (x, y), 'path': path, 'visited': list(visited)}
            
            for nx, ny in get_neighbors((x, y), width, height):
                if maze[ny][nx] == 0 and (nx, ny) not in visited:
                    queue.append(((nx, ny), path + [(nx, ny)]))
                    yield {'type': 'explore', 'cell': (nx, ny), 'path': path + [(nx, ny)], 'visited': list(visited)}
    
    yield {'type': 'no_solution'}

def manhattan_distance(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1])

def a_star(maze):
    height, width = len(maze), len(maze[0])
    start = (1, 0)
    end = (width - 2, height - 1)
    open_set = [(0, 0, start, [start])]
    closed_set = set()
    
    while open_set:
        f_score, g_score, (x, y), path = heapq.heappop(open_set)
        
        if (x, y) == end:
            yield {'type': 'solution', 'path': path, 'visited': list(closed_set)}
            return
        
        if (x, y) in closed_set:
            continue
        
        closed_set.add((x, y))
        yield {'type': 'visit', 'cell': (x, y), 'path': path, 'visited': list(closed_set)}
        
        for nx, ny in get_neighbors((x, y), width, height):
            if maze[ny][nx] == 0 and (nx, ny) not in closed_set:
                new_g_score = g_score + 1
                new_f_score = new_g_score + manhattan_distance((nx, ny), end)
                heapq.heappush(open_set, (new_f_score, new_g_score, (nx, ny), path + [(nx, ny)]))
                yield {'type': 'explore', 'cell': (nx, ny), 'path': path + [(nx, ny)], 'visited': list(closed_set)}
    
    yield {'type': 'no_solution'}

def get_neighbors(cell, width, height):
    x, y = cell
    neighbors = []
    for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
        nx, ny = x + dx, y + dy
        if 0 <= nx < width and 0 <= ny < height:
            neighbors.append((nx, ny))
    return neighbors