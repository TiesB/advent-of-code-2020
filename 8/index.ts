import { Day } from "../core/day";

type Instruction = {
  op: string;
  arg: number;
};

function run(program: Instruction[]): { hasLoop: boolean; acc: number } {
  const visited: Set<number> = new Set();
  let acc = 0;
  let hasLoop = false;
  for (let i = 0; i < program.length; ) {
    if (visited.has(i)) {
      hasLoop = true;
      break;
    }
    visited.add(i);
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
      const oldOp = input[i].op;

      if (oldOp === "acc") continue;

      input[i].op = oldOp === "jmp" ? "nop" : "jmp";

      const r = run(input);
      if (!r.hasLoop) return r.acc;

      input[i].op = oldOp;
    }
    return -1;
  }
}
