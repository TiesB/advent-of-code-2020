import { Day } from "../core/day";

const dirs = [
  (x, y) => ({ x: x - 1, y }),
  (x, y) => ({ x: x + 1, y }),
  (x, y) => ({ x, y: y - 1 }),
  (x, y) => ({ x, y: y + 1 }),
  (x, y) => ({ x: x - 1, y: y - 1 }),
  (x, y) => ({ x: x + 1, y: y - 1 }),
  (x, y) => ({ x: x - 1, y: y + 1 }),
  (x, y) => ({ x: x + 1, y: y + 1 }),
];

function getSeat(rows: string[], x: number, y: number): string {
  if (x < 0 || x > rows[0].length - 1 || y < 0 || y > rows.length - 1)
    return "";
  return rows[y][x];
}

function getOccupiedAdjacentSeats(
  rows: string[],
  x: number,
  y: number
): number {
  return dirs
    .map((f) => f(x, y))
    .map((p) => getSeat(rows, p.x, p.y))
    .reduce((a, b) => a + (b === "#" ? 1 : 0), 0);
}

function getOccupiedVisibleSeatInDir(
  rows: string[],
  x: number,
  y: number,
  dir: (x: number, y: number) => { x: number; y: number }
): number {
  const { x: newX, y: newY } = dir(x, y);
  const seat = getSeat(rows, newX, newY);
  if (!seat.length || seat === "L") {
    return 0;
  } else if (seat === "#") {
    return 1;
  } else {
    return getOccupiedVisibleSeatInDir(rows, newX, newY, dir);
  }
}

function getOccupiedVisibleSeats(rows: string[], x: number, y: number): number {
  let result = 0;
  for (const dir of dirs) {
    result += getOccupiedVisibleSeatInDir(rows, x, y, dir);
  }
  return result;
}

function doRound(rows: string[], isPuzzle2 = false): string[] {
  const result: string[] = [];
  for (let y = 0; y < rows.length; y++) {
    const row = rows[y];
    result.push("");
    for (let x = 0; x < row.length; x++) {
      const seat = row[x];
      const occ = isPuzzle2
        ? getOccupiedVisibleSeats(rows, x, y)
        : getOccupiedAdjacentSeats(rows, x, y);
      if (seat === "L" && occ === 0) {
        result[y] += "#";
      } else if (seat === "#" && occ >= (isPuzzle2 ? 5 : 4)) {
        result[y] += "L";
      } else {
        result[y] += seat;
      }
    }
  }
  return result;
}

function calcHash(rows: string[]): number {
  let result = 0;
  for (let y = 0; y < rows.length; y++) {
    const row = rows[y];
    for (let x = 0; x < row.length; x++) {
      const seat = row[x];
      if (seat === "#") {
        result += y * rows.length + x;
      } else {
        result += 0;
      }
    }
  }
  return result;
}

function printRows(rows: string[]): void {
  console.log("");
  for (const row of rows) {
    console.log(row);
  }
}

export default class Day11 implements Day<string> {
  parseLine(line: string): string {
    return line;
  }

  filterInput(input: string[]): string[] {
    return input.filter((r) => r.length > 0);
  }

  solve1(input: string[]): number {
    let oldHash;
    while (oldHash !== (oldHash = calcHash(input))) {
      input = doRound(input);
    }
    return input.reduce(
      (a, b) => a + b.split("").filter((c) => c === "#").length,
      0
    );
  }

  solve2(input: string[]): number {
    let oldHash;
    while (oldHash !== (oldHash = calcHash(input))) {
      input = doRound(input, true);
    }
    return input.reduce(
      (a, b) => a + b.split("").filter((c) => c === "#").length,
      0
    );
  }
}
