import { Day } from "../core/day";

type Line = boolean[];

type Point = { x: number; y: number; z: number; w: number };

type Space = boolean[][][][];

function getNeighbors(space: Space, point: Point): boolean[] {
  const result: boolean[] = [];
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dz = -1; dz <= 1; dz++) {
        for (let dw = -1; dw <= 1; dw++) {
          if (dx === 0 && dy === 0 && dz === 0 && dw === 0) continue;

          const x = point.x + dx,
            y = point.y + dy,
            z = point.z + dz,
            w = point.w + dw;

          const active =
            x >= 0 &&
            x < space[0][0][0].length &&
            y >= 0 &&
            y < space[0][0].length &&
            z >= 0 &&
            z < space[0].length &&
            w >= 0 &&
            w < space.length
              ? space[w][z][y][x]
              : false;
          result.push(active);
        }
      }
    }
  }
  return result;
}

function getNrActiveNeighbors(space: Space, point: Point): number {
  return getNeighbors(space, point).reduce((a, b) => a + (b ? 1 : 0), 0);
}

function getNewValue(
  space: Space,
  point: Point,
  currentlyActive: boolean
): boolean {
  const an = getNrActiveNeighbors(space, point);

  if (currentlyActive && an !== 2 && an !== 3) {
    return false;
  } else if (!currentlyActive && an === 3) {
    return true;
  } else {
    return currentlyActive;
  }
}

function iterate(space: Space): Space {
  const newSpace: Space = [];

  for (const hyper of space) {
    hyper.unshift([]);
    hyper.push([]);
    for (let i = 0; i < hyper[1].length; i++) {
      hyper[0].push([]);
      hyper[hyper.length - 1].push([]);
    }
    for (const plane of hyper) {
      for (const row of plane) {
        row.unshift(false);
        row.push(false);
      }
      plane.unshift([]);
      plane.push([]);
      for (let i = 0; i < plane[1].length; i++) {
        plane[0].push(false);
        plane[plane.length - 1].push(false);
      }
    }
  }

  // Add planes
  space.unshift([]);
  space.push([]);

  // Fill new planes with new rows
  for (let i = 0; i < space[1].length; i++) {
    space[0].push([]);
    space[space.length - 1].push([]);
    for (let j = 0; j < space[1][1].length; j++) {
      space[0][i].push([]);
      space[space.length - 1][i].push([]);
      for (let k = 0; k < space[1][1][1].length; k++) {
        space[0][i][j].push(false);
        space[space.length - 1][i][j].push(false);
      }
    }
  }

  for (let w = 0; w < space.length; w++) {
    newSpace.push([]);
    for (let z = 0; z < space[0].length; z++) {
      newSpace[w].push([]);
      for (let y = 0; y < space[0][0].length; y++) {
        newSpace[w][z].push([]);
        for (let x = 0; x < space[0][0][0].length; x++) {
          newSpace[w][z][y].push(
            getNewValue(space, { x, y, z, w }, space[w][z][y][x])
          );
        }
      }
    }
  }

  return newSpace;
}

function printSpace(space: Space): void {
  for (let w = 0; w < space.length; w++) {
    console.log(`w=${w}`);
    for (let z = 0; z < space[w].length; z++) {
      let plane = space[w][z];
      console.log(`z=${z}`);
      for (let i1 = 0; i1 < plane.length; i1++) {
        let row = plane[i1];
        console.log(`y=${i1}`);
        let line = "";
        for (const value of row) {
          line += value ? "#" : ".";
        }
        console.log(line);
      }
      console.log();
    }
    console.log();
  }
}

export default class Day17 implements Day<Line> {
  parseLine(line: string): Line {
    if (!line) return undefined;
    return line.split("").map((c) => c === "#");
  }

  filterInput(input: Line[]): Line[] {
    return input.filter((i) => !!i);
  }

  solve2(input: Line[]): number {
    let space: Space = [[[]]];

    for (const line of input) {
      space[0][0].push(line);
    }

    printSpace(space);
    for (let i = 1; i <= 6; i++) {
      space = iterate(space);
    }

    let sumActive = 0;
    for (const hyper of space) {
      for (const plane of hyper) {
        for (const row of plane) {
          for (const value of row) {
            sumActive += value ? 1 : 0;
          }
        }
      }
    }

    return sumActive;
  }

  solve1(input: Line[]): number {
    return -1;
  }
}
