import { Day } from "../core/day";

type Food = { ingredients: string[]; allergens: string[] };

function getAllergens(foods: Food[]): Map<string, Set<string>> {
  const ingredients: Set<string> = new Set();
  const allergens: Map<string, Set<string>> = new Map();

  for (const food of foods) {
    food.ingredients.forEach((i) => ingredients.add(i));
    for (const a of food.allergens) {
      const newSet: Set<string> = new Set();
      if (allergens.has(a)) {
        const curIngredients = allergens.get(a);
        curIngredients.forEach((i) => {
          if (food.ingredients.includes(i)) newSet.add(i);
        });
      } else {
        food.ingredients.forEach((i) => newSet.add(i));
      }
      allergens.set(a, newSet);
    }
  }
  return allergens;
}

export default class Day21 implements Day<Food> {
  parseLine(line: string): Food {
    if (!line) return undefined;
    const parts = line.slice(0, line.length - 1).split("(contains");
    const ingredients = parts[0].split(" ");
    ingredients.pop();
    return { ingredients, allergens: parts[1].split(",") };
  }

  filterInput(input: Food[]): Food[] {
    return input.filter((i) => !!i);
  }

  solve1(input: Food[]): number {
    const allergens = getAllergens(input);
    const possibleAllergens: Set<string> = new Set();
    allergens.forEach((is) => {
      is.forEach((i) => possibleAllergens.add(i));
    });

    let sum = 0;
    for (const food of input) {
      for (const ingredient of food.ingredients) {
        if (!possibleAllergens.has(ingredient)) sum++;
      }
    }

    return sum;
  }

  // @ts-ignore
  solve2(input: Food[]): string {
    const allergens = getAllergens(input);
    const a2i: Map<string, string> = new Map();
    let as: string[] = [];
    allergens.forEach((is, a) => as.push(a));
    as = as.sort();

    let done = false;
    while (!done) {
      let newDone = true;
      allergens.forEach((is, a) => {
        if (is.size === 1) {
          let i;
          is.forEach((i2) => {
            i = i2;
          });
          a2i.set(a, i);
          allergens.forEach((is2, a2) => {
            if (a2 !== a) {
              is2.delete(i);
              allergens.set(a2, is2);
            }
          });
        } else {
          newDone = false;
        }
      });
      done = newDone;
    }

    return as.map((a) => a2i.get(a)).join(",");
  }
}
