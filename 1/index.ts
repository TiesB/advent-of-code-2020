import { Day } from "../core/day";

export default class Day1 extends Day<number> {
  parseLine(line: string): number {
    return Number(line);
  }

  solve1(input: number[]): number {
    for (const i of input) {
      for (const j of input) {
        if (i + j === 2020) {
          return i * j;
        }
      }
    }
  }

  solve2(input: number[]): number {
    for (const i of input) {
      for (const j of input) {
        for (const k of input) {
          if (i + j + k === 2020) {
            return i * j * k;
          }
        }
      }
    }
  }
}
