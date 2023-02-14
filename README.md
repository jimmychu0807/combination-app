# Combination App

Combination generation is a math concept. Given an `n` and `k`, how many combinations of `k` that can be picked from `n`-th elements, irrespective of the order (i.e. [`1`, `2`, `3`] is regarded the same as [`3`, `1`, `2`])? Also what are the actual combination sets?

As an example, with n = 5, and k = 3, the number of combination is **10**, and the generated combinations are:

```
[0, 1, 2]
[0, 1, 3]
[0, 1, 4]
[0, 2, 3]
[0, 2, 4]
[0, 3, 4]
[1, 2, 3]
[1, 2, 4]
[1, 3, 4]
[2, 3, 4]
```

This demo application build a combination generation library based on the algorithm suggested by [Dr. James McCaffrey](https://web.archive.org/web/20210524173420/https://docs.microsoft.com/en-us/archive/msdn-magazine/2004/july/using-combinations-to-improve-your-software-test-case-generation). What's nice about the implementation are:

1. Returns an iterator so it doesn't take up as much memory space as when generating all the combination up front. The generated combination set grows very fast. with **n = 30, k = 10**, the total combination is: **3,0045,015**.

2. With a speicified `m`-th element, this library can return only that single element of the combination set based on its lexicographical order. This is also based on [the algorithm suggested by Dr. James McCaffrey](https://web.archive.org/web/20170325012457/https://msdn.microsoft.com/en-us/library/aa289166.aspx).

[The implementation of the combination library](./packages/lib/src/combination.ts). I encountered this programming problem when I was solving [Day 22](https://adventofcode.com/2021/day/22) of Advent of Code.

## References

- [s/o: Algorithm to return all combinations of k elements from n](https://stackoverflow.com/questions/127704/algorithm-to-return-all-combinations-of-k-elements-from-n)
- [Find all possible combinations of K numbers from 1 to n](https://medium.com/enjoy-algorithm/find-all-possible-combinations-of-k-numbers-from-1-to-n-88f8e3fad33c)
- [Wikipedia on Combination](https://en.wikipedia.org/wiki/Combination)
