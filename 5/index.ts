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

  filterInput(input: BoardingPass[]): BoardingPass[] {
    return input.filter((bp) => !Number.isNaN(bp.id));
  }

  solve1(input: BoardingPass[]): number {
    return Math.max(...input.map((bp) => bp.id));
  }

  solve2(input: BoardingPass[]): number {
    const ids = input.map((bp) => bp.id);
    for (let i = Math.min(...ids); i <= Math.max(...ids); i++) {
      if (!ids.includes(i)) return i;
    }

    return -1;
  }
}
