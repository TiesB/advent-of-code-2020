import { Day } from "../core/day";

type Instruction = { action: string; arg: number };
type Position = { east: number; north: number };

function moveF(i: Instruction, pos: Position, dir: number): Position {
  const d = (dir / 90) % 4;
  switch (d) {
    case 0:
      return { east: pos.east, north: pos.north + i.arg };
    case 1:
      return { east: pos.east + i.arg, north: pos.north };
    case 2:
      return { east: pos.east, north: pos.north - i.arg };
    case 3:
      return { east: pos.east - i.arg, north: pos.north };
    default:
      console.log("Unparseable direction", i, pos, dir);
      return pos;
  }
}

function rotateWpCC(wpPos: Position, i: Instruction): Position {
  const d = (i.arg / 90) % 4;
  switch (d) {
    case 0:
      return wpPos;
    case 3:
      return { east: wpPos.north, north: -wpPos.east };
    case 2:
      return { east: -wpPos.east, north: -wpPos.north };
    case 1:
      return { east: -wpPos.north, north: wpPos.east };
    default:
      console.log("Unparseable direction", i, wpPos);
      return wpPos;
  }
}

function rotateWpC(wpPos: Position, i: Instruction): Position {
  const d = (i.arg / 90) % 4;
  switch (d) {
    case 0:
      return wpPos;
    case 1:
      return { east: wpPos.north, north: -wpPos.east };
    case 2:
      return { east: -wpPos.east, north: -wpPos.north };
    case 3:
      return { east: -wpPos.north, north: wpPos.east };
    default:
      console.log("Unparseable direction", i, wpPos);
      return wpPos;
  }
}

export default class Day12 implements Day<Instruction> {
  parseLine(line: string): Instruction {
    if (!line) return undefined;

    return {
      action: line.substring(0, 1),
      arg: parseInt(line.substring(1), 10),
    };
  }

  filterInput(input: Instruction[]): Instruction[] {
    return input.filter((i) => !!i);
  }

  solve1(input: Instruction[]): number {
    let pos = { north: 0, east: 0 };
    let dir = 90;

    for (const i of input) {
      switch (i.action) {
        case "N":
          pos = { north: pos.north + i.arg, east: pos.east };
          break;
        case "S":
          pos = { north: pos.north - i.arg, east: pos.east };
          break;
        case "E":
          pos = { north: pos.north, east: pos.east + i.arg };
          break;
        case "W":
          pos = { north: pos.north, east: pos.east - i.arg };
          break;
        case "L":
          dir -= i.arg;
          while (dir < 0) dir += 360;
          break;
        case "R":
          dir += i.arg;
          break;
        case "F":
          pos = moveF(i, pos, dir);
          break;
        default:
          console.log("Unknown instruction", i);
      }
      // console.log(i, pos, dir);
    }
    return Math.abs(pos.north) + Math.abs(pos.east);
  }

  solve2(input: Instruction[]): number {
    console.log(input.filter((i) => i.action === "R").map((i) => i.arg));
    let shipPos = { north: 0, east: 0 };
    let wpPos = { north: 1, east: 10 };

    for (const i of input) {
      switch (i.action) {
        case "N":
          wpPos = { north: wpPos.north + i.arg, east: wpPos.east };
          break;
        case "S":
          wpPos = { north: wpPos.north - i.arg, east: wpPos.east };
          break;
        case "E":
          wpPos = { north: wpPos.north, east: wpPos.east + i.arg };
          break;
        case "W":
          wpPos = { north: wpPos.north, east: wpPos.east - i.arg };
          break;
        case "L":
          wpPos = rotateWpCC(wpPos, i);
          break;
        case "R":
          wpPos = rotateWpC(wpPos, i);
          break;
        case "F":
          shipPos = {
            north: shipPos.north + i.arg * wpPos.north,
            east: shipPos.east + i.arg * wpPos.east,
          };
          break;
        default:
          console.log("Unknown instruction", i);
      }
      // console.log(i, shipPos, wpPos);
    }
    return Math.abs(shipPos.north) + Math.abs(shipPos.east);
  }
}
