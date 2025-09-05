

interface CellProps {
  bg: string;
  isOwned?: boolean;
  id: number;
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

const Cell: React.FC<CellProps> = ({ bg, isOwned = false, id }) => {
  const backgroundColor = colorMap[bg] || '#000000';
  
  return (
    <div 
      className={`w-full h-full ${isOwned ? '' : 'border border-white'}`}
      style={{ 
        backgroundColor,
        // Use negative margins to overcome the grid gap when owned
        ...(isOwned ? { 
          margin: '-1px',
          zIndex: 1,
        } : {})
      }}
    ></div>
  );
};

export default Cell;
