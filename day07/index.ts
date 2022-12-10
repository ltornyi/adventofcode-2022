import { equalTest, readInputFile } from "../libs/lib";
import { Directory } from "./Directory";

const CD = 'cd';
const LS = 'ls';
const SPACE = ' ';
const ROOT = '/';
const PARENT = '..';
const DOLLAR = '$';

const executeChangeDir = (dirName: string, currentDir: Directory, rootDir: Directory): Directory => {
  let newCurrentDir: Directory;
  switch (dirName) {
    case ROOT:
      newCurrentDir = rootDir;
      break;
    case PARENT:
      newCurrentDir = currentDir.parent ? currentDir.parent : rootDir;
      break;
    default:
      newCurrentDir = currentDir.findSubdir(dirName);
  }
  return newCurrentDir;
}

const processCommand = (cmd: string, currentDir: Directory, rootDir: Directory): Directory => {
  const tokens = cmd.split(SPACE);
  let newCurrentDir = currentDir;
  switch (tokens[0]) {
    case CD:
      newCurrentDir = executeChangeDir(tokens[1], currentDir, rootDir);
      break;
    case LS:
      break;
    default:
      break;
  }
  return newCurrentDir;
}

const processLsOutput = (line: string, currentDir: Directory) => {
  const tokens = line.split(SPACE);
  if (tokens[0] === 'dir') {
    currentDir.addSubdir(tokens[1]);
  } else {
    currentDir.addFile(tokens[1], parseInt(tokens[0]));
  }
}

const processInput = (inp: string[], rootDir: Directory) => {
  let currentDir: Directory;
  inp.forEach(line => {
    if (line.startsWith(DOLLAR)) {
      currentDir = processCommand(line.substring(2), currentDir, rootDir)
    } else {
      processLsOutput(line, currentDir)
    }
  })
}

const dumpDirectory = (d: Directory, depth: number) => {
  console.log(' '.repeat(depth) + d.name + ' (dir)');
  d.files.forEach(file => console.log(' '.repeat(depth + 2) + file.name + ` (file, size=${file.size})`));
  d.subdirs.forEach(subdir => dumpDirectory(subdir, depth + 2));
}

function* allDirGenerator(root: Directory): Generator<Directory> {
  yield root;
  for (const subdir of root.subdirs) {
    yield* allDirGenerator(subdir)
  }
}

const additionalSpaceNeeded = (root: Directory) => Math.max(0, root.calcTotalSize() - 40000000)

const exampleQ1 = () => {
  const rootDir = new Directory('/');
  const exampleInput = readInputFile('./exampleinput.txt');
  processInput(exampleInput, rootDir);
  dumpDirectory(rootDir, 0);
  equalTest('a subdir', rootDir.findSubdir('a').calcTotalSize(), 94853);
  equalTest('d subdir', rootDir.findSubdir('d').calcTotalSize(), 24933642);
  equalTest('root', rootDir.calcTotalSize(), 48381165);

  console.log('list of all directories with a total size of at most 100000')
  const allDirs = allDirGenerator(rootDir);
  let sumTotal = 0;
  for (const dir of allDirs) {
    const thisTotal = dir.calcTotalSize();
    if (thisTotal <= 100000) {
      console.log(dir.name);
      sumTotal += thisTotal;
    }
  }
  equalTest('example answer1', sumTotal, 95437);
}

const exampleQ2 = () => {
  const rootDir = new Directory('/');
  const exampleInput = readInputFile('./exampleinput.txt');
  processInput(exampleInput, rootDir);

  let tobeDeletedSize = 0;
  const spaceNeeded = additionalSpaceNeeded(rootDir);
  equalTest('example additional space needed', spaceNeeded, 8381165);

  const allDirs2 = allDirGenerator(rootDir);
  for (const dir of allDirs2) {
    const thisTotal = dir.calcTotalSize();
    if (thisTotal >= spaceNeeded) {
      if (tobeDeletedSize === 0) {
        tobeDeletedSize = thisTotal;
      } else {
        if (thisTotal < tobeDeletedSize) {
          tobeDeletedSize = thisTotal;
        }
      }
    }
  }
  equalTest('example answer2', tobeDeletedSize, 24933642);
}

exampleQ1();
exampleQ2();

//Find all of the directories with a total size of at most 100000.
//What is the sum of the total sizes of those directories?
const question1 = () => {
  const rootDir = new Directory('/');
  const input = readInputFile('./07input.txt');
  processInput(input, rootDir);
  const allDirs = allDirGenerator(rootDir);
  let sumTotal = 0;
  for (const dir of allDirs) {
    const thisTotal = dir.calcTotalSize();
    if (thisTotal <= 100000) {
      sumTotal += thisTotal;
    }
  }
  console.log('answer1:', sumTotal);
}

question1();

//The total disk space available to the filesystem is 70000000
//To run the update, you need unused space of at least 30000000
//Find the smallest directory that, if deleted, would free up enough space on the filesystem to run the update.
//What is the total size of that directory?
const question2 = () => {
  const rootDir = new Directory('/');
  const input = readInputFile('./07input.txt');
  processInput(input, rootDir);

  let tobeDeletedSize = 0;
  const spaceNeeded = additionalSpaceNeeded(rootDir);

  const allDirs = allDirGenerator(rootDir);
  for (const dir of allDirs) {
    const thisTotal = dir.calcTotalSize();
    if (thisTotal >= spaceNeeded) {
      if (tobeDeletedSize === 0) {
        tobeDeletedSize = thisTotal;
      } else {
        if (thisTotal < tobeDeletedSize) {
          tobeDeletedSize = thisTotal;
        }
      }
    }
  }
  console.log('answer2:', tobeDeletedSize);
}
question2();