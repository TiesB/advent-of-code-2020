export abstract class Day<T> {
  abstract parseLine(line: string): T;
  abstract solve1(input: T[]): number;
  abstract solve2(input: T[]): number;
}
