import { Day } from "../core/day";
const bignum = require("bignum");
const crt_bignum = require("nodejs-chinese-remainder");

export default class Day13 implements Day<number> {
  private depart: number;
  private buses: string[] = [];

  parseLine = (line: string): number => {
    if (!line) return undefined;
    if (!this.depart) this.depart = parseInt(line, 10);

    const parts = line.split(",");
    this.buses = parts;

    return -1;
  };

  filterInput(input: number[]): number[] {
    return [];
  }

  solve1 = (input: number[]): number => {
    let e = -1;
    let eb;
    for (const bus of this.buses.filter((b) => b !== "x")) {
      const busId = parseInt(bus, 10);
      const earliestStart = this.depart + (busId - (this.depart % busId));

      if (e === -1 || earliestStart < e) {
        e = earliestStart;
        eb = busId;
      }
    }

    return (e - this.depart) * eb;
  };

  solve2 = async (input: number[]): Promise<number> => {
    const idBuses = this.buses
      .map((b, index) => ({ id: b, i: index }))
      .filter((b) => b.id !== "x")
      .map((b) => ({ id: parseInt(b.id, 10), i: b.i }));

    return crt_bignum(
      idBuses.map((b) => b.id - b.i).map((x) => bignum(x)),
      idBuses.map((b) => b.id).map((x) => bignum(x))
    );
  };
}
