import { equalTest, readInputFile } from "../libs/lib.mjs";
const input = readInputFile('./06input.txt');

const signal = input[0];

const uniqueChars = (str) => [...new Set(str.split(''))].join('')

const firstUniqueSequenceStart = (signal, len) => {
  let start = 0;
  let uniqueStart = -1;
  while (start < signal.length - len) {
    const curr = signal.substring(start, start + len);
    if (uniqueChars(curr).length === len) {
      uniqueStart = start;
      break;
    }
    start++;
  }
  return uniqueStart
}

const examplesForQ1 = () => {
  equalTest('mjqjpqmgbljsphdztnvjfqwrcgsmlb', firstUniqueSequenceStart('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 4) + 4, 7);
  equalTest('bvwbjplbgvbhsrlpgdmjqwftvncz', firstUniqueSequenceStart('bvwbjplbgvbhsrlpgdmjqwftvncz', 4) + 4, 5);
  equalTest('nppdvjthqldpwncqszvftbrmjlhg', firstUniqueSequenceStart('nppdvjthqldpwncqszvftbrmjlhg', 4) + 4, 6);
  equalTest('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', firstUniqueSequenceStart('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 4) + 4, 10);
  equalTest('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', firstUniqueSequenceStart('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 4) + 4, 11);
}

const question1 = () => console.log(firstUniqueSequenceStart(signal, 4) + 4)

const examplesForQ2 = () => {
  equalTest('mjqjpqmgbljsphdztnvjfqwrcgsmlb', firstUniqueSequenceStart('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 14) + 14, 19);
  equalTest('bvwbjplbgvbhsrlpgdmjqwftvncz', firstUniqueSequenceStart('bvwbjplbgvbhsrlpgdmjqwftvncz', 14) + 14, 23);
  equalTest('nppdvjthqldpwncqszvftbrmjlhg', firstUniqueSequenceStart('nppdvjthqldpwncqszvftbrmjlhg', 14) + 14, 23);
  equalTest('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', firstUniqueSequenceStart('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 14) + 14, 29);
  equalTest('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', firstUniqueSequenceStart('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 14) + 14, 26);
}

const question2 = () => console.log(firstUniqueSequenceStart(signal, 14) + 14)

examplesForQ1();
examplesForQ2();
question1();
question2();