import { Dispatch } from 'react';
import { Combination } from '@workspace/lib';

export interface Model {
  computeTotal: (n: number, k: number) => void;
  generateCombination: (items: number | string[], k: number) => void;
  getLexElement: (items: number | string[], k: number, lOrder: number) => void;
}

export function model(setOutput: Dispatch<string>, setErrMsg: Dispatch<string>): Model {
  return {
    computeTotal: (n: number, k: number) => {
      try {
        setOutput(Combination.choose(n, k).toString());
      } catch (err) {
        setErrMsg((err as Error).toString());
      }
    },

    generateCombination: (items: number | string[], k: number) => {
      try {
        const com = Array.isArray(items)
          ? new Combination<string>(items, k)
          : new Combination<number>(items, k);

        const result = Array.from(com);
        const resultStr = result.map((el) => Array.from(el.values()).toString()).join('\n');
        setOutput(resultStr);
      } catch (err) {
        setErrMsg((err as Error).toString());
      }
    },

    getLexElement: (items: number | string[], k: number, lOrder: number) => {
      try {
        const com = Array.isArray(items)
          ? new Combination<string>(items, k)
          : new Combination<number>(items, k);

        const result = com.element(lOrder);
        const resultStr = Array.from(result.values()).toString();
        setOutput(resultStr);
      } catch (err) {
        setErrMsg((err as Error).toString());
      }
    },
  };
}
