import logo from "./images/logo.png";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Board from "./components/board/board";
import Cell from "./components/cell/cell";
import useGame from "./hooks/game";

function App() {
  const [gameState, selectColor, restartGame] = useGame(6);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
      <Router basename={process.env.PUBLIC_URL || ''}>
        <main className="flex-1 flex flex-col items-center justify-center relative px-4 py-8 max-w-lg mx-auto w-full">
          <Routes>
            <Route path="/" element={
              <div className="flex flex-col items-center justify-center space-y-12 animate-in fade-in zoom-in duration-700">
                <div className="text-center space-y-4">
                  <h1 className="text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-500">
                    Flood
                  </h1>
                  <p className="text-slate-400 text-lg font-medium tracking-wide">
                    Color the board. Start from top-left.
                  </p>
                </div>
                <Link 
                  to="/play"
                  className="group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-2xl group bg-gradient-to-br from-emerald-400 to-sky-500 shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_0_60px_-15px_rgba(56,189,248,0.7)] transition-all duration-300 hover:scale-105"
                >
                  <span className="relative px-10 py-4 transition-all ease-in duration-75 bg-slate-950 rounded-[14px] group-hover:bg-opacity-0">
                    <span className="relative text-xl font-bold text-white group-hover:text-white transition-colors duration-300">
                      Play Game
                    </span>
                  </span>
                </Link>
              </div>
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
        </main>
        
        {/* Sticky Footer */}
        <footer className="w-full border-t border-slate-800/50 bg-slate-950/50 backdrop-blur-md py-4 mt-auto z-10">
          <div className="text-center">
            <p className="text-sm font-medium text-slate-500">
              © {new Date().getFullYear()} 
              <a 
                href="https://vincentramdhanie.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-1.5 text-slate-400 hover:text-emerald-400 transition-colors duration-300 drop-shadow-sm"
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
