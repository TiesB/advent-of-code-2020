import { Day } from "../core/day";

type Range = { low: number; high: number };

type Field = {
  field: string;
  range1: Range;
  range2: Range;
};

const fieldRegex = /([\w\s]+): (\d+-\d+) or (\d+-\d+)/;

function isInRange(value: number, field: Field) {
  return (
    (value >= field.range1.low && value <= field.range1.high) ||
    (value >= field.range2.low && value <= field.range2.high)
  );
}

export default class Day16 implements Day<number> {
  private currentPart = 0;

  private fields: Field[] = [];
  private ourTicket: number[];
  private nearbyTickets: number[][] = [];

  parseField = (line: string): void => {
    const match = fieldRegex.exec(line);
    const r1 = match[2].split("-").map((i) => parseInt(i, 10));
    const r2 = match[3].split("-").map((i) => parseInt(i, 10));
    this.fields.push({
      field: match[1],
      range1: { low: r1[0], high: r1[1] },
      range2: { low: r2[0], high: r2[1] },
    });
  };

  parseLine = (line: string): number => {
    if (!line) return;

    if (line.includes("your ticket:")) {
      this.currentPart = 1;
      return;
    } else if (line.includes("nearby tickets:")) {
      this.currentPart = 2;
      return;
    }

    switch (this.currentPart) {
      case 0:
        this.parseField(line);
        break;
      case 1:
        this.ourTicket = line.split(",").map((i) => parseInt(i, 10));
        break;
      case 2:
        this.nearbyTickets.push(line.split(",").map((i) => parseInt(i, 10)));
        break;
    }
  };

  filterInput = (input: number[]): number[] => {
    return input;
  };

  solve1 = (input: number[]): number => {
    const errors: number[] = [];

    for (const ticket of this.nearbyTickets) {
      let tCopy = Array.of(...ticket);

      for (const field of this.fields) {
        if (!tCopy.length) break;

        let solves = [];
        for (const v of tCopy) {
          if (isInRange(v, field)) {
            solves.push(v);
          }
        }
        for (const v of solves) {
          tCopy.splice(tCopy.indexOf(v), 1);
        }
      }

      errors.push(...tCopy);
    }

    return errors.reduce((a, b) => a + b, 0);
  };

  isValidTicket = (ticket: number[]): boolean => {
    let tCopy = Array.of(...ticket);

    for (const field of this.fields) {
      if (!tCopy.length) break;

      let solves = [];
      for (const v of tCopy) {
        if (isInRange(v, field)) {
          solves.push(v);
        }
      }
      for (const v of solves) {
        tCopy.splice(tCopy.indexOf(v), 1);
      }
    }

    return tCopy.length === 0;
  };

  solve2 = (input: number[]): number => {
    const fieldIndices: Map<string, number[]> = new Map();
    const nearbyTickets = this.nearbyTickets.filter(this.isValidTicket);

    for (const field of this.fields) {
      const r = [];
      for (let i = 0; i < this.fields.length; i++) {
        if (
          nearbyTickets.reduce(
            (valid, ticket) => valid && isInRange(ticket[i], field),
            true
          )
        ) {
          r.push(i);
        }
      }

      fieldIndices.set(field.field, r);
    }

    const solvedFields: { f: string; i: number }[] = [];
    fieldIndices.forEach((v, k) => {
      if (v.length === 1) {
        solvedFields.push({ f: k, i: v[0] });
      }
    });

    while (solvedFields.length < this.fields.length) {
      for (let i = 0; i < this.fields.length; i++) {
        if (solvedFields.find((v) => v.i === i)) continue;

        const possibleFields = [];
        fieldIndices.forEach((v, k) => {
          if (!solvedFields.find((v2) => v2.f === k) && v.includes(i))
            possibleFields.push(k);
        });

        if (possibleFields.length === 1) {
          solvedFields.push({ f: possibleFields[0], i });
        }
      }
    }

    let result = 1;
    for (const sField of solvedFields) {
      if (sField.f.startsWith("departure")) {
        result *= this.ourTicket[sField.i];
      }
    }
    return result;
  };
}
