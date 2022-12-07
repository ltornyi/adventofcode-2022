import { readInputFile } from "./lib.mjs";

//each line is a pair of intervals, separated by a comma
//example line: 2-4,4-8
const parseLine = (line) => {
  const ints = line.split(',');
  return {
    interval1: ints[0].split('-').map(n => parseInt(n)),
    interval2: ints[1].split('-').map(n => parseInt(n))
  }
}

const intervalContains = (interval1, interval2) =>
  interval1[0] <= interval2[0] && interval1[1] >= interval2[1]

const oneContainsOther = (interval1, interval2) => 
  intervalContains(interval1, interval2) || intervalContains(interval2, interval1)

//question1: In how many pairs does one range fully contain the other?
const question1 = () => {
  const input = readInputFile('./04input.txt');
  const count = input
    .map(line => parseLine(line))
    .filter(elem => oneContainsOther(elem.interval1, elem.interval2))
    .length;
  console.log('Answer1:', count);
}

//question2: In how many pairs do the ranges overlap?
const overlap = (interval1, interval2) => 
  (interval2[0] <= interval1[0] && interval1[0] <= interval2[1]) ||
  (interval1[0] <= interval2[0] && interval2[0] <= interval1[1]) ||
  oneContainsOther(interval1, interval2)

const question2 = () => {
  const input = readInputFile('./04input.txt');
  const count = input
    .map(line => parseLine(line))
    .filter(elem => overlap(elem.interval1, elem.interval2))
    .length;
  console.log('Answer2:', count);
}

question1();
question2();