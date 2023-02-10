import { Flex, Heading, SimpleGrid } from '@chakra-ui/react';

import Readme from './Readme';
import InputPane from './InputPane';
import OutputPane from './OutputPane';
import './App.css';

function App() {
  return (
    <>
      <Flex direction="column">
        <Heading as="h1" size="lg">
          Combination App
        </Heading>

        <Readme />

        <form>
          <SimpleGrid columns={2} spacing={5}>
            <InputPane />
            <OutputPane />
          </SimpleGrid>
        </form>
      </Flex>
    </>
  );
}

export default App;
