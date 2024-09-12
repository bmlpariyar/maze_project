
import random,sys,time

class DisjointSet:
    def __init__(self, size):
        self.parent = list(range(size))
        self.rank = [0] * size
    
    def find(self, u):
        if self.parent[u] != u:
            self.parent[u] = self.find(self.parent[u])
        return self.parent[u]
    
    def union(self, u, v):
        root_u = self.find(u)
        root_v = self.find(v)
        if root_u != root_v:
            if self.rank[root_u] > self.rank[root_v]:
                self.parent[root_v] = root_u
            elif self.rank[root_u] < self.rank[root_v]:
                self.parent[root_v] = root_u
            else:
                self.parent[root_v] = root_u
                self.rank[root_u] += 1

def kruskals_algorithm(width, height, dead_end_count=15):
    # Ensure odd dimensions for the maze
    width = width if width % 2 == 1 else width + 1
    height = height if height % 2 == 1 else height + 1
    

    start_time = time.time()
    # Initialize the maze with all walls
    maze = [[1 for _ in range(width)] for _ in range(height)]
    
    # Create a list of all walls
    walls = []
    for y in range(1, height - 1, 2):
        for x in range(1, width - 1, 2):
            maze[y][x] = 0  # Mark cells as passages
            if x < width - 2:
                walls.append((y, x, y, x + 2))  # Vertical wall
            if y < height - 2:
                walls.append((y, x, y + 2, x))  # Horizontal wall
    
    # Shuffle the walls
    random.shuffle(walls)
    
    # Create a disjoint set for all cells
    cell_sets = DisjointSet((width * height) // 4)
    
    # Create a path from entrance to exit first
    def create_path():
        path = [(1, 1)]
        while path[-1] != (height - 2, width - 2):
            current_y, current_x = path[-1]
            next_steps = [(current_y + dy, current_x + dx) for dy, dx in [(0, 2), (2, 0), (0, -2), (-2, 0)] if 1 <= current_y + dy < height - 1 and 1 <= current_x + dx < width - 1 and maze[current_y + dy][current_x + dx] == 1]
            if next_steps:
                next_y, next_x = random.choice(next_steps)
                maze[next_y][next_x] = 0
                maze[(current_y + next_y) // 2][(current_x + next_x) // 2] = 0
                path.append((next_y, next_x))
            else:
                break
        return path

    solution_path = create_path()
    
    # Process all walls
    for y1, x1, y2, x2 in walls:
        set1 = (y1 // 2) * (width // 2) + (x1 // 2)
        set2 = (y2 // 2) * (width // 2) + (x2 // 2)
        if cell_sets.find(set1) != cell_sets.find(set2):
            cell_sets.union(set1, set2)
            maze[(y1 + y2) // 2][(x1 + x2) // 2] = 0
            maze[y2][x2] = 0
    
    # Add guaranteed dead ends
    def add_dead_ends(count):
        empty_cells = [(y, x) for y in range(1, height - 1, 2) for x in range(1, width - 1, 2) if maze[y][x] == 0]
        if len(empty_cells) < count:
            count = len(empty_cells)
        chosen_cells = random.sample(empty_cells, count)
        
        for y, x in chosen_cells:
            neighbors = [(y + dy, x + dx) for dy, dx in [(0, 2), (2, 0), (0, -2), (-2, 0)] if 1 <= y + dy < height - 1 and 1 <= x + dx < width - 1 and maze[y + dy][x + dx] == 0]
            if len(neighbors) == 1:
                ny, nx = neighbors[0]
                maze[ny][nx] = 0
                maze[(y + ny) // 2][(x + nx) // 2] = 0

    add_dead_ends(dead_end_count)
    
    # Ensure single entrance and exit
    maze[0][1] = 0  # Entrance
    maze[height - 1][width - 2] = 0  # Exit


    generation_time = time.time() - start_time
    maze_size = sys.getsizeof(maze)
    
    return maze,generation_time,maze_size