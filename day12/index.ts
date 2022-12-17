import { equalTest, FifoQueue, readInputFile } from "../libs/lib"
import { Cell } from "./Cell";

type PathFindingProblem = {
  start: Cell,
  destinations: Cell[],
  grid: string[],
  stepAllowed(currentElevation: number, neighbourElevation: number): boolean
}

const processInput = (input: string[]): PathFindingProblem => {
  const START = 'S';
  const END = 'E';
  let start = new Cell(0, 0, 0);
  let destination = new Cell(0, 0, 0);
  let grid: string[] = [];
  input.forEach((line, rownum) => {
    const posS = line.indexOf(START);
    const posE = line.indexOf(END);
    grid.push(line.replace(START, 'a').replace(END, 'z'));
    if (posS !== -1) {
      start = new Cell(posS, rownum, 0);
    }
    if (posE !== -1) {
      destination = new Cell(posE, rownum, Infinity);
    }
  });
  return {
    start,
    destinations: [destination],
    grid,
    stepAllowed: (ce, ne) => ce >= ne - 1
  }
}

const dijkstra = (problem: PathFindingProblem): number => {
  let current: Cell | undefined = problem.start;
  const frontier = new FifoQueue<Cell>()
  frontier.add(current);
  const visited: Array<Cell> = [];
  while (true) {
    current = frontier.pop();
    //frontier is empty, means destination is unreachable
    if (!current) {
      return -1;
    }
    //we reached one of our destinations
    if (problem.destinations.findIndex(e => e.equals(current)) !== -1) {
      return current.cost;
    }
    visited.push(current);
    //up, right, down, left
    [ {x: current.x    , y: current.y - 1},
      {x: current.x + 1, y: current.y},
      {x: current.x    , y: current.y + 1},
      {x: current.x - 1, y: current.y}
    ].forEach(neighbor => {
      //outside grid
      if (neighbor.x < 0 || neighbor.y < 0 || neighbor.x > problem.grid[0].length - 1 || neighbor.y > problem.grid.length - 1) {
        return
      }
      const currentElevation = current ? problem.grid[current.y].charCodeAt(current.x) : Infinity;
      const neighbourElevation = problem.grid[neighbor.y].charCodeAt(neighbor.x);
      //cannot access
      if (! problem.stepAllowed(currentElevation, neighbourElevation) ) {
        return
      }
      //distance is simply 1, so cost increases by 1
      const n = new Cell(neighbor.x, neighbor.y, current ? current.cost + 1: Infinity)
      const indexInFrontier = frontier.data.findIndex(e => e.equals(n));
      const indexInVisited = visited.findIndex(e => e.equals(n))
      if (indexInVisited === -1 && indexInFrontier === -1) {
        frontier.add(n);
      } else {
        if (indexInFrontier !== -1 && frontier.data[indexInFrontier].cost > n.cost) {
          frontier.data[indexInFrontier].setCost(n.cost);
        }
      }
    })
  }
}

const exampleTests1 = () => {
  const input = readInputFile('./example1.txt');
  const processedInput = processInput(input);

  equalTest('S was replaced with a', processedInput.grid[0][0], 'a');
  equalTest('E was replaced with z', processedInput.grid[2][5], 'z');
  equalTest('StartX', processedInput.start.x, 0);
  equalTest('StartY', processedInput.start.y, 0);
  equalTest('DestinationX', processedInput.destinations[0].x, 5);
  equalTest('DestinationY', processedInput.destinations[0].y, 2);
  const solution = dijkstra(processedInput);
  equalTest('solution', solution, 31);
}

exampleTests1();

const question1 = () => {
  const input = readInputFile('./input.txt');
  const problem = processInput(input);
  const solution = dijkstra(problem);

  console.log('Answer 1:', solution);
}

question1();

const findMinSolutionBrute = (origProblem: PathFindingProblem): number => {
  let minSolution = Infinity;
  origProblem.grid.forEach((line, rownum) => {
    line.split('').forEach((char, cellnum) => {
      if (char === 'a') {
        const solution = dijkstra({
          start: new Cell(cellnum, rownum, 0),
          destinations: [new Cell(origProblem.destinations[0].x, origProblem.destinations[0].y, Infinity)],
          grid: origProblem.grid,
          stepAllowed: origProblem.stepAllowed
        })
        if (solution !== -1 && solution < minSolution) {
          minSolution = solution
        }
      }
    })
  })
  return minSolution;
}

const findMinSolution = (origProblem: PathFindingProblem): number => {
  const allACells: Cell[] = [];
  origProblem.grid.forEach((line, rownum) => {
    line.split('').forEach((char, cellnum) => {
      if (char === 'a') {
        allACells.push(new Cell(cellnum, rownum, Infinity))
      }
    })
  })
  const backwardProblem: PathFindingProblem = {
    start: new Cell(origProblem.destinations[0].x, origProblem.destinations[0].y, 0),
    destinations: allACells,
    grid: origProblem.grid,
    stepAllowed: (currentElevation, neighbourElevation) => neighbourElevation >= currentElevation - 1 
  }
  const backwardSolution = dijkstra(backwardProblem);
  return backwardSolution;
}

const exampleTests2 = () => {
  const input = readInputFile('./example1.txt');
  const origProblem = processInput(input);

  const minSolution = findMinSolutionBrute(origProblem);
  equalTest('minSolution brute force', minSolution, 29);
  const minSolution2 = findMinSolution(origProblem);
  equalTest('minSolution2', minSolution2, 29);
}

exampleTests2();

const question2brute = () => {
  const input = readInputFile('./input.txt');
  const origProblem = processInput(input);
  const minSolution = findMinSolutionBrute(origProblem);

  console.log('Answer 2 brute force:', minSolution);
}

question2brute();

const question2 = () => {
  const input = readInputFile('./input.txt');
  const origProblem = processInput(input);
  const minSolution = findMinSolution(origProblem);

  console.log('Answer 2:', minSolution);
}

question2();
