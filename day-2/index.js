const fs = require('node:fs');

const numberRecord = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function parseLine(arg) {
  const argTrimmed = arg.trim();

  const numbers = [...argTrimmed]
    .map((char, index) => {
      if (!isNaN(char)) return char;
      for (let charCount = 3; charCount <= 5; charCount++) {
        const substr = argTrimmed.substring(index, index + charCount);
        if (numberRecord[substr]) return numberRecord[substr];
      }
    })
    .filter((char) => char);
  const resultString = `${numbers[0]}${numbers[numbers.length - 1]}`;
  return isNaN(resultString) ? 0 : Number(resultString);
}

function getResult(arg) {
  return arg.split('\n').reduce((acc, curr) => {
    return acc + parseLine(curr);
  }, 0);
}

const data = fs.readFileSync(`${__dirname}/input.txt`).toString();
console.log(getResult(data));

module.exports = {
  parseLine,
  getResult,
};
