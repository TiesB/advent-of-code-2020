import { Day } from "../core/day";

type Group = { count: number; questions: string[]; answers: string[] };

export default class Day6 implements Day<Group> {
  currentGroup: Group = { count: 0, questions: [], answers: [] };

  parseLine = (line: string): Group => {
    if (line === "") {
      const temp = this.currentGroup;
      this.currentGroup = { count: 0, questions: [], answers: [] };
      return temp;
    }

    this.currentGroup.answers.push(line);
    for (const q of line) {
      if (!this.currentGroup.questions.includes(q)) {
        this.currentGroup.questions.push(q);
        this.currentGroup.count++;
      }
    }
    return undefined;
  };

  filterInput(input: Group[]): Group[] {
    return input.filter((g) => !!g);
  }

  solve1(input: Group[]): number {
    return input.reduce((a, b) => a + b.count, 0);
  }

  solve2(input: Group[]): number {
    let sum = 0;
    for (const group of input) {
      let qs = group.answers[0];
      for (let i = 1; i < group.answers.length; i++) {
        for (const q of qs) {
          if (!group.answers[i].includes(q)) {
            qs = qs.replace(q, "");
          }
        }
      }
      sum += qs.length;
    }
    return sum;
  }
}
