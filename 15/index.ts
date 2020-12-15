import { Day } from "../core/day";

function findLast(input: number[], target: number) {
  const m: Map<number, number> = new Map();

  let turn = 1;
  for (; turn < input.length + 1; turn++) {
    m.set(input[turn - 1], turn);
  }

  let last = input[input.length - 1];
  let lastPrev = undefined;
  while (turn <= target) {
    if (!lastPrev) {
      last = 0;
    } else {
      last = turn - 1 - lastPrev;
    }
    lastPrev = m.get(last);
    m.set(last, turn);
    turn++;
  }

  return last;
}

export default class Day15 implements Day<number[]> {
  parseLine(line: string): number[] {
    if (!line) return undefined;
    return line.split(",").map((i) => parseInt(i, 10));
  }

  filterInput(input: number[][]): number[][] {
    return input.filter((i) => !!i);
  }

  solve1(input: number[][]): number {
    return findLast(input[0], 2020);
  }

  solve2(input: number[][]): number {
    return findLast(input[0], 30000000);
  }
}
