import { Flex, Heading, SimpleGrid, VStack } from '@chakra-ui/react';

import Readme from './Readme';
import InputPane from './InputPane';
import OutputPane from './OutputPane';
import './App.css';

function App() {
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
              <InputPane />
              <OutputPane />
            </SimpleGrid>
          </form>
        </VStack>
      </Flex>
    </>
  );
}

export default App;
