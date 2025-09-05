import React from "react";
import useColours from "../../hooks/colours";

interface ControlsProps {
  n: number;
  setCurrentColour: (colour: string) => void;
  disabled?: boolean;
}

const colorMap: Record<string, string> = {
  'cell.0': '#FF0000',
  'cell.1': '#191970',
  'cell.2': '#006400',
  'cell.3': '#ffd700',
  'cell.4': '#00ff00',
  'cell.5': '#1e90ff',
  'cell.6': '#c71585',
  'cell.7': '#ffb6c1',
};

const Controls: React.FC<ControlsProps> = ({ n, setCurrentColour, disabled = false }) => {
  const colours = useColours(n);
  
  return (
    <div className="mt-4">
      <div className="mb-2 text-center font-semibold text-gray-700">
        Select a color to flood:
      </div>
      <div className="w-80" style={{ display: 'grid', gridTemplateColumns: `repeat(${n / 2}, 1fr)`, gap: '4px' }}>
        {colours.map((colour) => (
          <button
            key={colour}
            className={`w-full h-12 border-2 border-gray-400 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={{ backgroundColor: colorMap[colour] }}
            onClick={() => !disabled && setCurrentColour(colour)}
            disabled={disabled}
          >
            <span className="sr-only">Color {colour.replace('cell.', '')}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Controls;
