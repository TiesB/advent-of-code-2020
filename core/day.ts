export interface Day<T> {
  parseLine(line: string): T;
  solve1(input: T[]): number;
  solve2(input: T[]): number;
}
