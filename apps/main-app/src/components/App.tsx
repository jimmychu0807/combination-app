import { Heading, Stack } from '@chakra-ui/react';
import { useState } from 'react';

import Readme from './Readme';
import InputPane from './InputPane';
import OutputPane from './OutputPane';
import { model } from '../model';
import './App.css';

export type ItemChoice = 'itemNumber' | 'items';

export interface InputParams {
  items: string[];
  itemNum: number;
  use: ItemChoice;
  k: number;
  lOrder: number;
}

function App() {
  const [input, setInput] = useState<InputParams>({
    items: [],
    itemNum: 5,
    k: 3,
    use: 'itemNumber',
    lOrder: 0,
  });
  const [output, setOutput] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');
  const compute = model(setOutput, setErrMsg);

  return (
    <>
      <Stack direction="column" spacing={5}>
        <Heading as="h1" size="lg">
          Combination App
        </Heading>

        <Readme />

        <form>
          <Stack direction="row" gap={8}>
            <InputPane input={input} setInput={setInput} model={compute} />
            <OutputPane
              output={output}
              setOutput={setOutput}
              errMsg={errMsg}
              setErrMsg={setErrMsg}
            />
          </Stack>
        </form>
      </Stack>
    </>
  );
}

export { App as default };
