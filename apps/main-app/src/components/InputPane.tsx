import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Highlight,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';

import { useState, Dispatch } from 'react';
import type { InputParams, Compute } from './App';

interface NumberFieldControlProps {
  label?: string;
  value: number;
  setValue: Dispatch<number>;
}

interface InputPaneProps {
  input: InputParams;
  setInput: Dispatch<InputParams>;
  compute: Compute;
}

type ItemChoice = 'itemNumber' | 'items';

function NumberFieldControl(props: NumberFieldControlProps) {
  const { label, value, setValue } = props;
  return (
    <>
      <FormControl>
        {label && <FormLabel>{label}</FormLabel>}
        <NumberInput defaultValue={value} onChange={(_, vn) => setValue(vn)}>
          <NumberInputField value={value} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    </>
  );
}

export default function InputPane(props: InputPaneProps) {
  const { compute } = props;

  const [n, setN] = useState<number>(5);
  const [items, setItems] = useState<string>('');
  const [use, setUse] = useState<ItemChoice>('itemNumber');
  const [k, setK] = useState<number>(3);
  const [lOrder, setLOrder] = useState<number>(0);

  function handleComputeTotal() {
    const itemNum = use === 'itemNumber' ? n : items.split('\n').length;
    compute.computeTotal(itemNum, k);
  }

  function handleGenerateCombination() {
    const inputItems: number | string[] =
      use === 'itemNumber' ? n : items.split('\n').map((v) => v.trim());
    compute.generateCombination(inputItems, k);
  }

  function handleGetLexElement() {
    const inputItems: number | string[] =
      use === 'itemNumber' ? n : items.split('\n').map((v) => v.trim());
    compute.getLexElement(inputItems, k, lOrder);
  }

  return (
    <>
      <Stack direction="column" spacing={4}>
        <Heading as="h3" size="lg">
          Input
        </Heading>

        <RadioGroup defaultValue={use} onChange={(v) => setUse(v as ItemChoice)}>
          <FormLabel>Items:</FormLabel>
          <Radio w="100%" value="itemNumber" my={1}>
            Item Number (aka.{' '}
            <Highlight query="n" styles={{ px: '2', py: '1', rounded: '20%', bg: 'teal.100' }}>
              n
            </Highlight>
            ):
          </Radio>
          <Box ml={6}>
            <NumberFieldControl value={n} setValue={setN} />
          </Box>
          <Text my={2}>or</Text>
          <Radio w="100%" value="items">
            Items
          </Radio>
          <Box ml={6}>
            <FormControl>
              <Textarea
                rows={5}
                height="auto"
                value={items}
                placeholder="Items, one per line"
                onChange={(ev) => setItems(ev.target.value)}
              />
            </FormControl>
          </Box>
        </RadioGroup>

        <NumberFieldControl value={k} label="# of item chosen (aka. `k`):" setValue={setK} />

        <Divider />

        <ButtonGroup
          colorScheme="blue"
          variant="outline"
          spacing="6"
          border="1px"
          borderColor="gray.200"
          borderRadius="md"
          p={4}
        >
          <Stack direction="column">
            <Button onClick={handleComputeTotal}>Compute total combinations</Button>
            <Button onClick={handleGenerateCombination}>Generate all combinations</Button>
            <Spacer my={4} h={12} />
            <NumberFieldControl value={lOrder} label="Element Entry:" setValue={setLOrder} />
            <Button onClick={handleGetLexElement}>Get element</Button>
          </Stack>
        </ButtonGroup>
      </Stack>
    </>
  );
}
