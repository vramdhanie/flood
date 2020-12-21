import { useState, useEffect } from "react";

const m = 30;

const useGame = (n) => {
  const [cells, setCells] = useState([]);
  const [currentColour, setCurrentColour] = useState(null);
  const [yourCells, setYourCells] = useState([]);
  const [graph, setGraph] = useState({});

  useEffect(() => {
    const c = new Array(m * m);
    const d = c.fill(0).map((_, i) => ({
      id: i,
      bg: `cell.${Math.floor(Math.random() * n)}`,
    }));

    const graph = {};

    // construct a graph
    c.forEach((_, k) => {
      const adj = [];
      if (k % m > 0) {
        adj.push(k - 1);
      }
      if (k % m < m - 1) {
        adj.push(k + 1);
      }
      if (k >= m) {
        adj.push(k - m);
      }
      if (k < m * (m - 1)) {
        adj.push(k + m);
      }
      graph[k] = adj;
    });

    setCells(d);
    setCurrentColour(d[0].bg);
    setYourCells([0]);
    setGraph(graph);
    // use an incidence matrix
  }, []);

  useEffect(() => {
    // setYourCells(yourCells.map((cell) => ({ ...cell, bg: currentColour })));
    // setCells(cells.map((cell) => ({ ...cell, bg: currentColour })));
    if (cells.length) {
      const cellGraph = [...cells];
      cellGraph.forEach((cell) => (cell.p = 0));
      const Q = [];
      const ownCells = [];
      yourCells.forEach((k) => {
        cellGraph[k].bg = currentColour;
        cellGraph[k].p = 1;
        Q.push(k);
        ownCells.push(k);
      });

      while (Q.length > 0) {
        let i = Q.shift();
        graph[i].forEach((j) => {
          if (!cellGraph[j].p) {
            if (cellGraph[j].bg === currentColour) {
              cellGraph[j].p = 1;
              ownCells.push(j);
              Q.push(j);
            }
          }
        });
      }

      setCells(cellGraph);
      setYourCells(ownCells);
    }
  }, [currentColour]);

  return [cells, currentColour, setCurrentColour, yourCells];
};

export default useGame;
