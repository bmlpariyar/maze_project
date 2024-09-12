import random, sys, time

def prims_algorithm(width, height, dead_end_count=15):
    width = width if width % 2 == 1 else width + 1
    height = height if height % 2 == 1 else height + 1
    
    start_time = time.time()
    # Initialize the maze with all walls
    maze = [[1 for _ in range(width)] for _ in range(height)]
    
    # Define directions: right, down, left, up
    directions = [(0, 2), (2, 0), (0, -2), (-2, 0)]
    
    # Start with the cell at (1, 1)
    start_y, start_x = 1, 1
    maze[start_y][start_x] = 0
    
    # Create a path from entrance to exit first
    def create_path():
        path = [(1, 1)]
        while path[-1] != (height - 2, width - 2):
            current_y, current_x = path[-1]
            next_steps = [(current_y + dy, current_x + dx) for dy, dx in directions if 1 <= current_y + dy < height - 1 and 1 <= current_x + dx < width - 1 and maze[current_y + dy][current_x + dx] == 1]
            if next_steps:
                next_y, next_x = random.choice(next_steps)
                maze[next_y][next_x] = 0
                maze[(current_y + next_y) // 2][(current_x + next_x) // 2] = 0
                path.append((next_y, next_x))
            else:
                break
        return path

    solution_path = create_path()
    
    # Add walls of the solution path cells to the wall list
    walls = []
    for y, x in solution_path:
        for dy, dx in directions:
            ny, nx = y + dy, x + dx
            if 1 <= ny < height - 1 and 1 <= nx < width - 1 and maze[ny][nx] == 1:
                walls.append((ny, nx, y + dy//2, x + dx//2))
    
    # Main loop
    while walls:
        # Pick a random wall
        wall_y, wall_x, path_y, path_x = walls.pop(random.randint(0, len(walls) - 1))
        
        # If the cell on the opposite side isn't in the maze yet
        if maze[wall_y][wall_x] == 1:
            # Make it a passage
            maze[wall_y][wall_x] = 0
            maze[path_y][path_x] = 0
            
            # Add neighboring walls
            for dy, dx in directions:
                ny, nx = wall_y + dy, wall_x + dx
                if 1 <= ny < height - 1 and 1 <= nx < width - 1 and maze[ny][nx] == 1:
                    walls.append((ny, nx, wall_y + dy//2, wall_x + dx//2))
    
    # Add guaranteed dead ends
    def add_dead_ends(count):
        empty_cells = [(y, x) for y in range(1, height - 1, 2) for x in range(1, width - 1, 2) if maze[y][x] == 0]
        if len(empty_cells) < count:
            count = len(empty_cells)
        chosen_cells = random.sample(empty_cells, count)
        
        for y, x in chosen_cells:
            neighbors = [(y + dy, x + dx) for dy, dx in directions if 1 <= y + dy < height - 1 and 1 <= x + dx < width - 1 and maze[y + dy][x + dx] == 0]
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