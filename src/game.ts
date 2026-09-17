/**
 * Pure game logic — no React. Every function returns new state; nothing
 * mutates, so undo/memoization/StrictMode all stay safe.
 */

export type Difficulty = "easy" | "medium" | "hard" | "daily";
export type Status = "playing" | "won" | "lost";

/** Okabe–Ito colour-blind-safe palette (six of the eight). */
export const PALETTE = [
  "#0072B2", // blue
  "#E69F00", // orange
  "#009E73", // green
  "#F0E442", // yellow
  "#CC79A7", // pink
  "#56B4E9", // sky
];

/** One glyph per colour so swatches are tellable apart without colour. */
export const GLYPHS = ["●", "▲", "■", "◆", "★", "✚"];

/** Glyph/text colour that reads on each swatch. */
export const GLYPH_INK = ["#fff", "#fff", "#fff", "#1e293b", "#fff", "#1e293b"];

export const COLOR_NAMES = ["blue", "orange", "green", "yellow", "pink", "sky blue"];

export interface DifficultyConfig {
  label: string;
  size: number;
  budget: number;
}

/** Anchored to the classic 14×14→25, with a grace move on the ladder
 * tiers (playtesting showed pure greedy losing at 97–98%); the Daily
 * stays at the strict canonical budget. */
export const DIFFICULTIES: Record<Difficulty, DifficultyConfig> = {
  easy: { label: "Easy", size: 10, budget: 20 },
  medium: { label: "Medium", size: 14, budget: 26 },
  hard: { label: "Hard", size: 21, budget: 40 },
  daily: { label: "Daily", size: 14, budget: 25 },
};

export interface Game {
  difficulty: Difficulty;
  size: number;
  budget: number;
  /** Colour index per cell, row-major. */
  cells: number[];
  /** Whether each cell belongs to the flooded region. */
  owned: boolean[];
  moves: number;
  status: Status;
  /** Cells gained by the last move (0 = wasted move). */
  lastGain: number;
  /** Set for daily games: the seed date, e.g. "2026-09-17". */
  dateKey?: string;
}

/** Deterministic RNG for the shared daily board. */
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function todayKey(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Absorb every unowned neighbour matching `color`; returns cells gained. */
function capture(cells: number[], owned: boolean[], size: number, color: number): number {
  const stack: number[] = [];
  for (let i = 0; i < owned.length; i++) if (owned[i]) stack.push(i);
  let gained = 0;
  while (stack.length > 0) {
    const i = stack.pop()!;
    const col = i % size;
    const neighbors = [
      col > 0 ? i - 1 : -1,
      col < size - 1 ? i + 1 : -1,
      i - size,
      i + size,
    ];
    for (const j of neighbors) {
      if (j >= 0 && j < cells.length && !owned[j] && cells[j] === color) {
        owned[j] = true;
        gained++;
        stack.push(j);
      }
    }
  }
  return gained;
}

export function newGame(difficulty: Difficulty): Game {
  const { size, budget } = DIFFICULTIES[difficulty];
  const dateKey = difficulty === "daily" ? todayKey() : undefined;
  const rng = dateKey ? mulberry32(hashString(`flood-${dateKey}`)) : Math.random;

  const cells = Array.from({ length: size * size }, () =>
    Math.floor(rng() * PALETTE.length),
  );
  const owned = new Array<boolean>(size * size).fill(false);
  owned[0] = true;
  // The starting region is the whole contiguous patch at the corner —
  // openings immediately feel alive instead of one-cell-at-a-time.
  capture(cells, owned, size, cells[0]);

  return {
    difficulty,
    size,
    budget,
    cells,
    owned,
    moves: 0,
    status: "playing",
    lastGain: 0,
    dateKey,
  };
}

export function currentColor(game: Game): number {
  return game.cells[0];
}

export function ownedCount(game: Game): number {
  let n = 0;
  for (const o of game.owned) if (o) n++;
  return n;
}

export function flood(game: Game, color: number): Game {
  if (game.status !== "playing" || color === currentColor(game)) return game;

  const cells = [...game.cells];
  const owned = [...game.owned];
  for (let i = 0; i < cells.length; i++) if (owned[i]) cells[i] = color;
  const gained = capture(cells, owned, game.size, color);

  const moves = game.moves + 1;
  const complete = owned.every(Boolean);
  const status: Status = complete ? "won" : moves >= game.budget ? "lost" : "playing";

  return { ...game, cells, owned, moves, status, lastGain: gained };
}

// ---- best scores (localStorage; absent in private windows — tolerate) ----

function bestKey(game: Game): string {
  return game.difficulty === "daily"
    ? `flood.best.daily.${game.dateKey}`
    : `flood.best.${game.difficulty}`;
}

export function loadBest(game: Game): number | null {
  try {
    const raw = localStorage.getItem(bestKey(game));
    const n = raw ? Number(raw) : NaN;
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

/** Record a win; returns the (possibly new) best. */
export function recordWin(game: Game): number {
  const prev = loadBest(game);
  const best = prev === null ? game.moves : Math.min(prev, game.moves);
  try {
    localStorage.setItem(bestKey(game), String(best));
  } catch {
    /* storage unavailable */
  }
  return best;
}
