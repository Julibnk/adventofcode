const fs = require('node:fs');

//This returns the game id if possible and 0 if not posible
const getGamePower = (gameArg) => {
  const [_, gameContent] = gameArg.split(':');
  const gameSets = gameContent.split(';');
  const cubes = {
    red: 0,
    green: 0,
    blue: 0,
  };
  for (const gameSet of gameSets) {
    const set = createSetObject(gameSet);
    for (const [key, value] of Object.entries(set)) {
      if (value > cubes[key]) cubes[key] = value;
    }
  }

  return Object.values(cubes).reduce((acc, next) => acc * next);
};

const createSetObject = (gameSet) => {
  const colorArray = gameSet.split(',').map((sameColorDices) => {
    const diceRoll = sameColorDices.trimStart().split(' ');
    return [diceRoll[1], Number(diceRoll[0])];
  });
  return Object.fromEntries(colorArray);
};

const getResult = (data) => {
  let a = 0;
  return data.split('\r\n').reduce((acc, next) => {
    const gamePoints = getGamePower(next);
    return acc + gamePoints;
  }, 0);
};

const data = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').toString();
console.log(getResult(data));

module.exports = {
  // getGamePoints,
  getGamePower,
  createSetObject,
  getResult,
};
