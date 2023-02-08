import { expect } from 'chai';
import { Combination } from '../index.js';

describe('Combination', () => {
  it('static function `Combination.choose()` works', () => {
    expect(Combination.choose(10, 5)).to.eq(252);
    expect(Combination.choose(7, 4)).to.eq(35);
    expect(Combination.choose(7, 7)).to.eq(1);
    expect(Combination.choose(7, 8)).to.eq(0);
  });

  it('combination basic iteration works', () => {
    const combination: Combination<number> = new Combination(10, 5);
    const expectedTotal = 252;

    const allCombination: Set<Set<number>> = new Set();
    for (const set of combination) {
      expect(allCombination.has(set)).to.be.false;
      allCombination.add(set);
    }

    expect(allCombination.size).to.eq(expectedTotal);

    // Check the first and last elements
    let cnt = 0;
    for (const set of allCombination) {
      if (cnt === 0) expect(set).to.eql(new Set([0, 1, 2, 3, 4]));
      if (cnt === expectedTotal - 1) expect(set).to.eql(new Set([5, 6, 7, 8, 9]));
      cnt += 1;
    }
  });

  it('edge cases of iteration work', () => {
    const com1: Combination<number> = new Combination(5, 5);

    const allCombination: Set<Set<number>> = new Set();
    for (const set of com1) {
      allCombination.add(set);
    }

    const expectedRes = new Set([new Set([0, 1, 2, 3, 4])]);
    expect(allCombination).to.eql(expectedRes);

    // To test if a constructor throw error, need to wrap it in a closure.
    //   Ref: https://stackoverflow.com/questions/30176093/chaijs-expect-constructor-to-throw-error
    expect(() => new Combination(5, 6)).to.throw(Error);
  });
});
