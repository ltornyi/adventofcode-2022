import fs from 'fs';

const input = fs.readFileSync('./01input.txt').toString().split("\n");

const elfTotals = []
let sum = 0;
for (const line of input) {
  if (line === '') {
    elfTotals.push(sum);
    sum = 0;
  } else {
    sum += parseInt(line);
  }
}
elfTotals.push(sum);

//get the largest
console.log(Math.max(...elfTotals));

//get the sum of the top 3
elfTotals.sort((a, b) => b - a)
console.log(elfTotals[0] + elfTotals[1] + elfTotals[2]);