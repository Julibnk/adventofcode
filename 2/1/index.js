const fs = require('node:fs');

// console.lo(getResult(data));

const cubes = {
  red: 12,
  green: 13,
  blue: 14,
};

const getResult = (data, cubesArg) => {
  let a = 0;
  return data.split('\r\n').reduce((acc, next) => {
    const gamePoints = getGamePoints(next, cubesArg);
    return acc + gamePoints;
  }, 0);
};

//This returns the game id if possible and 0 if not posible
const getGamePoints = (gameArg, cubesArg) => {
  const [gameIdString, gameContent] = gameArg.split(':');
  const gameSets = gameContent.split(';');

  for (const gameSet of gameSets) {
    const set = createSetObject(gameSet);
    for (const [key, value] of Object.entries(set)) {
      if (value > cubesArg[key]) return 0;
    }
  }
  return Number(gameIdString.split(' ')[1]);
};

const createSetObject = (gameSet) => {
  const colorArray = gameSet.split(',').map((sameColorDices) => {
    const diceRoll = sameColorDices.trimStart().split(' ');
    return [diceRoll[1], Number(diceRoll[0])];
  });
  return Object.fromEntries(colorArray);
};

const data = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').toString();
console.log(getResult(data, cubes));

module.exports = {
  getGamePoints,
  createSetObject,
  getResult,
  cubes,
};
