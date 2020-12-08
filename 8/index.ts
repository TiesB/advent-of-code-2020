import { Day } from "../core/day";

type Instruction = {
  op: string;
  arg: number;
};

function run(program: Instruction[]): { hasLoop: boolean; acc: number } {
  const visited = [];
  let acc = 0;
  let hasLoop = false;
  for (let i = 0; i < program.length; ) {
    if (visited.includes(i)) {
      hasLoop = true;
      break;
    }
    visited.push(i);
    const instruction = program[i];

    if (instruction.op === "jmp") {
      i += instruction.arg;
    } else {
      if (instruction.op === "acc") {
        acc += instruction.arg;
      }

      i += 1;
    }
  }

  return { hasLoop, acc };
}

export default class Day8 implements Day<Instruction> {
  parseLine(line: string): Instruction {
    if (!line) return undefined;

    const parts = line.split(" ");

    return { op: parts[0], arg: parseInt(parts[1], 10) };
  }

  filterInput(input: Instruction[]): Instruction[] {
    return input.filter((i) => !!i);
  }

  solve1(input: Instruction[]): number {
    return run(input).acc;
  }

  solve2(input: Instruction[]): number {
    for (let i = 0; i < input.length; i++) {
      let changed = false;
      if (input[i].op === "jmp") {
        input[i].op = "nop";
        changed = true;
      } else if (input[i].op === "nop") {
        input[i].op = "jmp";
        changed = true;
      }
      const r = run(input);
      if (!r.hasLoop) return r.acc;

      if (changed) {
        if (input[i].op === "nop") {
          input[i].op = "jmp";
        } else if (input[i].op === "jmp") {
          input[i].op = "nop";
        }
      }
    }
    return -1;
  }
}
