import { equalTest, readInputFile } from "../libs/lib"
import { MonkeyBusiness } from "./MonkeyBusiness";

const example1Tests = () => {
  const input = readInputFile('./example1.txt');
  const monkeyBusiness = new MonkeyBusiness(input, true);
  equalTest('monkey 0 starting with 2 items', monkeyBusiness.monkeys[0].items?.length, 2)
  equalTest('monkey 0 starting item 0', monkeyBusiness.monkeys[0].items[0], 79)
  equalTest('monkey 0 starting item 1', monkeyBusiness.monkeys[0].items[1], 98)
  equalTest('monkey 0 operation', monkeyBusiness.monkeys[0].operation ? monkeyBusiness.monkeys[0].operation(5): undefined, 5 * 19)
  equalTest('monkey 0 divisible test', monkeyBusiness.monkeys[0].divisibleByTest, 23)
  equalTest('monkey 2 operation', monkeyBusiness.monkeys[2].operation ? monkeyBusiness.monkeys[2].operation(4): undefined, 4 * 4)

  monkeyBusiness.executeRound();
  equalTest('monkey 0 after round 1 has 4 items', monkeyBusiness.monkeys[0].items.length, 4)
  equalTest('monkey 0 after round 1, item 0', monkeyBusiness.monkeys[0].items[0], 20)
  equalTest('monkey 0 after round 1, item 1', monkeyBusiness.monkeys[0].items[1], 23)
  equalTest('monkey 0 after round 1, item 2', monkeyBusiness.monkeys[0].items[2], 27)
  equalTest('monkey 0 after round 1, item 3', monkeyBusiness.monkeys[0].items[3], 26)
  equalTest('monkey 1 after round 1 has 6 items', monkeyBusiness.monkeys[1].items.length, 6)
  equalTest('monkey 1 after round 1, item 0', monkeyBusiness.monkeys[1].items[0], 2080)
  equalTest('monkey 1 after round 1, item 5', monkeyBusiness.monkeys[1].items[5], 1046)
  equalTest('monkey 2 after round 1 has 0 items', monkeyBusiness.monkeys[2].items.length, 0)
  equalTest('monkey 3 after round 1 has 0 items', monkeyBusiness.monkeys[3].items.length, 0)

  monkeyBusiness.executeRound();
  equalTest('monkey 0 after round 2 has 5 items', monkeyBusiness.monkeys[0].items.length, 5)
  equalTest('monkey 1 after round 2 has 5 items', monkeyBusiness.monkeys[1].items.length, 5)
  equalTest('monkey 2 after round 2 has 0 items', monkeyBusiness.monkeys[2].items.length, 0)
  equalTest('monkey 3 after round 2 has 0 items', monkeyBusiness.monkeys[3].items.length, 0)

  const mb2 = new MonkeyBusiness(input, true);
  for (let i=0; i<20; i++) {
    mb2.executeRound();
  }
  equalTest('Level of monkey business after 20 rounds', mb2.level, 10605);
}

example1Tests();

const question1 = () => {
  const input = readInputFile('./input.txt');
  const monkeyBusiness = new MonkeyBusiness(input, true);
  for (let i=0; i<20; i++) {
    monkeyBusiness.executeRound();
  }
  console.log('Answer 1:', monkeyBusiness.level);
}

question1();

const example1Tests2 = () => {
  const input = readInputFile('./example1.txt');
  const monkeyBusiness = new MonkeyBusiness(input, false);

  monkeyBusiness.executeRound();
  equalTest('After round 1 monkey 0 inspections', monkeyBusiness.monkeys[0].inspectNumber, 2);
  equalTest('After round 1 monkey 1 inspections', monkeyBusiness.monkeys[1].inspectNumber, 4);
  equalTest('After round 1 monkey 2 inspections', monkeyBusiness.monkeys[2].inspectNumber, 3);
  equalTest('After round 1 monkey 3 inspections', monkeyBusiness.monkeys[3].inspectNumber, 6);
  for (let i=0; i<19; i++) {
    monkeyBusiness.executeRound();
  }
  equalTest('After round 20 monkey 0 inspections', monkeyBusiness.monkeys[0].inspectNumber, 99);
  equalTest('After round 20 monkey 1 inspections', monkeyBusiness.monkeys[1].inspectNumber, 97);
  equalTest('After round 20 monkey 2 inspections', monkeyBusiness.monkeys[2].inspectNumber, 8);
  equalTest('After round 20 monkey 3 inspections', monkeyBusiness.monkeys[3].inspectNumber, 103);


  const mk2 = new MonkeyBusiness(input, false);
  for (let i=0; i<10000; i++) {
    mk2.executeRound();
  }
  equalTest('After round 10k monkey 0 inspections', mk2.monkeys[0].inspectNumber, 52166);
  equalTest('After round 10k monkey 1 inspections', mk2.monkeys[1].inspectNumber, 47830);
  equalTest('After round 10k monkey 2 inspections', mk2.monkeys[2].inspectNumber, 1938);
  equalTest('After round 10k monkey 3 inspections', mk2.monkeys[3].inspectNumber, 52013);
}

example1Tests2();

const question2 = () => {
  const input = readInputFile('./input.txt');
  const monkeyBusiness = new MonkeyBusiness(input, false);
  for (let i=0; i<10000; i++) {
    monkeyBusiness.executeRound();
  }
  console.log('Answer 2:', monkeyBusiness.level);
}

question2();