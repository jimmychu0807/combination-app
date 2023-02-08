import { expect } from 'chai';
import { Combination } from '../index.js';

describe('Combination', () => {
  it('static function `Combination.choose()` works', () => {
    expect(Combination.choose(7, 4)).to.eq(35);
    expect(Combination.choose(7, 7)).to.eq(1);
    expect(Combination.choose(7, 8)).to.eq(0);
  });
});
