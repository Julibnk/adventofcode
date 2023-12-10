const fs = require('node:fs');

const findAdjacents = (line, x) => {
  //Same line
  let adjacents = [];
  const previousX = x - 1;
  const nextX = x + 1;
  const current = line[x];
  const previous = line[previousX];
  const next = line[nextX];
  let foundPrevious;
  let foundNext;

  if (!isNaN(previous)) {
    foundPrevious = findNumber(line, previous, previousX, true);
  }

  if (!isNaN(next)) {
    foundNext = findNumber(line, next, nextX, false);
  }

  if (!isNaN(current)) {
    const number = `${foundPrevious ?? ''}${current}${foundNext ?? ''}`;
    adjacents.push(Number(number));
  } else {
    foundPrevious && adjacents.push(Number(foundPrevious));
    foundNext && adjacents.push(Number(foundNext));
  }

  return adjacents;
};

const findNumber = (line, accumulate, x, backwards) => {
  const newX = backwards ? x - 1 : x + 1;
  if (newX === -1 || newX > line.length) {
    return accumulate;
  }

  const nextCharacter = line[newX];
  if (!isNaN(nextCharacter)) {
    const newAccumulate = backwards
      ? `${nextCharacter}${accumulate}`
      : `${accumulate}${nextCharacter}`;
    return findNumber(line, newAccumulate, newX, backwards);
  }

  return accumulate;
};

const getResult = (lines) => {
  const result = new Map();
  const symbolRegExp = /([A-Za-z0-9.])/;

  for (let y = 0; y < lines.length; y++) {
    const currentSet = result.get(y) ?? new Set();
    const nextSet = result.get(y + 1) ?? new Set();
    const previousSet = result.get(y - 1) ?? new Set();
    const line = lines[y];

    for (let x = 0; x < line.length; x++) {
      const character = line[x];
      // If this character is a symbol
      if (!symbolRegExp.test(character)) {
        const adjacents = findAdjacents(line, x);
        adjacents.forEach((number) => currentSet.add(number));

        const previousLine = lines[y - 1];
        // Check previous line
        if (previousLine) {
          const previousAdjacents = findAdjacents(previousLine, x);
          previousAdjacents.forEach((number) => previousSet.add(number));
        }

        const nextLine = lines[y + 1];
        // Check next line
        if (nextLine) {
          const nextAdjacents = findAdjacents(nextLine, x);
          nextAdjacents.forEach((number) => nextSet.add(number));
        }
      }
      result.set(y, currentSet);
      result.set(y + 1, nextSet);
      result.set(y - 1, previousSet);
    }
  }

  const allSetArray = [...result.values()];
  const total = allSetArray.reduce((acc, set) => {
    const setTotal = [...set.values()].reduce((acc2, current) => {
      return acc2 + current;
    }, 0);
    return acc + setTotal;
  }, 0);

  return total;
};

const data = fs
  .readFileSync(`${__dirname}/input.txt`, 'utf8')
  .toString()
  .split('\r\n');

console.log(getResult(data));

// const a = [
//   '...........826...949...120...985..&....................*.......................462.../......*.........*.......358..932..599.479*............',
//   '............../.....%..*......%...............151.304..931..471.......601.....*............765........805....%..................149...345...',
// ];

// console.log(getResult(a));

module.exports = {
  findAdjacents,
  getResult,
};
