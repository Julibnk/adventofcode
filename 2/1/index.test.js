const { createSetObject, getGamePoints, getResult, cubes } = require('.');
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

describe('getGamePoints', () => {
  it('must get id from game string', () => {
    expect(
      getGamePoints(
        'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
        cubes
      )
    ).toBe(1);
    expect(
      getGamePoints(
        'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
        cubes
      )
    ).toBe(2);
    expect(
      getGamePoints(
        'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
        cubes
      )
    ).toBe(0);
    expect(
      getGamePoints(
        'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
        cubes
      )
    ).toBe(0);
    expect(
      getGamePoints(
        'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
        cubes
      )
    ).toBe(5);
  });
});
describe('createSetObject', () => {
  it('must generate a object with key of each color', () => {
    expect(createSetObject('3 blue, 4 red')).toStrictEqual({ blue: 3, red: 4 });
    expect(createSetObject(' 1 red, 2 green, 6 blue')).toStrictEqual({
      red: 1,
      blue: 6,
      green: 2,
    });
    expect(createSetObject(' 2 green')).toStrictEqual({
      green: 2,
    });
  });
});
describe('getResult', () => {
  it('must sum all posible game ids', () => {
    expect(getResult(firstSample, cubes)).toBe(8);
  });
});
