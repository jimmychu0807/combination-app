type DataT<T> = T | number;

class Combination<T> implements Iterable<Set<DataT<T>>> {
  readonly k: number;
  readonly data: DataT<T>[];

  constructor(n: number | T[], k: number) {
    // All error checking
    if (k <= 0) throw new Error('k must be a positive integer');

    if (typeof n === 'number') {
      if (n <= 0) throw new Error('n must be a positive integer');
      if (k > n) throw new Error('n must be greater than or equal to k');
    } else {
      if (k > n.length) throw new Error('The length of data must be greater than or equal to k');
    }

    this.k = k;
    this.data = Array.isArray(n)
      ? [...n]
      : Array(n)
          .fill(0)
          .map((_, idx) => idx);
  }

  static choose(n: number, k: number): number {
    if (n <= 0 || k <= 0) throw new Error('n and k must be positive integer');
    if (k > n) return 0;

    // observation 1: choose(n, k) === choose(n, n-k)
    // observation 2: choose(7,3) = (7 * 6 * 5) / (1 * 2 * 3)
    // time complexity: O(k)
    return new Array(Math.min(k, n - k))
      .fill(0)
      .map((_, idx) => idx)
      .reduce((acc, i) => (acc * (n - i)) / (i + 1), 1);
  }

  // Algorithm ref:
  //   https://web.archive.org/web/20170325012457/https://msdn.microsoft.com/en-us/library/aa289166.aspx
  element(nth: number): Set<DataT<T>> {
    const dataLen = this.data.length;
    const comTotal = Combination.choose(dataLen, this.k);

    if (nth < 0 || nth >= comTotal)
      throw new Error(`\`nth\` must be between 0 and ${comTotal - 1}, getting ${nth}.`);

    // Referred as `dual` in the article mentioned above.
    let remain = comTotal - nth - 1;
    let lastUsedDigit = dataLen - 1;

    const combinadic = new Array(this.k).fill(0);
    for (let i = 0; i < this.k; i++) {
      const subsetSize = this.k - i;
      for (let digit = lastUsedDigit; digit > 0; digit--) {
        const res = Combination.choose(digit, subsetSize);
        if (res <= remain) {
          combinadic[i] = digit;
          lastUsedDigit = digit;
          remain -= res;
          break;
        }
      }
    }

    const elementInd = combinadic.map((v) => dataLen - v - 1);
    return new Set(elementInd.map((idx) => this.data[idx]));
  }

  [Symbol.iterator]() {
    // For Combination(5, 3), the current will start from [0, 1, 2],
    //   then [0, 1, 3], [0, 1, 4]. Notice 4 is the last element right-most digit, so we move to
    //   increment the 2nd to last digit, and reset the last digit to one greater than the value we
    //   just set. So [0, 2, 3], [0, 2, 4], and then [0, 3, 4]. Now we have to increment the
    //   right-most digit, becoming [1, 2, 3], [1. 2. 4], [1, 3, 4], and then lastly [2, 3, 4].
    // This is kind of similar to [gray code](https://en.wikipedia.org/wiki/Gray_code).
    const current: number[] = new Array(this.k).fill(0).map((_, idx) => idx);
    const dataLen = this.data.length;
    let returnedLast = false;

    return {
      next: (): IteratorResult<Set<DataT<T>>, undefined> => {
        const value = new Set(current.map((idx) => this.data[idx]));

        if (current[0] === dataLen - this.k) {
          if (returnedLast) return { value: undefined, done: true };
          returnedLast = true;
          return { value, done: false };
        }

        for (let i = current.length - 1; i >= 0; i--) {
          if (current[i] < dataLen - (current.length - i)) {
            current[i] += 1;
            for (let j = i + 1; j < current.length; j++) {
              current[j] = current[j - 1] + 1;
            }
            break;
          }
        }

        return { value, done: false };
      },
    };
  }
}

export { Combination };
