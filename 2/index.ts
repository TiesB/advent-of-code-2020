import { Day } from "../core/day";

type input = {
  lowest: number;
  highest: number;
  letter: string;
  password: string;
};

const regex = /(\d+?)-(\d+?) (\w): (\w*)/;

export default class Day2 implements Day<input> {
  parseLine(line: string): input {
    const match = regex.exec(line);
    if (match) {
      return {
        lowest: Number(match[1]),
        highest: Number(match[2]),
        letter: match[3],
        password: match[4],
      };
    }
    return undefined;
  }

  solve1(input: input[]): number {
    return input.filter(isValid1).length;
  }

  solve2(input: input[]): number {
    return input.filter(isValid2).length;
  }
}

function isValid1(input: input): boolean {
  if (!input) return false;

  const count = input.password.replace(
    new RegExp(`[^${input.letter}]`, "g"),
    ""
  ).length;
  return count >= input.lowest && count <= input.highest;
}

function isValid2(input: input): boolean {
  if (!input) return false;

  return (
    (input.password[input.lowest - 1] === input.letter &&
      input.password[input.highest - 1] !== input.letter) ||
    (input.password[input.lowest - 1] !== input.letter &&
      input.password[input.highest - 1] === input.letter)
  );
}
