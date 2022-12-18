import { exit } from "process";
import { FifoQueue } from "../libs/lib";

export type Point = {
  x: number,
  y: number,
  z: number
}

export enum Element {
  AIR = 0,
  LAVA,
  WATER
}

export class ElementSpace {
  points: Element[][][];
  constructor(x: number, y:number, z:number, init:Element) {
    this.points = new Array(x).fill(undefined)
      .map(e => new Array(y).fill(undefined)
        .map(e => new Array(z).fill(init)
        )
      );
  }

  getDimensions() {
    return {
      x: this.points.length,
      y: this.points[0].length,
      z: this.points[0][0].length
    }
  }

  isValid(p: Point) {
    return p.x >=0 && p.x < this.points.length && p.y>=0 && p.y < this.points[0].length && p.z >=0 && p.z < this.points[0][0].length;
  }

  contains(p: Point) {
    if (this.isValid(p)) {
      return this.points[p.x][p.y][p.z]
    }
    return undefined;
  }

  fill(p: Point, e:Element) {
    if (this.isValid(p)) {
      this.points[p.x][p.y][p.z] = e;
    }
  }

  countMatchingNeighbours(p: Point, matchCallback: (e:Element|undefined) => boolean) {
    let cnt = 0;
    if (matchCallback(this.contains({x:p.x-1, y:p.y, z:p.z}))) {
      cnt++;
    }
    if (matchCallback(this.contains({x:p.x+1, y:p.y, z:p.z}))) {
      cnt++;
    }
    if (matchCallback(this.contains({x:p.x, y:p.y-1, z:p.z}))) {
      cnt++;
    }
    if (matchCallback(this.contains({x:p.x, y:p.y+1, z:p.z}))) {
      cnt++;
    }
    if (matchCallback(this.contains({x:p.x, y:p.y, z:p.z-1}))) {
      cnt++;
    }
    if (matchCallback(this.contains({x:p.x, y:p.y, z:p.z+1}))) {
      cnt++;
    }
    return cnt;
  }

  countNonLavaNeighbours(p: Point) {
    return this.countMatchingNeighbours(p, (e) => e !==Element.LAVA);
  }

  countWaterOrNoNeighbours(p: Point) {
    return this.countMatchingNeighbours(p, (e) => e === undefined || e === Element.WATER);
  }

  surfaceArea(): number {
    let faces = 0;
    const dim = this.getDimensions();
    for (let x=0; x < dim.x; x++) {
      for (let y=0; y < dim.y; y++) {
        for (let z=0; z < dim.z; z++) {
          const thisPoint = {x, y, z};
          if (this.contains(thisPoint) === Element.LAVA) {
            faces += this.countNonLavaNeighbours(thisPoint)
          }
        }
      }
    }
    return faces;
  }

  addIfAir(p:Point, arr:Point[]) {
    if (this.contains(p) === Element.AIR) {
      arr.push(p)
    }
  }

  getAirNeighbours(p:Point) {
    let n: Point[] = [];
    this.addIfAir({x:p.x-1, y:p.y, z:p.z}, n);
    this.addIfAir({x:p.x+1, y:p.y, z:p.z}, n);
    this.addIfAir({x:p.x, y:p.y-1, z:p.z}, n);
    this.addIfAir({x:p.x, y:p.y+1, z:p.z}, n);
    this.addIfAir({x:p.x, y:p.y, z:p.z-1}, n);
    this.addIfAir({x:p.x, y:p.y, z:p.z+1}, n);
    return n;
  }

  floodFillWater(sx:number, sy: number, sz: number) {
    let queue = new FifoQueue<Point>()
    let start:Point = {x:sx, y: sy, z: sz}
    this.fill(start, Element.WATER);
    queue.add(start);
    while (!queue.isEmpty()) {
      const next = queue.pop();
      if (!next) {
        continue;
      }
      this.getAirNeighbours(next).forEach(n => {
        this.fill(n, Element.WATER);
        queue.add(n)
      });
    }
  }

  externalSurfaceArea(): number {
    let faces = 0;
    const dim = this.getDimensions();
    for (let x=0; x < dim.x; x++) {
      for (let y=0; y < dim.y; y++) {
        for (let z=0; z < dim.z; z++) {
          const thisPoint = {x, y, z};
          if (this.contains(thisPoint) === Element.LAVA) {
            faces += this.countWaterOrNoNeighbours(thisPoint)
          }
        }
      }
    }
    return faces;
  }
}
