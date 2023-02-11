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

interface NumberFieldControlProps {
  label?: string;
  defaultValue?: number;
}

function NumberFieldControl(props: NumberFieldControlProps) {
  const { label, defaultValue } = props;
  return (
    <>
      <FormControl>
        {label && <FormLabel>{label}</FormLabel>}
        <NumberInput defaultValue={defaultValue ?? 0}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    </>
  );
}

export default function InputPane() {
  return (
    <>
      <Stack direction="column" spacing={4}>
        <Heading as="h3" size="lg">
          Input
        </Heading>

        <RadioGroup>
          <FormLabel>Items:</FormLabel>
          <Radio w="100%" value="itemNumber">
            Item Number (a.k.a `n`):
          </Radio>
          <Box ml={6}>
            <NumberFieldControl defaultValue={5} />
          </Box>
          <Text my={2}>or</Text>
          <Radio w="100%" value="items">
            Items
          </Radio>
          <Box ml={6}>
            <FormControl>
              <Textarea rows={5} height="auto" placeholder="Items, one per line" />
            </FormControl>
          </Box>
        </RadioGroup>

        <NumberFieldControl defaultValue={3} label="# of item chosen (aka `k`):" />

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
            <Button>Compute total combinations</Button>
            <Button>Generate all combinations</Button>
            <Spacer my={4} h={12} />
            <NumberFieldControl defaultValue={0} label="Element lexicographical order:" />
            <Button>Get element</Button>
          </Stack>
        </ButtonGroup>
      </Stack>
    </>
  );
}
