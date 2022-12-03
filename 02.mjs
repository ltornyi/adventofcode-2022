import fs from 'fs';

const input = fs.readFileSync('./02input.txt').toString().split("\n");

const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;

const LOSE = 1;
const DRAW = 2;
const WIN = 3;

const decodeOpponentShape = (shape) => {
  if (shape === 'A') {
    return ROCK
  } else if (shape === 'B') {
    return PAPER
  }
  return SCISSORS;
}

const decodeMyShape = (shape) => {
  if (shape === 'X') {
    return ROCK
  } else if (shape === 'Y') {
    return PAPER
  }
  return SCISSORS;
}

const outcomeScore = (opponentShape, myShape) => {
  //draw
  if (opponentShape === myShape) {
    return 3
  }
  //I win
  if ((myShape - opponentShape === 1) || (myShape === ROCK && opponentShape === SCISSORS)) {
    return 6
  }
  //I lose
  return 0;
}

const myShapeScore = (shape) => {
  return shape;
}

let totalScore = 0;
for (const line of input) {
  const [oShape, mShape] = line.split(" ");
  const dOppShape = decodeOpponentShape(oShape);
  const dMyShape = decodeMyShape(mShape);
  totalScore += outcomeScore(dOppShape, dMyShape) + myShapeScore(dMyShape);
}

console.log(totalScore);

const decodeMyClueToOutcome = (clue) => {
  if (clue === 'X') {
    return LOSE;
  } else if (clue === 'Y') {
    return DRAW;
  }
  return WIN;
}

const decideMyShape = (oppShape, outcome) => {
  if (outcome === LOSE) {
    if (oppShape === ROCK) {
      return SCISSORS;
    } else if (oppShape === PAPER) {
      return ROCK;
    }
    return PAPER;
  } else if (outcome === WIN) {
    if (oppShape === ROCK) {
      return PAPER;
    } else if (oppShape === PAPER) {
      return SCISSORS;
    }
    return ROCK;
  }
  return oppShape;
}

totalScore = 0;
for (const line of input) {
  const [oShape, myClue] = line.split(" ");
  const dOppShape = decodeOpponentShape(oShape);
  const outcome = decodeMyClueToOutcome(myClue);
  const dMyShape = decideMyShape(dOppShape, outcome);
  totalScore += outcomeScore(dOppShape, dMyShape) + myShapeScore(dMyShape);
}
console.log(totalScore);