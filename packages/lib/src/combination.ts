class Combination<T> implements Iterable<Set<T | number>> {
  readonly n: number;
  readonly k: number;
  readonly data: T[] | number[];

  constructor(n: number, k: number, data?: T[]) {
    if (n <= 0 || k <= 0) throw new Error("n and k must be positive integer.");
    if (k > n) throw new Error("n must be greater than or equal to k.");
    if (Array.isArray(data) && data.length !== n) {
      throw new Error("`data` should have the same number of entries as `n`.");
    }

    this.n = n;
    this.k = k;
    this.data = data ? data : Array(n).fill(0).map((_, idx) => idx);
  }

  static choose(n: number, k: number): number {
    throw new Error("Unimplemented");
    return 0;
  }

  element(nth: number): T | number {
    throw new Error("Unimplemented");
    return this.data[0];
  }

  [Symbol.iterator]() {
    let counter = 0;
    return {
      next: (): IteratorResult<Set<T | number>, undefined> => {
        if (counter <= this.k) {
          const value = new Set([this.data[counter]]);
          counter += 1;
          return { value, done: false };
        }

        return { value: undefined, done: true };
      }
    }
  }
}

export { Combination };
