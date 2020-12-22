import { Day } from "../core/day";

function playGame(
  p0deck: number[],
  p1deck: number[]
): { winner: number; p0deck: number[]; p1deck: number[] } {
  const decks: Set<string> = new Set();
  while (p0deck.length && p1deck.length) {
    const deckString =
      p0deck.map((n) => n.toString(36)).join("") +
      "," +
      p1deck.map((n) => n.toString(36)).join("");
    if (decks.has(deckString)) {
      return { winner: 0, p0deck, p1deck };
    } else {
      decks.add(deckString);
    }
    const p0card = p0deck.shift();
    const p1card = p1deck.shift();
    let winner = 0;
    if (p0deck.length >= p0card && p1deck.length >= p1card) {
      winner = playGame(
        Array.of(...p0deck.slice(0, p0card)),
        Array.of(...p1deck.slice(0, p1card))
      ).winner;
    } else {
      winner = p0card > p1card ? 0 : 1;
    }
    if (winner === 0) {
      p0deck.push(p0card, p1card);
    } else {
      p1deck.push(p1card, p0card);
    }
  }
  return { winner: p0deck.length > p1deck.length ? 0 : 1, p0deck, p1deck };
}

export default class Day22 implements Day<number[]> {
  splitCharacter = "\n\n";

  parseLine(line: string): number[] {
    return line
      .split("\n")
      .filter((l) => !l.startsWith("Player") && !!l)
      .map((l) => parseInt(l, 10));
  }

  filterInput(input: number[][]): number[][] {
    return input;
  }

  solve1(input: number[][]): number {
    const p0deck = Array.of(...input[0]);
    const p1deck = Array.of(...input[1]);
    while (p0deck.length && p1deck.length) {
      const p0card = p0deck.shift();
      const p1card = p1deck.shift();
      if (p0card > p1card) {
        p0deck.push(p0card, p1card);
      } else {
        p1deck.push(p1card, p0card);
      }
    }
    const winner = p0deck.length ? p0deck : p1deck;
    return winner
      .reverse()
      .reduce((res, value, idx) => res + value * (idx + 1), 0);
  }

  solve2(input: number[][]): number {
    const p0deck = Array.of(...input[0]);
    const p1deck = Array.of(...input[1]);

    const result = playGame(p0deck, p1deck);

    const winner = result.winner === 0 ? result.p0deck : result.p1deck;
    return winner
      .reverse()
      .reduce((res, value, idx) => res + value * (idx + 1), 0);
  }
}
