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

    const iter = Math.min(k, n - k);
    let result = 1;
    // Note that choose(7,3) = (7 * 6 * 5) / (1 * 2 * 3)
    for (let i = 0; i < iter; i++) {
      result *= (n - i) / (i + 1);
    }

    return result;
  }

  element(nth: number): Set<DataT<T>> {
    throw new Error('Unimplemented');
    return new Set([this.data[nth]]);
  }

  [Symbol.iterator]() {
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
