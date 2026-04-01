import React from "react";

interface CellProps {
  bg: string;
  isOwned?: boolean;
  id: number;
}

const colorClassMap: Record<string, string> = {
  'cell.0': 'bg-cell-0',
  'cell.1': 'bg-cell-1',
  'cell.2': 'bg-cell-2',
  'cell.3': 'bg-cell-3',
  'cell.4': 'bg-cell-4',
  'cell.5': 'bg-cell-5',
  'cell.6': 'bg-cell-6',
  'cell.7': 'bg-cell-7',
};

const Cell: React.FC<CellProps> = ({ bg, isOwned = false, id }) => {
  const bgColorClass = colorClassMap[bg] || 'bg-black';
  
  return (
    <div 
      className={`w-full h-full transition-colors duration-500 ease-in-out ${bgColorClass} ${isOwned ? 'z-10' : 'z-0'} `}
      style={{
        // Add a tiny overlap to prevent sub-pixel rendering gaps on some displays given we removed borders
        transform: 'scale(1.02)'
      }}
    />
  );
};

export default Cell;
