import { Day } from "../core/day";

type Passport = {
  byr: number;
  iyr: number;
  eyr: number;
  hgt: string;
  hcl: string;
  ecl: string;
  pid: string;
  cid: number;
  lines: string[];
};

const numberParts = ["byr", "iyr", "eyr", "cid"];

export default class Day4 implements Day<Partial<Passport>> {
  currentPassport: Partial<Passport> = {};

  parseLine = (line: string): Partial<Passport> => {
    if (line === "") {
      const temp = this.currentPassport;
      this.currentPassport = {};
      return temp;
    }

    const pairs = line.split(" ");
    for (const pair of pairs) {
      const parts = pair.split(":");
      this.currentPassport[parts[0]] = numberParts.includes(parts[0])
        ? Number(parts[1])
        : parts[1];
    }
    if (this.currentPassport.lines === undefined)
      this.currentPassport.lines = [];
    this.currentPassport.lines.push(line);
    return undefined;
  };

  solve1 = (input: Partial<Passport>[]): number => {
    return input.filter(isValid1).length;
  };

  solve2 = (input: Partial<Passport>[]): number => {
    return input.filter(isValid2).length;
  };
}

function isValid1(passport: Partial<Passport>): boolean {
  return (
    passport &&
    passport.byr !== undefined &&
    passport.iyr !== undefined &&
    passport.eyr !== undefined &&
    passport.hgt !== undefined &&
    passport.hcl !== undefined &&
    passport.ecl !== undefined &&
    passport.pid !== undefined
  );
}

function isValid2(passport: Partial<Passport>): boolean {
  if (!isValid1(passport)) return false;
  for (const key in passport) {
    if (!checkField(key, passport[key])) return false;
  }
  return true;
}

const colorRegex = /#(?:[\d]|[abcdef]){6}/;

function checkField(field: string, value: string | number): boolean {
  switch (field) {
    case "byr":
      return value >= 1920 && value <= 2002;
    case "iyr":
      return value >= 2010 && value <= 2020;
    case "eyr":
      return value >= 2020 && value <= 2030;
    case "hgt":
      if ((value as string).endsWith("cm")) {
        return (
          (value as string).length === 5 &&
          Number((value as string).substring(0, 3)) >= 150 &&
          Number((value as string).substring(0, 3)) <= 193
        );
      } else if ((value as string).endsWith("in")) {
        return (
          (value as string).length === 4 &&
          Number((value as string).substring(0, 2)) >= 59 &&
          Number((value as string).substring(0, 2)) <= 76
        );
      } else return false;
    case "hcl":
      return (value as string).length === 7 && colorRegex.test(value as string);
    case "ecl":
      return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(
        value as string
      );
    case "pid":
      return (value as string).length === 9;
    default:
      return true;
  }
}
