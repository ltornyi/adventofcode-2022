export class Cell {
  x: number;
  y: number;
  cost: number;

  constructor(x: number, y: number, cost: number) {
    this.x = x;
    this.y = y;
    this.cost = cost;
  }

  setCost(cost: number) {
    this.cost = cost;
  }

  equals(c?: Cell) {
    if (!c) {
      return false;
    }
    return this.x === c.x && this.y === c.y;
  }
}