// import { parseLine, getResult } from '.';

const { parseLine, getResult } = require('.');

const sample = `1abc2
                pqr3stu8vwx
                a1b2c3d4e5f
                treb7uchet`;

describe('parseLine', () => {
  it('must concat digits placed first and last', () => {
    expect(parseLine('1abc2')).toBe(12);
  });
  it('must concat two digits placed in the middle of the sentence', () => {
    expect(parseLine('pqr3stu8vwx')).toBe(38);
  });
  it('must concat only the first and last digit', () => {
    expect(parseLine('a1b2c3d4e5f')).toBe(15);
  });
  it('must concat twice if only contains one number ', () => {
    expect(parseLine('treb7uchet')).toBe(77);
  });
  it('must be 0 if no number is provided ', () => {
    expect(parseLine('trebuchet')).toBe(0);
  });
});
describe('parseLine', () => {
  it('must return the sum of all line concats', () => {
    expect(getResult(sample)).toBe(142);
  });
});
