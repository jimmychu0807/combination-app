class Combination<T> implements Iterable<Set<T | number>> {
  readonly n: number;
  readonly k: number;
  readonly data: T[] | number[];

  constructor(n: number, k: number, data?: T[]) {
    if (n <= 0 || k <= 0) throw new Error('n and k must be positive integer');
    if (k > n) throw new Error('n must be greater than or equal to k');
    if (Array.isArray(data) && data.length !== n) {
      throw new Error('`data` should have the same number of entries as `n`');
    }

    this.n = n;
    this.k = k;
    this.data = data
      ? [...data]
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

  element(nth: number): T | number {
    throw new Error('Unimplemented');
    return this.data[nth];
  }

  [Symbol.iterator]() {
    const current: number[] = new Array(this.k).fill(0).map((_, idx) => idx);
    let returnedLast = false;

    return {
      next: (): IteratorResult<Set<T | number>, undefined> => {
        const value = new Set(current.map((idx) => this.data[idx]));

        if (current[0] === this.n - this.k) {
          if (returnedLast) return { value: undefined, done: true };
          returnedLast = true;
          return { value, done: false };
        }

        for (let i = current.length - 1; i >= 0; i--) {
          if (current[i] < this.n - (current.length - i)) {
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
