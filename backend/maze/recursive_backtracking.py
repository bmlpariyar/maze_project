import random, time, sys

def recursive_backtracking(width, height, dead_end_count=15):
    width = width if width % 2 == 1 else width + 1
    height = height if height % 2 == 1 else height + 1

    start_time = time.time()
    # Initialize the maze with all walls
    maze = [[1 for _ in range(width)] for _ in range(height)]
    
    # Define directions: right, down, left, up
    directions = [(0, 2), (2, 0), (0, -2), (-2, 0)]
    
    def is_valid(y, x):
        return 1 <= y < height - 1 and 1 <= x < width - 1

    def get_neighbors(y, x):
        neighbors = []
        for dy, dx in directions:
            ny, nx = y + dy, x + dx
            if is_valid(ny, nx) and maze[ny][nx] == 1:
                neighbors.append((ny, nx, y + dy//2, x + dx//2))
        return neighbors

    def carve_path(y, x):
        maze[y][x] = 0
        neighbors = get_neighbors(y, x)
        random.shuffle(neighbors)  # Randomize order of neighbors
        
        for ny, nx, py, px in neighbors:
            if maze[ny][nx] == 1:
                maze[py][px] = 0
                carve_path(ny, nx)
    
    # Start carving from the top-left corner
    start_y, start_x = 1, 1
    carve_path(start_y, start_x)
    
    # Ensure single entrance and exit
    maze[0][1] = 0  # Entrance
    maze[height - 1][width - 2] = 0  # Exit
    
    # Add guaranteed dead ends
    def add_dead_ends(count):
        empty_cells = [(y, x) for y in range(1, height - 1, 2) for x in range(1, width - 1, 2) if maze[y][x] == 0]
        if len(empty_cells) < count:
            count = len(empty_cells)
        chosen_cells = random.sample(empty_cells, count)
        
        for y, x in chosen_cells:
            neighbors = [(y + dy, x + dx) for dy, dx in directions if is_valid(y + dy, x + dx) and maze[y + dy][x + dx] == 0]
            if len(neighbors) == 1:
                ny, nx = neighbors[0]
                maze[ny][nx] = 0
                maze[(y + ny) // 2][(x + nx) // 2] = 0

    add_dead_ends(dead_end_count)

    generation_time = time.time() - start_time
    maze_size = sys.getsizeof(maze)
    
    return maze,generation_time,maze_size