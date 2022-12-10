import { Point } from "./Point";

export enum Direction {Up, Down, Left, Right};

export class RopeSpace {
  head: Point;
  knots: Point[] = [];
  tailHistory: Point[];

  constructor(numTails: number) {
    this.head = new Point(0, 0);
    for (let i=0; i < numTails; i++) {
      this.knots.push(new Point(0, 0))
    }
    this.tailHistory = [new Point(0, 0)];
  }

  get tail() {
    return this.knots[this.knots.length - 1];
  }

  moveHead(d: Direction) {
    switch (d) {
      case Direction.Up:
        this.head.y++;
        break;
      case Direction.Down:
        this.head.y--;
        break;
      case Direction.Left:
        this.head.x--;
        break;
      case Direction.Right:
        this.head.x++;
        break;
      default:
        break;
    }
    this.moveTails();
  }

  moveTail(head: Point, tail: Point) {
    const diffX = head.x - tail.x;
    const diffY = head.y - tail.y;
    if (diffX === 0) {
      //in the same column but not touching
      if (Math.abs(diffY) === 2) {
        tail.y += Math.sign(diffY);
      }
    } else if (diffY === 0) {
      //in the same row but not touching
      if (Math.abs(diffX) === 2) {
        tail.x += Math.sign(diffX);
      }
    } else if(Math.abs(diffX) === 2 || Math.abs(diffY) === 2) {
      //not in the same row and not in the same column
      //and not touching
      tail.x += Math.sign(diffX);
      tail.y += Math.sign(diffY);
    }
  }

  moveTails() {
    this.moveTail(this.head, this.knots[0]);
    for (let i=0; i<this.knots.length - 1; i++) {
      this.moveTail(this.knots[i], this.knots[i+1])
    }
    this.addTailToHistory();
  }

  addTailToHistory() {
    const wasHere = this.tailHistory.find(p => p.equals(this.tail));
    if (!wasHere) {
      this.tailHistory.push(new Point(this.tail.x, this.tail.y))
    }
  }
}