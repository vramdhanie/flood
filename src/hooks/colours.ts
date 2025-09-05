const useColours = (n: number): string[] => {
  const colours = new Array(n).fill("").map((_, i) => `cell.${i}`);

  return colours;
};

export default useColours;
