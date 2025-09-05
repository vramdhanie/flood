import logo from "./images/logo.png";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Board from "./components/board/board";
import Cell from "./components/cell/cell";
import useGame from "./hooks/game";

function App() {
  const [gameState, selectColor, restartGame] = useGame(6);

  return (
    <div className="App min-h-screen flex flex-col">
      <Router>
        <div className="flex-1">
          <Routes>
            <Route path="/" element={
              <header className="App-header flex items-center justify-center h-screen">
                <Link to="/play">
                  <img src={logo} className="App-logo w-32 h-32" alt="logo" />
                </Link>
              </header>
            } />
            <Route path="/play" element={
              <Board 
                setCurrentColour={selectColor}
                steps={gameState.steps}
                isGameWon={gameState.isGameWon}
                ownedCellsCount={gameState.ownedCells.length}
                totalCells={gameState.cells.length}
                onRestart={restartGame}
              >
                {gameState.cells.map((cell) => (
                  <Cell key={cell.id} {...cell} />
                ))}
              </Board>
            } />
          </Routes>
        </div>
        
        {/* Sticky Footer */}
        <footer className="bg-gray-50 border-t border-gray-200 py-2">
          <div className="text-center">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} 
              <a 
                href="https://vincentramdhanie.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-1 hover:text-gray-600 transition-colors duration-200"
              >
                Vincent Ramdhanie
              </a>
            </p>
          </div>
        </footer>
      </Router>
    </div>
  );
}

export default App;
