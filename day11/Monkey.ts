export class Monkey {
  id: number;
  notes: string[];
  items: number[] = [];
  operation?: Function;
  divisibleByTest = 0;
  testTrueMonkeyId: number = -1;
  testFalseMonkeyId: number = -1;
  inspectNumber: number;

  constructor(id: number, notes: string[]) {
    this.id = id;
    this.notes = notes;
    this.parseNotes();
    this.inspectNumber = 0;
  }

  parseStartingItems(line: string) {
    const tokens = line.split(':');
    this.items = tokens[1].split(',').map(itemStr => parseInt(itemStr.trim()))
  }

  parseOperation(line: string) {
    const tokens = line.split('=');
    this.operation = (old: number) => eval(tokens[1].replace(/old/g, old.toString()))
  }

  parseDivisibleTest(line: string) {
    const tokens = line.split(' ');
    this.divisibleByTest = parseInt(tokens[tokens.length - 1]);
  }

  parseTestTrueMonkeyId(line: string) {
    const tokens = line.split(' ');
    this.testTrueMonkeyId = parseInt(tokens[tokens.length - 1]);
  }

  parseTestFalseMonkeyId(line: string) {
    const tokens = line.split(' ');
    this.testFalseMonkeyId = parseInt(tokens[tokens.length - 1]);
  }

  parseNotes() {
    this.parseStartingItems(this.notes[0]);
    this.parseOperation(this.notes[1]);
    this.parseDivisibleTest(this.notes[2]);
    this.parseTestTrueMonkeyId(this.notes[3]);
    this.parseTestFalseMonkeyId(this.notes[4]);
  }

  inspect(worryIsDecreasing: boolean, worryModulo: number) {
    if (this.items.length > 0) {
      this.inspectNumber++;
      const currentWorry = this.items[0];
      let newWorry = this.operation ? this.operation(currentWorry) : 0;
      if (worryIsDecreasing) {
        newWorry = Math.floor(newWorry / 3.0);
      }
      newWorry = newWorry % worryModulo;
      this.items[0] = newWorry;
    }
  }

  getTargetMonkey() {
    if (this.items.length > 0) {
      const currentWorry = this.items[0];
      if ((currentWorry % this.divisibleByTest) === 0) {
        return this.testTrueMonkeyId;
      }
    }
    return this.testFalseMonkeyId;
  }

}