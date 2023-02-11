import { Flex, Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import { useState } from 'react';

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
}

function App() {
  const [input, setInput] = useState<InputParams>({ items: 5, k: 3, lOrder: 0, action: undefined });
  const [output, setOutput] = useState<string>('');

  const compute: Compute = {
    computeTotal: (n: number, k: number) => {
      console.log(`n: ${n}, k: ${k}`);
      setOutput((10).toString());
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
              <OutputPane output={output} />
            </SimpleGrid>
          </form>
        </VStack>
      </Flex>
    </>
  );
}

export { App as default };
