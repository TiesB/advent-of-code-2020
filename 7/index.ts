import { Day } from "../core/day";

class BagColor {
  public content: { count: number; color: BagColor }[] = [];

  constructor(public name: string) {}

  public canContain(colorName: string): boolean {
    return (
      this.name === colorName ||
      !!this.content.find((c) => c.count > 0 && c.color.canContain(colorName))
    );
  }

  public addContent(count: number, color: BagColor): void {
    this.content.push({ count, color });
  }

  public getCount(): number {
    return (
      1 + this.content.reduce((a, b) => a + b.count * b.color.getCount(), 0)
    );
  }
}

export default class Day7 implements Day<BagColor> {
  private colors: BagColor[] = [];

  parseLine = (line: string): BagColor => {
    if (!line) return undefined;
    const colorName = /(\w+ \w+) bags contain/.exec(line)[1];
    let color = this.colors.find((c) => c.name === colorName);
    if (!color) {
      color = new BagColor(colorName);
      this.colors.push(color);
    }
    const regex = RegExp(/(\d) (\w+ \w+) bags?[,.]/, "g");
    let match;
    while ((match = regex.exec(line)) !== null) {
      const count = parseInt(match[1], 10);
      const c2Name = match[2];
      let c2 = this.colors.find((c) => c.name === c2Name);
      if (!c2) {
        c2 = new BagColor(c2Name);
        this.colors.push(c2);
      }
      color.addContent(count, c2);
    }

    return color;
  };

  filterInput(input: BagColor[]): BagColor[] {
    return input.filter((i) => !!i);
  }

  solve1(input: BagColor[]): number {
    return input.filter((c) => c.canContain("shiny gold")).length - 1;
  }

  solve2(input: BagColor[]): number {
    const shinyGold = input.find((c) => c.name === "shiny gold");
    return shinyGold.getCount() - 1;
  }
}
