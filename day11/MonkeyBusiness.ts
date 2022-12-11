import { Monkey } from "./Monkey";

export class MonkeyBusiness {
  input: string[];
  worryIsDecreasing: boolean;
  monkeys = new Array<Monkey>();
  monkeyDivisorsProduct = 1;

  constructor(input: string[], worryIsDecreasing: boolean) {
    this.input = [...input];
    this.worryIsDecreasing = worryIsDecreasing;
    this.processInput();
  }

  processInput() {
    let inputCopy = [...this.input];
    let emptyLinePos = inputCopy.findIndex(line => line === '');
    while (emptyLinePos > 0) {
      let monkeyNotes = inputCopy.slice(0, emptyLinePos);
      inputCopy = inputCopy.slice(emptyLinePos + 1);
      const monkey = new Monkey(this.monkeys.length, monkeyNotes.slice(1));
      this.monkeyDivisorsProduct *= monkey.divisibleByTest;
      this.monkeys.push(monkey);
      emptyLinePos = inputCopy.findIndex(line => line === '');
    }
    if (inputCopy.length > 0) {
      const monkey = new Monkey(this.monkeys.length, inputCopy.slice(1));
      this.monkeyDivisorsProduct *= monkey.divisibleByTest;
      this.monkeys.push(monkey);
    }
  }

  executeRound() {
    this.monkeys.forEach(monkey => this.executeRoundMonkey(monkey))
  }

  executeRoundMonkey(monkey: Monkey) {
    while (monkey.items.length > 0) {
      monkey.inspect(this.worryIsDecreasing, this.monkeyDivisorsProduct);
      const targetMonkeyId = monkey.getTargetMonkey();
      const item = monkey.items.shift();
      this.monkeys[targetMonkeyId].items.push(item || 0);
    }
  }

  get level() {
    const inspections = this.monkeys.map(m => m.inspectNumber).sort((a,b) => b - a)
    return inspections[0] * inspections[1];
  }
}