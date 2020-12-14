import * as fs from "fs";
import axios from "axios";

export function getAllDays(): number[] {
  const dir = fs.readdirSync(".");
  return dir.filter((d) => Number.isInteger(Number(d))).map((d) => Number(d));
}

export async function generateDay(day: number): Promise<void> {
  fs.mkdirSync(`./${day}`);
  fs.writeFileSync(
    `./${day}/input.txt`,
    (
      await axios.get(`https://adventofcode.com/2020/day/${day}/input`, {
        headers: {
          Cookie: `session=${process.env.SESSION_COOKIE}`,
        },
      })
    ).data
  );
  const template = fs.readFileSync("./core/_template.ts.txt", "utf-8");
  const output = template.replace("__day__", String(day));
  fs.writeFileSync(`./${day}/index.ts`, output);
}

export function printUsage(): void {
  console.log("Usage: ts-node index.ts [day] ...");
}
