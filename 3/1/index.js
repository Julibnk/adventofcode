const fs = require('node:fs');

const findAdjacents = (input, x, y) => {
  //Same line
  let adjacents = [];
  const previousX = x - 1;
  const nextX = x + 1;
  const current = input[y][x];
  const previous = input[y][previousX];
  const next = input[y][nextX];
  let foundPrevious;
  let foundNext;

  if (!isNaN(previous)) {
    foundPrevious = findNumber(input, previous, previousX, y, true);
  }

  if (!isNaN(next)) {
    foundNext = findNumber(input, next, nextX, y, false);
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

const findNumber = (input, accumulate, x, y, backwards) => {
  const newX = backwards ? x - 1 : x + 1;
  if (x === -1 || x > input[y].length) {
    return accumulate;
  }

  const nextCharacter = input[y][newX];
  if (!isNaN(nextCharacter)) {
    const newAccumulate = backwards
      ? `${nextCharacter}${accumulate}`
      : `${accumulate}${nextCharacter}`;
    return findNumber(input, newAccumulate, newX, y, backwards);
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
        const adjacents = findAdjacents(line, x, y);
        adjacents.length > 0 && currentSet.add(adjacents);

        // Check previous line
        if (y - 1 >= 0) {
          const previousAdjacents = findAdjacents(line, x, y - 1);
          previousAdjacents.length > 0 && previousSet.add(previousAdjacents);
        }

        // Check next line
        if (y + 1 < lines.length) {
          const nextAdjacents = findAdjacents(line, x, y + 1);
          nextAdjacents.length > 0 && nextSet.add(nextAdjacents);
        }
      }
      result.set(y, currentSet);
      result.set(y + 1, nextSet);
      result.set(y - 1, previousSet);
    }
  }

  const total = result.values().flatMap((set) => {
    return set.entries.reduce((a, b) => a + b);
  });

  return total;
};

// const data = fs.readFileSync(`${__dirname}/inputSample.txt`, 'utf8').toString();
// console.log(getResult(data, cubes));

module.exports = {
  findAdjacents,
  getResult,
};
