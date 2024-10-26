# Maze Visualizer

Welcome to the Maze Visualizer! This project allows users to generate mazes using various algorithms and visualize the solving process using algorithms like A*, Breadth-First Search, and more.

## Features

- Generate mazes using different algorithms.
- Visualize maze-solving algorithms.
- Interactive user interface.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Python 3.x
- Node.js
- npm (Node package manager)

### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/maze_visualizer.git
   cd maze_visualizer
2. **Set up a virtual environment:**
   ```bash
   python -m venv venv
3. **Activate the virtual environment:**
  - On Windows:
     ```bash
     venv\Scripts\activate
  - On macOS/Linux:
    ```bash
    source venv/bin/activate
4. **Install the required packages:**
   ```bash
   pip install -r requirements.txt
5. **Run the backend server:**
   ```bash
   uvicorn main:app --reload
   ```
   Make sure to replace main:app with the correct entry point for your FastAPI application.

### Frontend Setup

1. **Navigate to the frontend directory:**
    ```bash
    cd frontend
2. **Navigate to the frontend directory:**
    ```bash  
    npm install
3. **Navigate to the frontend directory:**
    ```bash
    npm run dev

## Usage
Open your browser and go to http://localhost:8000 (or the port you specified) for the backend API.
The frontend will typically be hosted on http://localhost:3000 (or the port defined in your frontend setup).


## Acknowledgments
- FastAPI
- React
- Node.js
- npm
    
   
