const fs = require('node:fs');

function parseLine(arg) {
  const argTrimmed = arg.trim();
  const numbers = [...argTrimmed].filter((char) => !isNaN(Number(char)));
  const resultString = `${numbers[0]}${numbers[numbers.length - 1]}`;
  const resultNumber = Number(resultString);
  return isNaN(resultNumber) ? 0 : resultNumber;
}

function getResult(arg) {
  return arg.split('\n').reduce((acc, curr) => {
    return acc + parseLine(curr);
  }, 0);
}

const data = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
console.log(getResult(data));

// parseLine('1abc2');
// console.log(
//   getResult(`1abc2
// pqr3stu8vwx
// a1b2c3d4e5f
// treb7uchet`)
// );

module.exports = {
  parseLine,
  getResult,
};
