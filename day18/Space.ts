export class Space {
  points: boolean[][][];
  constructor(x: number, y:number, z:number) {
    const zz: boolean[] = new Array(z).fill(false);
    this.points = new Array(x).fill(undefined)
      .map(e => new Array(y).fill(undefined).map(e => [...zz]));
  }

  getDimensions() {
    return {
      x: this.points.length,
      y: this.points[0].length,
      z: this.points[0][0].length
    }
  }

  isValid(x: number, y:number, z: number) {
    return x >=0 && x < this.points.length && y>=0 && y < this.points[0].length && z >=0 && z < this.points[0][0].length;
  }

  filled(x: number, y:number, z: number) {
    if (this.isValid(x, y, z)) {
      return this.points[x][y][z]
    }
    return undefined;
  }

  fill(x: number, y:number, z: number) {
    if (this.isValid(x, y, z)) {
      this.points[x][y][z] = true;
    }
  }

  clear(x: number, y:number, z: number) {
    if (this.isValid(x, y, z)) {
      this.points[x][y][z] = false;
    }
  }

  countFreeFaces(x: number, y:number, z:number) {
    let cnt = 6;
    if (this.filled(x-1, y, z)) {
      cnt--;
    }
    if (this.filled(x+1, y, z)) {
      cnt--;
    }
    if (this.filled(x, y-1, z)) {
      cnt--;
    }
    if (this.filled(x, y+1, z)) {
      cnt--;
    }
    if (this.filled(x, y, z-1)) {
      cnt--;
    }
    if (this.filled(x, y, z+1)) {
      cnt--;
    }
    return cnt;
  }

  surfaceArea(): number {
    let faces = 0;
    const dim = this.getDimensions();
    for (let x=0; x < dim.x; x++) {
      for (let y=0; y < dim.y; y++) {
        for (let z=0; z < dim.z; z++) {
          if (this.filled(x, y, z)) {
            faces += this.countFreeFaces(x, y, z)
          }
        }
      }
    }
    return faces;
  }
}