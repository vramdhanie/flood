const useColours = (n) => {
  const colours = new Array(n).fill("").map((_, i) => `cell.${i}`);

  return colours;
};

export default useColours;
