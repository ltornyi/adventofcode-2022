import fs from 'fs';

const input = fs.readFileSync('./03input.txt').toString().split("\n");

//each line is one rucksack
//first half of a line is list fof items in the first compartment

const itemPriority = (item) => {
  const charCode = item.charCodeAt(0);
  if (charCode <= 90) {
    //A-Z 
    return charCode - 65 + 27
  }
  //a-z
  return charCode - 97 + 1
}

const findCommonChar = (str1, str2) => {
  for (const c1 of str1) {
    if (str2.indexOf(c1) >= 0) {
      return c1;
    }
  }
}

//find the only common item in each rucksacks compartments
//sum the priority of such common items
let totalPrio = 0;
for (const line of input) {
  const compartment1 = line.substring(0, line.length / 2);
  const compartment2 = line.substring(line.length / 2);
  const common = findCommonChar(compartment1, compartment2);
  totalPrio += itemPriority(common);
}
console.log(totalPrio);

//every group of 3 input lines is an elf group
//identify the only letter common for each group
//print the sum of these
const findCommonBadge = (l1, l2, l3) => {
  for (const c1 of l1) {
    if (l2.indexOf(c1) >= 0 && l3.indexOf(c1) >= 0) {
      return c1;
    }
  }
}

totalPrio = 0;
for (let grp = 0; grp < input.length / 3; grp++) {
  const line1 = input[grp * 3];
  const line2 = input[grp * 3 + 1];
  const line3 = input[grp * 3 + 2];
  const common = findCommonBadge(line1, line2, line3);
  totalPrio += itemPriority(common);
}
console.log(totalPrio);