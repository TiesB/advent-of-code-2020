import * as fs from "fs";
import { generateDay, getAllDays, printUsage } from "./core/util";

let days = getAllDays();
const inputDays = process.argv.slice(2).map((i) => {
  const r = Number(i);
  if (!Number.isInteger(r)) {
    console.error(`Argument ${i} is not a valid integer number.`);
    printUsage();
    process.exit(1);
  }
  return Number(i);
});
if (inputDays.length) {
  for (const day of inputDays) {
    if (!days.includes(day)) {
      generateDay(day);
    }
  }

  days = inputDays;
}

for (const day of days) {
  const { default: dayClass } = require(`./${day}`);
  const dayInstance = new dayClass();

  const lines = fs.readFileSync(`./${day}/input.txt`, "utf8").split("\n");
  const input = dayInstance.filterInput
    ? dayInstance.filterInput(lines.map(dayInstance.parseLine))
    : lines.map(dayInstance.parseLine);
  console.log(
    `Day ${day}:\n\t1: ${dayInstance.solve1(input)}\n\t2: ${dayInstance.solve2(
      input
    )}`
  );
}
