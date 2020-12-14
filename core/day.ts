export interface Day<T> {
  parseLine(line: string): T;
  filterInput?(input: T[]): T[];
  solve1(input: T[]): number | Promise<number>;
  solve2(input: T[]): number | Promise<number>;
}
