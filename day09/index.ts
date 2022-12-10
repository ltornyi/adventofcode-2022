import { equalTest, readInputFile } from "../libs/lib";
import { Direction, RopeSpace } from "./RopeSpace"

const exampleTests1 = () => {
  const space = new RopeSpace(1);
  space.moveHead(Direction.Right);
  equalTest('After R 1, head.x', space.head.x, 1);
  equalTest('After R 1, head.y', space.head.y, 0);
  equalTest('After R 1, tail.x', space.tail.x, 0);
  equalTest('After R 1, tail.y', space.tail.y, 0);
  space.moveHead(Direction.Right);
  equalTest('After R 2, head.x', space.head.x, 2);
  equalTest('After R 2, head.y', space.head.y, 0);
  equalTest('After R 2, tail.x', space.tail.x, 1);
  equalTest('After R 2, tail.y', space.tail.y, 0);
  space.moveHead(Direction.Right);
  equalTest('After R 3, head.x', space.head.x, 3);
  equalTest('After R 3, head.y', space.head.y, 0);
  equalTest('After R 3, tail.x', space.tail.x, 2);
  equalTest('After R 3, tail.y', space.tail.y, 0);
  space.moveHead(Direction.Right);
  equalTest('After R 4, head.x', space.head.x, 4);
  equalTest('After R 4, head.y', space.head.y, 0);
  equalTest('After R 4, tail.x', space.tail.x, 3);
  equalTest('After R 4, tail.y', space.tail.y, 0);
  space.moveHead(Direction.Up);
  equalTest('After U 1, head.x', space.head.x, 4);
  equalTest('After U 1, head.y', space.head.y, 1);
  equalTest('After U 1, tail.x', space.tail.x, 3);
  equalTest('After U 1, tail.y', space.tail.y, 0);
  space.moveHead(Direction.Up);
  equalTest('After U 2, head.x', space.head.x, 4);
  equalTest('After U 2, head.y', space.head.y, 2);
  equalTest('After U 2, tail.x', space.tail.x, 4);
  equalTest('After U 2, tail.y', space.tail.y, 1);
  space.moveHead(Direction.Up);
  equalTest('After U 3, head.x', space.head.x, 4);
  equalTest('After U 3, head.y', space.head.y, 3);
  equalTest('After U 3, tail.x', space.tail.x, 4);
  equalTest('After U 3, tail.y', space.tail.y, 2);
  space.moveHead(Direction.Up);
  equalTest('After U 4, head.x', space.head.x, 4);
  equalTest('After U 4, head.y', space.head.y, 4);
  equalTest('After U 4, tail.x', space.tail.x, 4);
  equalTest('After U 4, tail.y', space.tail.y, 3);
  space.moveHead(Direction.Left);
  equalTest('After L 1, head.x', space.head.x, 3);
  equalTest('After L 1, head.y', space.head.y, 4);
  equalTest('After L 1, tail.x', space.tail.x, 4);
  equalTest('After L 1, tail.y', space.tail.y, 3);
  space.moveHead(Direction.Left);
  equalTest('After L 2, head.x', space.head.x, 2);
  equalTest('After L 2, head.y', space.head.y, 4);
  equalTest('After L 2, tail.x', space.tail.x, 3);
  equalTest('After L 2, tail.y', space.tail.y, 4);
  space.moveHead(Direction.Left);
  equalTest('After L 3, head.x', space.head.x, 1);
  equalTest('After L 3, head.y', space.head.y, 4);
  equalTest('After L 3, tail.x', space.tail.x, 2);
  equalTest('After L 3, tail.y', space.tail.y, 4);
  space.moveHead(Direction.Down);
  equalTest('After D 1, head.x', space.head.x, 1);
  equalTest('After D 1, head.y', space.head.y, 3);
  equalTest('After D 1, tail.x', space.tail.x, 2);
  equalTest('After D 1, tail.y', space.tail.y, 4);
  space.moveHead(Direction.Right);
  equalTest('After R 1, head.x', space.head.x, 2);
  equalTest('After R 1, head.y', space.head.y, 3);
  equalTest('After R 1, tail.x', space.tail.x, 2);
  equalTest('After R 1, tail.y', space.tail.y, 4);
  space.moveHead(Direction.Right);
  equalTest('After R 2, head.x', space.head.x, 3);
  equalTest('After R 2, head.y', space.head.y, 3);
  equalTest('After R 2, tail.x', space.tail.x, 2);
  equalTest('After R 2, tail.y', space.tail.y, 4);
  space.moveHead(Direction.Right);
  equalTest('After R 3, head.x', space.head.x, 4);
  equalTest('After R 3, head.y', space.head.y, 3);
  equalTest('After R 3, tail.x', space.tail.x, 3);
  equalTest('After R 3, tail.y', space.tail.y, 3);
  space.moveHead(Direction.Right);
  equalTest('After R 4, head.x', space.head.x, 5);
  equalTest('After R 4, head.y', space.head.y, 3);
  equalTest('After R 4, tail.x', space.tail.x, 4);
  equalTest('After R 4, tail.y', space.tail.y, 3);
  space.moveHead(Direction.Down);
  equalTest('After D 1, head.x', space.head.x, 5);
  equalTest('After D 1, head.y', space.head.y, 2);
  equalTest('After D 1, tail.x', space.tail.x, 4);
  equalTest('After D 1, tail.y', space.tail.y, 3);
  space.moveHead(Direction.Left);
  equalTest('After L 1, head.x', space.head.x, 4);
  equalTest('After L 1, head.y', space.head.y, 2);
  equalTest('After L 1, tail.x', space.tail.x, 4);
  equalTest('After L 1, tail.y', space.tail.y, 3);
  space.moveHead(Direction.Left);
  equalTest('After L 2, head.x', space.head.x, 3);
  equalTest('After L 2, head.y', space.head.y, 2);
  equalTest('After L 2, tail.x', space.tail.x, 4);
  equalTest('After L 2, tail.y', space.tail.y, 3);
  space.moveHead(Direction.Left);
  equalTest('After L 3, head.x', space.head.x, 2);
  equalTest('After L 3, head.y', space.head.y, 2);
  equalTest('After L 3, tail.x', space.tail.x, 3);
  equalTest('After L 3, tail.y', space.tail.y, 2);
  space.moveHead(Direction.Left);
  equalTest('After L 4, head.x', space.head.x, 1);
  equalTest('After L 4, head.y', space.head.y, 2);
  equalTest('After L 4, tail.x', space.tail.x, 2);
  equalTest('After L 4, tail.y', space.tail.y, 2);
  space.moveHead(Direction.Left);
  equalTest('After L 5, head.x', space.head.x, 0);
  equalTest('After L 5, head.y', space.head.y, 2);
  equalTest('After L 5, tail.x', space.tail.x, 1);
  equalTest('After L 5, tail.y', space.tail.y, 2);
  space.moveHead(Direction.Right);
  equalTest('After R 1, head.x', space.head.x, 1);
  equalTest('After R 1, head.y', space.head.y, 2);
  equalTest('After R 1, tail.x', space.tail.x, 1);
  equalTest('After R 1, tail.y', space.tail.y, 2);
  space.moveHead(Direction.Right);
  equalTest('After R 2, head.x', space.head.x, 2);
  equalTest('After R 2, head.y', space.head.y, 2);
  equalTest('After R 2, tail.x', space.tail.x, 1);
  equalTest('After R 2, tail.y', space.tail.y, 2);
  equalTest('Number of positions tail visited', space.tailHistory.length, 13);
}

exampleTests1();

const getDirection = (dir: string) => {
  if (dir === 'D') {
    return Direction.Down;
  } else if (dir === 'U') {
    return Direction.Up;
  } else if (dir === 'L') {
    return Direction.Left;
  }
  return Direction.Right;
}

//How many positions does the tail of the rope visit at least once?
const question1 = () => {
  const space = new RopeSpace(1);
  const input = readInputFile('./input.txt');
  input.forEach(line => {
    const tokens = line.split(' ');
    const direction = getDirection(tokens[0]);
    const repeat = parseInt(tokens[1]);
    for (let i=0; i<repeat; i++) {
      space.moveHead(direction)
    }
  })
  console.log('Answer 1:',space.tailHistory.length);
}

question1();

const dumpSpace = (maxX: number, maxY: number, space: RopeSpace) => {
  console.log('')
  for (let y=maxY; y>=0; y--) {
    let line = '';
    for (let x=0; x<=maxX; x++) {
      let ch = '.';
      for (let kn=space.knots.length - 1; kn>=0; kn--) {
        if (space.knots[kn].x === x && space.knots[kn].y === y) {
          ch = (kn+1).toString();
        }
      }
      if (space.head.x === x && space.head.y === y) {
        ch = 'H';
      }
      line += ch;
    }
    console.log(line);
  }
}

const exampleTests2 = (dump: boolean) => {
  const space = new RopeSpace(9);
  const input = readInputFile('./exampleinput.txt');
  input.forEach(line => {
    if (dump) {
      console.log('== ' + line + ' ==');
    }
    const tokens = line.split(' ');
    const direction = getDirection(tokens[0]);
    const repeat = parseInt(tokens[1]);
    for (let i=0; i<repeat; i++) {
      space.moveHead(direction);
      if (dump) {
        dumpSpace(5,4,space);
      }
    }
  })
  equalTest('Number of positions tail visited in test2', space.tailHistory.length, 1);
}

exampleTests2(false);

//with 10 knots, that is with 9 knots after the head:
//How many positions does the tail of the rope visit at least once?
const question2 = () => {
  const space = new RopeSpace(9);
  const input = readInputFile('./input.txt');
  input.forEach(line => {
    const tokens = line.split(' ');
    const direction = getDirection(tokens[0]);
    const repeat = parseInt(tokens[1]);
    for (let i=0; i<repeat; i++) {
      space.moveHead(direction)
    }
  })
  console.log('Answer 2:',space.tailHistory.length);
}

question2();