import { textChangeRangeIsUnchanged } from "typescript";
import { threadId } from "worker_threads";

export class TreeMap {
  map: number[][];

  constructor() {
    this.map = [];
  }

  get maxX() {
    return this.map[0].length - 1
  }

  get maxY() {
    return this.map.length - 1
  }

  addLine(line: string) {
    this.map.push(line.split('').map(c => parseInt(c)))
  }

  isVisibleFromLeft(x: number, y: number): boolean {
    const thisHeight = this.map[y][x];
    const coveringTrees = this.map[y].filter((v, i) => i < x && v>=thisHeight);
    return coveringTrees.length === 0;
  }

  isVisibleFromRight(x: number, y: number): boolean {
    const thisHeight = this.map[y][x];
    const coveringTrees = this.map[y].filter((v, i) => i > x && v>=thisHeight);
    return coveringTrees.length === 0;
  }

  isVisibleFromTop(x: number, y: number): boolean {
    const thisHeight = this.map[y][x];
    const thisColumn = this.map.map(row => row[x]);
    const coveringTrees = thisColumn.filter((v, i) => i < y && v>=thisHeight)
    return coveringTrees.length === 0;
  }

  isVisibleFromBottom(x: number, y: number): boolean {
    const thisHeight = this.map[y][x];
    const thisColumn = this.map.map(row => row[x]);
    const coveringTrees = thisColumn.filter((v, i) => i > y && v>=thisHeight)
    return coveringTrees.length === 0;
  }

  isVisible(x: number, y: number): boolean {
    if (x === 0 || x === this.maxX || y === 0 || y === this.maxY) {
      return true;
    }
    return this.isVisibleFromLeft(x,y) || this.isVisibleFromRight(x,y) || this.isVisibleFromTop(x, y) || this.isVisibleFromBottom(x, y);
  }

  get totalVisible() {
    let cnt = 0;
    for (let i=0; i <= this.maxX; i++) {
      for (let j=0; j <= this.maxY; j++) {
        if (this.isVisible(i,j)) {
          cnt++
        }
      }
    }
    return cnt;
  }

  scenicScoreLeft(x: number, y: number): number {
    const thisHeight = this.map[y][x];
    let score = 0;
    let i = x - 1;
    let blocked = false;
    while (i >= 0 && !blocked) {
      score++;
      if (this.map[y][i] >= thisHeight) {
        blocked = true;
      }
      i--;
    }
    return score;
  }

  scenicScoreRight(x: number, y: number): number {
    const thisHeight = this.map[y][x];
    let score = 0;
    let i = x + 1;
    let blocked = false;
    while (i <= this.maxX && !blocked) {
      score++;
      if (this.map[y][i] >= thisHeight) {
        blocked = true;
      }
      i++;
    }
    return score;
  }

  scenicScoreUp(x: number, y: number): number {
    const thisHeight = this.map[y][x];
    let score = 0;
    let j = y - 1;
    let blocked = false;
    while (j >=0 && !blocked) {
      score++;
      if (this.map[j][x] >= thisHeight) {
        blocked = true;
      }
      j--;
    }
    return score;
  }

  scenicScoreDown(x: number, y: number): number {
    const thisHeight = this.map[y][x];
    let score = 0;
    let j = y + 1;
    let blocked = false;
    while (j <= this.maxY && !blocked) {
      score++;
      if (this.map[j][x] >= thisHeight) {
        blocked = true;
      }
      j++;
    }
    return score;
  }

  scenicScore(x: number, y: number): number {
    return this.scenicScoreLeft(x, y) * this.scenicScoreRight(x, y) * this.scenicScoreUp(x, y) * this.scenicScoreDown(x, y)
  }
}