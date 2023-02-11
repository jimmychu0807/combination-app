import { Flex, Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { Combination } from '@workspace/lib';

import Readme from './Readme';
import InputPane from './InputPane';
import OutputPane from './OutputPane';
import './App.css';

export interface InputParams {
  items: number | string[];
  k: number;
  lOrder: number;
  action?: 'computeTotal' | 'generateAll' | 'getElement';
}

export interface Compute {
  computeTotal: (n: number, k: number) => void;
  generateCombination: (items: number | string[], k: number) => void;
  getLexElement: (items: number | string[], k: number, lOrder: number) => void;
}

function App() {
  const [input, setInput] = useState<InputParams>({ items: 5, k: 3, lOrder: 0, action: undefined });
  const [output, setOutput] = useState<string>('');

  const compute: Compute = {
    computeTotal: (n: number, k: number) => {
      setOutput(Combination.choose(n, k).toString());
    },

    generateCombination: (items: number | string[], k: number) => {
      const com = Array.isArray(items)
        ? new Combination<string>(items, k)
        : new Combination<number>(items, k);
      const result = Array.from(com);
      const resultStr = result.map((el) => Array.from(el.values()).toString()).join('\n');
      setOutput(resultStr);
    },

    getLexElement: (items: number | string[], k: number, lOrder: number) => {
      const com = Array.isArray(items)
        ? new Combination<string>(items, k)
        : new Combination<number>(items, k);
      const result = com.element(lOrder);
      const resultStr = Array.from(result.values()).toString();
      setOutput(resultStr);
    },
  };

  return (
    <>
      <Flex direction="column">
        <VStack spacing={5}>
          <Heading as="h1" size="lg">
            Combination App
          </Heading>

          <Readme />

          <form>
            <SimpleGrid columns={2} spacing={8}>
              <InputPane input={input} setInput={setInput} compute={compute} />
              <OutputPane output={output} setOutput={setOutput} />
            </SimpleGrid>
          </form>
        </VStack>
      </Flex>
    </>
  );
}

export { App as default };
