import { Day } from "../core/day";

class Cup {
  public next: Cup;
  constructor(public value: number) {}
}

export default class Day23 implements Day<number> {
  parseLine(line: string): number {
    return Number(line);
  }

  filterInput(input: number[]): number[] {
    return input;
  }

  solve1(input: number[]): number {
    const cups = Array.of(
      ...input[0]
        .toString(10)
        .split("")
        .map((i) => parseInt(i, 10))
    );

    let currentCup = 0;
    for (let i = 0; i < 100; i++) {
      const currentCupValue = cups[currentCup];
      const pickUp: number[] = [];
      for (let j = 1; j <= 3; j++) {
        pickUp.push(cups[(currentCup + j) % cups.length]);
      }
      for (const pU of pickUp) {
        cups.splice(cups.indexOf(pU), 1);
      }
      let destinationCup = currentCupValue;
      while (
        !(cups.includes(destinationCup) || pickUp.includes(destinationCup)) ||
        pickUp.includes(destinationCup) ||
        destinationCup === currentCupValue
      ) {
        destinationCup = destinationCup - 1;
        if (destinationCup < 0) destinationCup = Math.max(...cups, ...pickUp);
      }
      cups.splice(cups.indexOf(destinationCup) + 1, 0, ...pickUp);
      currentCup = (cups.indexOf(currentCupValue) + 1) % cups.length;
    }

    const indexOf1 = cups.indexOf(1);
    let result = "";
    for (let i = 0; i < cups.length - 1; i++) {
      result += cups[(indexOf1 + 1 + i) % cups.length];
    }

    // @ts-ignore
    return result;
  }

  solve2(input: number[]): number {
    // Idea stolen from Kurocon. Thanks mate
    const cups: Map<number, Cup> = new Map();

    const cupsInput: number[] = Array.of(
      ...input[0]
        .toString(10)
        .split("")
        .map((i) => parseInt(i, 10))
    );

    const highest = Math.max(...cupsInput) + 1;
    let startLength = cupsInput.length;
    for (let i = startLength; i < 1000000; i++) {
      cupsInput.push(highest + i - startLength);
    }

    const max = cupsInput[cupsInput.length - 1];
    const startCup = new Cup(cupsInput[0]);

    cups.set(cupsInput[0], startCup);
    for (let i = 1; i < cupsInput.length; i++) {
      const cup = new Cup(cupsInput[i]);
      cups.set(cupsInput[i], cup);
      cups.get(cupsInput[i - 1]).next = cup;
    }
    cups.get(cupsInput[cupsInput.length - 1]).next = startCup;

    let currentCup = startCup;
    for (let i = 0; i < 10000000; i++) {
      const a = currentCup.next;
      const b = a.next;
      const c = b.next;
      currentCup.next = c.next;

      let destinationCupValue = currentCup.value;
      const inUse = [currentCup.value, a.value, b.value, c.value];
      while (inUse.includes(destinationCupValue)) {
        destinationCupValue = destinationCupValue - 1;
        if (destinationCupValue === 0) destinationCupValue = max;
      }
      const destinationCup = cups.get(destinationCupValue);
      const temp = destinationCup.next;
      destinationCup.next = a;
      c.next = temp;
      currentCup = currentCup.next;
    }

    const cup1 = cups.get(1);
    const a = cup1.next;
    const b = a.next;
    return a.value * b.value;
  }
}
