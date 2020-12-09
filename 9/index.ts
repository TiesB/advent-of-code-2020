import { Day } from "../core/day";

function hasPair(input: number[], i: number) {
  for (let j = i - 25; j < i; j++) {
    for (let k = i - 24; k < i; k++) {
      if (k === j) continue;

      if (input[j] + input[k] === input[i]) return true;
    }
  }
  return false;
}

function findRange(
  input: number[],
  invalid: number
): { start: number; length: number } {
  for (let start = 0; start < input.length; start++) {
    for (let length = 1; length < input.length - start; length++) {
      let sum = 0;
      for (let k = 0; k < length; k++) {
        sum += input[start + k];
      }
      if (sum === invalid) {
        return { start, length };
      }
      if (sum > invalid) break;
    }
  }
  return undefined;
}

export default class Day9 implements Day<number> {
  parseLine(line: string): number {
    if (!line) return -1;
    return Number(line);
  }

  filterInput(input: number[]): number[] {
    return input.filter((n) => n >= 0);
  }

  solve1(input: number[]): number {
    for (let i = 25; i < input.length; i++) {
      if (!hasPair(input, i)) return input[i];
    }
    return -1;
  }

  solve2(input: number[]): number {
    let invalid;
    for (let i = 25; i < input.length; i++) {
      if (!hasPair(input, i)) {
        invalid = input[i];
        break;
      }
    }

    const r = findRange(input, invalid);
    if (!r) return -1;

    const range = input.slice(r.start, r.start + r.length);

    return Math.min(...range) + Math.max(...range);
  }
}
