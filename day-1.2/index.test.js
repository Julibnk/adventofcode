const { parseLine, getResult } = require('.');

const firstSample = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const secondSample = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

describe('parseLine', () => {
  describe('Parse numeric characters', () => {
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

  describe('Parse stringify characters', () => {
    it('must concat numbers written in text', () => {
      expect(parseLine('two1nine')).toBe(29);
      expect(parseLine('eightwothree')).toBe(83);
      expect(parseLine('abcone2threexyz')).toBe(13);
      expect(parseLine('xtwone3four')).toBe(24);
      expect(parseLine('4nineeightseven2')).toBe(42);
      expect(parseLine('zoneight234')).toBe(14);
      expect(parseLine('7pqrstsixteen')).toBe(76);
    });
  });
});
describe('getResult', () => {
  it('must return the sum of all line concats', () => {
    expect(getResult(firstSample)).toBe(142);
  });
  it('must return the sum of all line concats', () => {
    expect(getResult(secondSample)).toBe(281);
  });
});
