const { findAdjacents, getResult } = require('.');
const fs = require('node:fs');

describe('findAdjacents', () => {
  it('must return previous number', () => {
    expect(findAdjacents(['..35#.633.'], 4, 0)).toStrictEqual([35]);
  });
  it('must return next number', () => {
    expect(findAdjacents(['..35.#633.'], 5, 0)).toStrictEqual([633]);
  });
  it('must return previous and next', () => {
    expect(findAdjacents(['..35#633..'], 4, 0)).toStrictEqual([35, 633]);
  });
  it('must return number if current index is one', () => {
    expect(findAdjacents(['..35633..'], 4, 0)).toStrictEqual([35633]);
    expect(findAdjacents(['....35633..'], 4, 0)).toStrictEqual([35633]);
    expect(findAdjacents(['35633....'], 4, 0)).toStrictEqual([35633]);
  });
});

describe('getResult', () => {
  let data;
  beforeAll(() => {
    data = fs
      .readFileSync(`${__dirname}/inputSample.txt`, 'utf8')
      .toString()
      .split('\r\n');
  });
  it('must return previous number', () => {
    expect(getResult(data)).toStrictEqual(4361);
  });
});
