import React from "react";
import Controls from "../controls/controls";

interface BoardProps {
  setCurrentColour: (colour: string) => void;
  children: React.ReactNode;
  steps: number;
  isGameWon: boolean;
  ownedCellsCount: number;
  totalCells: number;
  onRestart: () => void;
}

const Board: React.FC<BoardProps> = ({ 
  setCurrentColour, 
  children, 
  steps, 
  isGameWon, 
  ownedCellsCount, 
  totalCells,
  onRestart
}) => {
  const progress = totalCells > 0 ? (ownedCellsCount / totalCells * 100).toFixed(1) : 0;

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-6">
      {/* Game Status */}
      <div className="w-full p-6 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-xl shadow-black/20">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <span className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Steps</span>
            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
              {steps}
            </span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Captured</span>
            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
              {progress}%
            </span>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-sky-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {isGameWon && (
          <div className="mt-6 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <span className="animate-bounce-light">🎉</span> 
              Epic Win! 
              <span className="animate-bounce-light" style={{ animationDelay: '0.1s' }}>🎉</span>
            </div>
            <button
              onClick={onRestart}
              className="px-8 py-3 w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-600 shadow-[0_4px_14px_0_rgba(0,0,0,0.39)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.23)] transition-all duration-300 transform hover:scale-[1.02]"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      {/* Game Grid Box */}
      <div className="w-full max-w-sm p-1.5 sm:p-2 bg-slate-900/80 backdrop-blur-lg rounded-2xl border border-slate-700 shadow-2xl relative">
        <div 
          className="w-full aspect-square mx-auto grid gap-0 overflow-hidden rounded-xl border border-slate-800"
          style={{ gridTemplateColumns: 'repeat(30, minmax(0, 1fr))', gridTemplateRows: 'repeat(30, minmax(0, 1fr))' }}
        >
          {children}
        </div>
      </div>

      {/* Color Controls Box */}
      <div className="w-full p-4 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-xl">
        <Controls n={6} setCurrentColour={setCurrentColour} disabled={isGameWon} />
      </div>
    </div>
  );
};

export default Board;
