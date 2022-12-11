export class SimpleCpu {
  registerX: number;
  registerXDuringCycle: number[];

  constructor() {
    this.registerX = 1;
    this.registerXDuringCycle = [1];
  }

  tick() {
    this.registerXDuringCycle.push(this.registerX);
  }

  executeNoop() {
    //one cycle, no change in register
    this.tick();
  }

  executeAddX(value: number) {
    //two cycles, after which the register is increased
    this.tick();
    this.tick();
    this.registerX += value;
  }

  executeInstructionLine(line: string) {
    const tokens = line.split(' ');
    switch (tokens[0]) {
      case 'noop':
        this.executeNoop()
        break;
      case 'addx':
        this.executeAddX(parseInt(tokens[1]));
        break;
      default:
        break;
    }
  }

  registerXValueDuringCycle(cycle: number): number {
    return cycle < this.registerXDuringCycle.length ? this.registerXDuringCycle[cycle] : this.registerX;
  }

  signalStrength(cycle: number): number {
    return this.registerXValueDuringCycle(cycle) * cycle;
  }

  renderScreen(): string[] {
    //from cycle 1 until cycle 240
    const screen = new Array<string>();
    for (let row = 0; row < 6; row++) {
      let line = '';
      for (let col = 0; col < 40; col++) {
        const cycle = row * 40 + col + 1;
        if (Math.abs(this.registerXValueDuringCycle(cycle) - col) <= 1) {
          line += '#';
        } else {
          line += '.';
        }
      }
      screen.push(line);
    }
    return screen;
  }
}