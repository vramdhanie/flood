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
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Game Status */}
      <div className="mb-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Flood Game</h1>
        <div className="flex gap-6 text-lg">
          <div className="font-semibold">
            Steps: <span className="text-blue-600">{steps}</span>
          </div>
          <div className="font-semibold">
            Progress: <span className="text-green-600">{progress}%</span>
          </div>
          <div className="font-semibold">
            Cells: <span className="text-purple-600">{ownedCellsCount}/{totalCells}</span>
          </div>
        </div>
        {isGameWon && (
          <div className="mt-2 text-center">
            <div className="text-2xl font-bold text-green-600 animate-pulse mb-4">
              🎉 Congratulations! You won in {steps} steps! 🎉
            </div>
            <button
              onClick={onRestart}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              🔄 Play Again
            </button>
          </div>
        )}
      </div>

      {/* Game Grid */}
      <div className="w-80 h-80 grid grid-cols-30  bg-gray-300 border-2 border-gray-400 shadow-lg">
        {children}
      </div>

      {/* Color Controls */}
      <Controls n={6} setCurrentColour={setCurrentColour} disabled={isGameWon} />
    </div>
  );
};

export default Board;
