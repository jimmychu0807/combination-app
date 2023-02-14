import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  FormLabel,
  Heading,
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

import { Dispatch } from 'react';
import type { InputParams } from './App';
import type { Model } from '../model';

interface NumberFieldControlProps {
  label?: string;
  value: number;
  onChange: Dispatch<number>;
}

interface InputPaneProps {
  input: InputParams;
  setInput: Dispatch<InputParams>;
  model: Model;
}

type ComputeType = 'computeTotal' | 'generateCombination' | 'getElement';

function NumberFieldControl(props: NumberFieldControlProps) {
  const { label, value, onChange } = props;
  return (
    <>
      <FormControl>
        {label && <FormLabel>{label}</FormLabel>}
        <NumberInput defaultValue={value.toString()} onChange={(_, vn) => onChange(vn)}>
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
  const { model, input, setInput } = props;

  function updateInput(obj: { [key: string]: string | number | string[] }) {
    setInput({ ...input, ...obj });
  }

  function compute(computeType: ComputeType) {
    const itemNum = input.use === 'itemNumber' ? input.itemNum : input.items.length;

    if (computeType === 'computeTotal') {
      model.computeTotal(itemNum, input.k);
    } else {
      const items = input.use === 'itemNumber' ? input.itemNum : input.items;
      if (computeType === 'generateCombination') {
        model.generateCombination(items, input.k);
      } else {
        model.getLexElement(items, input.k, input.lOrder);
      }
    }
  }

  return (
    <>
      <Stack direction="column" spacing={4}>
        <Heading as="h3" size="lg">
          Input
        </Heading>

        <RadioGroup defaultValue={input.use} onChange={(v) => updateInput({ use: v })}>
          <FormLabel>Items:</FormLabel>
          <Radio w="100%" value="itemNumber" my={1}>
            Item number (aka. `n`):
          </Radio>
          <Box ml={6}>
            <NumberFieldControl
              value={input.itemNum}
              onChange={(v) => updateInput({ itemNum: v })}
            />
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
                value={input.items}
                placeholder="Items, one per line"
                onChange={(ev) => updateInput({ items: ev.target.value.split('\n') })}
                size="sm"
              />
            </FormControl>
          </Box>
        </RadioGroup>

        <NumberFieldControl
          value={input.k}
          label="# of item chosen (aka. `k`):"
          onChange={(k) => updateInput({ k })}
        />

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
          <Stack direction="column" w="100%">
            <Button onClick={() => compute('computeTotal')}>Compute total combinations</Button>
            <Button onClick={() => compute('generateCombination')}>
              Generate all combinations
            </Button>
            <Spacer my={4} h={12} />
            <NumberFieldControl
              value={input.lOrder}
              label="Element entry:"
              onChange={(lOrder) => updateInput({ lOrder })}
            />
            <Button onClick={() => compute('getElement')}>Get element</Button>
          </Stack>
        </ButtonGroup>
      </Stack>
    </>
  );
}
