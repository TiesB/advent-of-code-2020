import { Day } from "../core/day";

type BoardingPass = { row: number; column: number; id: number };

export default class Day5 implements Day<BoardingPass> {
  parseLine(line: string): BoardingPass {
    line = line
      .replace(/F/g, "0")
      .replace(/B/g, "1")
      .replace(/L/g, "0")
      .replace(/R/g, "1");
    const rowInput = line.substring(0, 7);
    const columnInput = line.substring(7);

    const row = parseInt(rowInput, 2);
    const column = parseInt(columnInput, 2);

    return { row, column, id: row * 8 + column };
  }

  solve1(input: BoardingPass[]): number {
    return Math.max(
      ...input.filter((bp) => Number.isInteger(bp.id)).map((bp) => bp.id)
    );
  }

  solve2(input: BoardingPass[]): number {
    const ids = input
      .filter((bp) => Number.isInteger(bp.id))
      .map((bp) => bp.id);
    for (let i = 100; i <= Math.max(...ids); i++) {
      if (!ids.includes(i)) return i;
    }

    return -1;
  }
}
