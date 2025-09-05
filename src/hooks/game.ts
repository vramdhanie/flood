import { useState, useEffect, useCallback } from "react";

export interface Cell {
  id: number;
  bg: string;
  isOwned?: boolean;
}

export interface GameState {
  cells: Cell[];
  ownedCells: number[];
  steps: number;
  isGameWon: boolean;
}

export type Graph = Record<number, number[]>;

const m = 30;

const useGame = (
  n: number
): [GameState, (colour: string) => void, () => void] => {
  const [gameState, setGameState] = useState<GameState>({
    cells: [],
    ownedCells: [],
    steps: 0,
    isGameWon: false,
  });
  const [graph, setGraph] = useState<Graph>({});

  // Initialize the game
  const initializeGame = useCallback(() => {
    const totalCells = m * m;
    const initialCells: Cell[] = Array.from({ length: totalCells }, (_, i) => ({
      id: i,
      bg: `cell.${Math.floor(Math.random() * n)}`,
      isOwned: i === 0, // Only top-left cell is initially owned
    }));

    // Build adjacency graph for flood fill
    const adjacencyGraph: Graph = {};
    for (let k = 0; k < totalCells; k++) {
      const neighbors: number[] = [];
      // Left neighbor
      if (k % m > 0) neighbors.push(k - 1);
      // Right neighbor
      if (k % m < m - 1) neighbors.push(k + 1);
      // Top neighbor
      if (k >= m) neighbors.push(k - m);
      // Bottom neighbor
      if (k < totalCells - m) neighbors.push(k + m);

      adjacencyGraph[k] = neighbors;
    }

    setGraph(adjacencyGraph);
    setGameState({
      cells: initialCells,
      ownedCells: [0], // Start with top-left cell
      steps: 0,
      isGameWon: false,
    });
  }, [n]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Flood fill algorithm
  const floodFill = useCallback(
    (newColor: string) => {
      if (gameState.cells.length === 0 || gameState.isGameWon) return;

      // Don't allow selecting the same color as currently owned
      const currentColor = gameState.cells[gameState.ownedCells[0]]?.bg;
      if (newColor === currentColor) return;

      setGameState((prevState) => {
        const newCells = [...prevState.cells];
        const visited = new Set<number>();
        const queue: number[] = [...prevState.ownedCells];
        const newOwnedCells: number[] = [];

        // Change color of all currently owned cells
        prevState.ownedCells.forEach((cellId) => {
          newCells[cellId].bg = newColor;
          newCells[cellId].isOwned = true;
          visited.add(cellId);
          newOwnedCells.push(cellId);
        });

        // BFS to find all connected cells of the same color
        while (queue.length > 0) {
          const currentCell = queue.shift()!;

          graph[currentCell]?.forEach((neighborId) => {
            if (
              !visited.has(neighborId) &&
              newCells[neighborId].bg === newColor
            ) {
              visited.add(neighborId);
              newCells[neighborId].isOwned = true;
              newOwnedCells.push(neighborId);
              queue.push(neighborId);
            }
          });
        }

        // Check win condition
        const isGameWon = newOwnedCells.length === m * m;

        return {
          cells: newCells,
          ownedCells: newOwnedCells,
          steps: prevState.steps + 1,
          isGameWon,
        };
      });
    },
    [gameState.cells, gameState.ownedCells, gameState.isGameWon, graph]
  );

  return [gameState, floodFill, initializeGame];
};

export default useGame;
