import { equalTest, readInputFile } from "../libs/lib"
import { TreeMap } from "./TreeMap";

const exampleTests1 = () => {
  const input = readInputFile('./exampleinput.txt');
  const forest = new TreeMap();
  input.forEach(line => forest.addLine(line));

  equalTest('0,0 is visible', forest.isVisible(0,0), true);
  equalTest('1,1 is visible', forest.isVisible(1,1), true);
  equalTest('2,1 is visible', forest.isVisible(2,1), true);
  equalTest('3,1 is not visible', forest.isVisible(3,1), false);
  equalTest('1,2 is visible', forest.isVisible(1,2), true);
  equalTest('1,2 is visible from right', forest.isVisibleFromRight(1,2), true);
  equalTest('2,3 is visible', forest.isVisible(2,3), true);

  equalTest('total visible', forest.totalVisible, 21);
}

exampleTests1();

const question1 = () => {
  const input = readInputFile('./input.txt');
  const forest = new TreeMap();
  input.forEach(line => forest.addLine(line));

  console.log('answer 1:', forest.totalVisible);
}

question1();

const exampleTests2 = () => {
  const input = readInputFile('./exampleinput.txt');
  const forest = new TreeMap();
  input.forEach(line => forest.addLine(line));

  equalTest('2,1 scenic score', forest.scenicScore(2, 1), 4);
  equalTest('2,3 scenic score', forest.scenicScore(2, 3), 8);
  equalTest('2,3 scenic score up', forest.scenicScoreUp(2, 3), 2);
  equalTest('2,3 scenic score left', forest.scenicScoreLeft(2, 3), 2);
  equalTest('2,3 scenic score down', forest.scenicScoreDown(2, 3), 1);
  equalTest('2,3 scenic score right', forest.scenicScoreRight(2, 3), 2);
}

exampleTests2()

const question2 = () => {
  const input = readInputFile('./input.txt');
  const forest = new TreeMap();
  input.forEach(line => forest.addLine(line));

  let maxScore = 0;
  for (let i=0; i <= forest.maxX; i++) {
    for (let j=0; j <= forest.maxY; j++) {
      const thisScore = forest.scenicScore(i,j);
      if (thisScore > maxScore) {
        maxScore = thisScore;
      }
    }
  }
  console.log('answer 2:', maxScore);
}

question2();