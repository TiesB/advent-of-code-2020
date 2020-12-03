import { Day } from "../core/day";

export default class Day3 implements Day<string> {
  parseLine(line: string): string {
    return line;
  }

  solve1(input: string[]): number {
    const width = input[0].length;

    let x = 0;
    let y = 0;
    let count = 0;
    while (y < input.length) {
      if (input[y][x % width] === "#") count++;

      x += 3;
      y += 1;
    }

    return count;
  }

  solve2(input: string[]): number {
    const width = input[0].length;

    const steps: { x: number; y: number }[] = [
      { x: 1, y: 1 },
      { x: 3, y: 1 },
      { x: 5, y: 1 },
      { x: 7, y: 1 },
      { x: 1, y: 2 },
    ];

    let results = [];

    for (const step of steps) {
      let x = 0;
      let y = 0;
      let count = 0;
      while (y < input.length) {
        if (input[y][x % width] === "#") count++;

        x += step.x;
        y += step.y;
      }
      results.push(count);
    }

    return results.reduce((a, b) => a * b);
  }
}
