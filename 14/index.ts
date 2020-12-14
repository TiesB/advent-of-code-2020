import { Day } from "../core/day";

type Line = {
  address?: number;
  mask?: string;
  value?: number;
};

function getAddresses(address: string): string[] {
  let results = [""];
  for (const c of address) {
    const x = Array.of(...results);
    for (const r of x) {
      if (c !== "X") {
        results.push(r + c);
      } else {
        results.push(r + "0");
        results.push(r + "1");
      }
      results.splice(0, 1);
    }
  }
  return results;
}

export default class Day14 implements Day<Line> {
  parseLine(line: string): Line {
    if (!line) return undefined;

    if (line.startsWith("mask")) {
      return { mask: line.split(" ")[2].trimEnd() };
    }

    return {
      address: parseInt(/.*\[(\d+)]/.exec(line)[1], 10),
      value: parseInt(line.split(" ")[2], 10),
    };
  }

  filterInput(input: Line[]): Line[] {
    return input.filter((i) => !!i);
  }

  solve1(input: Line[]): number {
    let mask = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
    const values: Map<number, number> = new Map();
    for (const i of input) {
      if (i.mask) {
        mask = i.mask;
      } else {
        const bin = i.value.toString(2).padStart(mask.length, "0");
        let result = "";
        for (let j = 0; j < mask.length; j++) {
          if (mask[j] === "X") {
            result += bin[j];
          } else {
            result += mask[j];
          }
        }
        values.set(i.address, parseInt(result, 2));
      }
    }
    let sum = 0;
    values.forEach((v) => {
      sum += v;
    });
    return sum;
  }

  solve2(input: Line[]): number {
    let mask = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
    const values: Map<number, number> = new Map();
    for (const i of input) {
      if (i.mask) {
        mask = i.mask;
      } else {
        const bin = i.address.toString(2).padStart(mask.length, "0");
        let result = "";
        for (let j = 0; j < mask.length; j++) {
          if (mask[j] === "0") {
            result += bin[j];
          } else {
            result += mask[j];
          }
        }
        const addresses = getAddresses(result);
        for (const a of addresses) {
          values.set(parseInt(a, 2), i.value);
        }
      }
    }
    let sum = 0;
    values.forEach((v) => {
      sum += v;
    });
    return sum;
  }
}
