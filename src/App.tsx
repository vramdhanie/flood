import { memo, useCallback, useEffect, useState } from "react";

import {
  COLOR_NAMES,
  DIFFICULTIES,
  Difficulty,
  flood,
  Game,
  GLYPH_INK,
  GLYPHS,
  loadBest,
  newGame,
  ownedCount,
  PALETTE,
  recordWin,
} from "./game";

const DIFF_ORDER: Difficulty[] = ["easy", "medium", "hard", "daily"];

/** One board square. Unowned cells are dimmed so your territory is visible. */
const Cell = memo(function Cell({ color, owned }: { color: number; owned: boolean }) {
  return (
    <div
      className="h-full w-full transition-[background-color,filter] duration-300 ease-out"
      style={{
        backgroundColor: PALETTE[color],
        filter: owned ? "none" : "brightness(0.68) saturate(0.85)",
      }}
    />
  );
});

export default function App() {
  const [game, setGame] = useState<Game>(() => newGame("medium"));
  const [best, setBest] = useState<number | null>(() => loadBest(newGame("medium")));

  const start = useCallback((difficulty: Difficulty) => {
    const g = newGame(difficulty);
    setGame(g);
    setBest(loadBest(g));
  }, []);

  const play = useCallback(
    (color: number) => {
      setGame((g) => {
        const next = flood(g, color);
        if (next !== g && next.status === "won") {
          setBest(recordWin(next));
        }
        return next;
      });
    },
    [],
  );

  // Keys 1–6 pick colours.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (n >= 1 && n <= PALETTE.length) play(n - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [play]);

  const total = game.size * game.size;
  const captured = ownedCount(game);
  const pct = Math.round((captured / total) * 100);
  const movesLeft = game.budget - game.moves;
  const current = game.cells[0];
  const over = game.status !== "playing";
  const wasted = game.status === "playing" && game.moves > 0 && game.lastGain === 0;

  const movesTone =
    game.status === "won"
      ? "text-emerald-300"
      : game.status === "lost" || movesLeft <= 3
        ? "text-rose-400"
        : movesLeft <= 7
          ? "text-amber-300"
          : "text-slate-100";

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-4 px-4 py-6">
        {/* Header */}
        <header className="flex items-center justify-between gap-3">
          <h1 className="text-lg font-bold tracking-tight">
            Flood<span className="text-slate-600">.</span>
          </h1>
          <div className="flex rounded-lg border border-slate-800 p-0.5" role="tablist" aria-label="Difficulty">
            {DIFF_ORDER.map((d) => (
              <button
                key={d}
                role="tab"
                aria-selected={game.difficulty === d}
                onClick={() => start(d)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  game.difficulty === d
                    ? "bg-slate-800 text-white"
                    : "text-slate-500 hover:text-slate-200"
                }`}
              >
                {DIFFICULTIES[d].label}
              </button>
            ))}
          </div>
        </header>

        {/* Status */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                Moves left
              </div>
              <div className={`text-4xl font-bold tabular-nums ${movesTone}`}>{movesLeft}</div>
            </div>
            <div className="text-right text-sm leading-6 text-slate-400">
              <div>
                captured <span className="font-semibold text-slate-200 tabular-nums">{pct}%</span>
              </div>
              <div>
                best{" "}
                <span className="font-semibold text-slate-200 tabular-nums">
                  {best === null ? "—" : best}
                </span>
                {game.difficulty === "daily" && (
                  <span className="ml-1 text-xs text-slate-500">({game.dateKey})</span>
                )}
              </div>
            </div>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-slate-300 transition-all duration-300 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
        </section>

        {/* Board */}
        <section className="overflow-hidden rounded-xl border border-slate-800">
          <div
            className="grid aspect-square w-full"
            style={{
              gridTemplateColumns: `repeat(${game.size}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${game.size}, minmax(0, 1fr))`,
            }}
            aria-label={`Game board, ${pct} percent captured`}
          >
            {game.cells.map((color, i) => (
              <Cell key={i} color={color} owned={game.owned[i]} />
            ))}
          </div>
        </section>

        {/* Outcome / hints */}
        {game.status === "won" && (
          <section className="rounded-xl border border-emerald-900/60 bg-emerald-950/40 p-4 text-center">
            <p className="font-semibold text-emerald-300">
              Solved in {game.moves} of {game.budget} moves
              {best !== null && game.moves <= best && " — new best!"}
            </p>
            <button
              onClick={() => start(game.difficulty)}
              className="mt-3 rounded-lg bg-emerald-400 px-6 py-2 text-sm font-semibold text-emerald-950 transition-colors hover:bg-emerald-300"
            >
              Play again
            </button>
          </section>
        )}
        {game.status === "lost" && (
          <section className="rounded-xl border border-rose-900/60 bg-rose-950/40 p-4 text-center">
            <p className="font-semibold text-rose-300">
              Out of moves — {pct}% captured
            </p>
            <button
              onClick={() => start(game.difficulty)}
              className="mt-3 rounded-lg bg-rose-400 px-6 py-2 text-sm font-semibold text-rose-950 transition-colors hover:bg-rose-300"
            >
              Try again
            </button>
          </section>
        )}

        {/* Controls */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
          <div className="flex justify-center gap-3">
            {PALETTE.map((hex, i) => {
              const isCurrent = i === current;
              return (
                <div key={hex} className="flex flex-col items-center gap-1">
                  <button
                    onClick={() => play(i)}
                    disabled={over || isCurrent}
                    aria-label={`Flood with ${COLOR_NAMES[i]}${isCurrent ? " (current colour)" : ""}`}
                    className={`flex h-11 w-11 items-center justify-center rounded-full text-base font-bold transition-transform ${
                      over
                        ? "opacity-30"
                        : isCurrent
                          ? "cursor-default ring-2 ring-white/70 ring-offset-2 ring-offset-slate-950"
                          : "hover:scale-110 active:scale-95"
                    }`}
                    style={{ backgroundColor: hex, color: GLYPH_INK[i] }}
                  >
                    {GLYPHS[i]}
                  </button>
                  <span className="text-[10px] text-slate-600 tabular-nums">{i + 1}</span>
                </div>
              );
            })}
          </div>
          <p className="mt-3 min-h-5 text-center text-xs text-slate-500" aria-live="polite">
            {wasted
              ? "No cells gained — pick a colour touching your region."
              : "Flood the board from the top-left in the given moves. Keys 1–6 work too."}
          </p>
        </section>

        {!over && (
          <button
            onClick={() => start(game.difficulty)}
            className="mx-auto text-xs text-slate-600 underline-offset-2 transition-colors hover:text-slate-300 hover:underline"
          >
            New game
          </button>
        )}
      </main>

      <footer className="border-t border-slate-900 py-4 text-center text-xs text-slate-600">
        <a
          href="https://vincentramdhanie.com"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-slate-300"
        >
          © {new Date().getFullYear()} Vincent Ramdhanie
        </a>
      </footer>
    </div>
  );
}
