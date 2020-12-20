import { Day } from "../core/day";

type Rule = { id: number; rule: (number | string)[][] };

export default class Day19 implements Day<Rule | string> {
  private valids: Map<number, string[]> = new Map();
  private rules: Map<number, Rule> = new Map();
  private regexes: Map<number, string> = new Map();

  getValids = (ruleId: number): string[] => {
    if (this.valids.has(ruleId)) return this.valids.get(ruleId);
    const rule = this.rules.get(ruleId).rule;
    let result = [];
    for (const r of rule) {
      if (r.length === 1 && (r[0] === "a" || r[0] === "b")) {
        result.push(r[0]);
        break;
      }

      if (r.length === 1) {
        result.push(...this.getValids(r[0] as number));
      } else {
        const r0valids = this.getValids(r[0] as number);
        const r1valids = this.getValids(r[1] as number);
        for (const v0 of r0valids) {
          for (const v1 of r1valids) {
            result.push(v0 + v1);
          }
        }
      }
    }
    this.valids.set(ruleId, result);
    return result;
  };

  getRegex = (ruleId: number): string => {
    if (this.regexes.has(ruleId)) return this.regexes.get(ruleId);

    const rule = this.rules.get(ruleId).rule;
    let result = "(?:";
    for (let i = 0; i < rule.length; i++) {
      let r = rule[i];
      if (i > 0) result += "|";
      if (r.length === 1 && (r[0] === "a" || r[0] === "b")) {
        result += r[0];
        break;
      }

      for (const rId of r) {
        result += this.getRegex(rId as number);
      }
    }
    result += ")";
    this.regexes.set(ruleId, result);
    return result;
  };

  parseLine(line: string): Rule | string {
    if (line.includes(":")) {
      const p = line.split(":");
      const id = parseInt(p[0], 10);
      const parts = p[1].split(" ");
      parts.splice(0, 1);
      const result = { id, rule: [[]] };
      if (parts.length === 1 && (parts[0] === '"a"' || parts[0] === '"b"')) {
        return { id, rule: [[parts[0][1]]] };
      }

      const iof = parts.indexOf("|");
      if (iof >= 0) {
        result.rule.push([]);
        for (let i = 0; i < iof; i++) {
          result.rule[0].push(parseInt(parts[i], 10));
        }
        for (let i = iof + 1; i < parts.length; i++) {
          result.rule[1].push(parseInt(parts[i], 10));
        }
      } else {
        for (let i = 0; i < parts.length; i++) {
          result.rule[0].push(parseInt(parts[i], 10));
        }
      }
      return result;
    } else return line;
  }

  filterInput(input: (Rule | string)[]): (Rule | string)[] {
    return input.filter((i) => !!i);
  }

  solve1(input: (Rule | string)[]): number {
    const messages: string[] = [];
    for (const line of input) {
      if (typeof line === "object") {
        this.rules.set(line.id, line);
      } else messages.push(line);
    }

    const regex = new RegExp(`^${this.getRegex(0)}$`);
    return messages.filter((m) => !!regex.exec(m)).length;
  }

  solve2(input: (Rule | string)[]): number {
    const messages: string[] = [];
    for (const line of input) {
      if (typeof line === "object") {
        this.rules.set(line.id, line);
      } else messages.push(line);
    }

    const r31 = this.getRegex(31);
    const r42 = this.getRegex(42);
    const v31 = this.getValids(31);
    const stepSize = v31[0].length;

    return messages.filter((m) => {
      const vs = m.length / stepSize;
      for (let i = 1; i < vs - i; i++) {
        const r = `${r42}{${vs - i}}${r31}{${i}}`;
        if (!!new RegExp(r).exec(m)) {
          return true;
        }
      }
      return false;
    }).length;
  }
}
