import { Day } from "../core/day";

export default class Day10 implements Day<number> {
  parseLine(line: string): number {
    if (!line) return undefined;

    return Number(line);
  }

  filterInput(input: number[]): number[] {
    return input.filter((i) => !!i);
  }

  solve1(input: number[]): number {
    let current = 0;
    let oneSteps = 0;
    let threeSteps = 1; // Include step to device adapter
    while (input.length) {
      const next = Math.min(...input.filter((i) => i > current));
      input.splice(input.indexOf(next), 1);
      if (next - current === 3) {
        threeSteps += 1;
      } else if (next - current === 1) {
        oneSteps += 1;
      } else {
        console.error("wtf", next, current, next - current);
      }
      current = next;
    }

    return oneSteps * threeSteps;
  }

  solve2 = (input: number[]): number => {
    const numbers = input.sort((a, b) => a - b);
    const r: Map<number, number> = new Map();

    r.set(numbers.length - 1, 1);

    for (let i = numbers.length - 2; i >= 0; i--) {
      const possibilities = numbers.filter(
        (j) => j > numbers[i] && j <= numbers[i] + 3
      );

      r.set(
        i,
        possibilities.reduce((a, b) => a + r.get(numbers.indexOf(b)), 0)
      );
    }

    return numbers
      .slice(0, 3)
      .filter((j) => j > 0 && j <= 3)
      .reduce((a, b) => a + r.get(numbers.indexOf(b)), 0);
  };
}
