import * as fs from "fs";

export function getAllDays(): number[] {
  const dir = fs.readdirSync(".");
  return dir.filter((d) => Number.isInteger(Number(d))).map((d) => Number(d));
}

export function generateDay(day: number): void {
  fs.mkdirSync(`./${day}`);
  fs.writeFileSync(`./${day}/input.txt`, "");
  const template = fs.readFileSync("./core/_template.ts.txt", "utf-8");
  const output = template.replace("__day__", String(day));
  fs.writeFileSync(`./${day}/index.ts`, output);
}

export function printUsage(): void {
  console.log("Usage: ts-node index.ts [day] ...");
}
