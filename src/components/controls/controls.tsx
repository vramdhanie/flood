import React from "react";
import useColours from "../../hooks/colours";

interface ControlsProps {
  n: number;
  setCurrentColour: (colour: string) => void;
  disabled?: boolean;
}

const controlStyleMap: Record<string, string> = {
  'cell.0': 'bg-cell-0 shadow-red-500/40 hover:shadow-red-500/80',
  'cell.1': 'bg-cell-1 shadow-blue-500/40 hover:shadow-blue-500/80',
  'cell.2': 'bg-cell-2 shadow-lime-500/40 hover:shadow-lime-500/80',
  'cell.3': 'bg-cell-3 shadow-yellow-400/40 hover:shadow-yellow-400/80',
  'cell.4': 'bg-cell-4 shadow-purple-500/40 hover:shadow-purple-500/80',
  'cell.5': 'bg-cell-5 shadow-cyan-500/40 hover:shadow-cyan-500/80',
  'cell.6': 'bg-cell-6 shadow-teal-500/40 hover:shadow-teal-500/80',
  'cell.7': 'bg-cell-7 shadow-orange-500/40 hover:shadow-orange-500/80',
};

const Controls: React.FC<ControlsProps> = ({ n, setCurrentColour, disabled = false }) => {
  const colours = useColours(n);
  
  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-4 text-center font-semibold text-slate-300 tracking-wide uppercase text-sm flex items-center gap-2">
        <span className="w-8 h-px bg-slate-700"></span>
        Select Color to Flood
        <span className="w-8 h-px bg-slate-700"></span>
      </div>
      <div className="flex flex-wrap justify-center gap-4 max-w-sm">
        {colours.map((colour) => {
          const styleClass = controlStyleMap[colour] || 'bg-black';
          return (
            <button
              key={colour}
              aria-label={`Flood with color ${colour.replace('cell.', '')}`}
              className={`w-14 h-14 rounded-full shadow-lg border-2 border-white/10 cursor-pointer 
                          transition-all duration-300 transform 
                          hover:scale-110 hover:border-white/50 active:scale-95
                          ${styleClass} 
                          ${disabled ? 'opacity-30 cursor-not-allowed grayscale hover:scale-100 hover:border-white/10' : ''}`}
              onClick={() => !disabled && setCurrentColour(colour)}
              disabled={disabled}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Controls;
