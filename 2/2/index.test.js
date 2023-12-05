const { getGamePower, getResult } = require('.');
const fs = require('node:fs');

// const firstSample = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const firstSample = fs
  .readFileSync(`${__dirname}/inputSample.txt`, 'utf8')
  .toString();
// console.log(getResult(data, cubes));

describe('getGamePower', () => {
  it('must get id from game string', () => {
    expect(
      getGamePower('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green')
    ).toBe(48);
    expect(
      getGamePower(
        'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue'
      )
    ).toBe(12);
    expect(
      getGamePower(
        'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red'
      )
    ).toBe(1560);
    expect(
      getGamePower(
        'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red'
      )
    ).toBe(630);
    expect(
      getGamePower('Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green')
    ).toBe(36);
  });
});

describe('getResult', () => {
  it('must power of all games', () => {
    expect(getResult(firstSample)).toBe(2286);
  });
});
