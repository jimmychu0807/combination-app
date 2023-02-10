import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
} from '@chakra-ui/react';

export default function InputPane() {
  return (
    <>
      <Box>
        <Heading>Input</Heading>
        <RadioGroup>
          <Stack direction="column">
            <Radio value="itemNumber">Item Number (n):</Radio>
            <FormControl>
              <NumberInput defaultValue={5}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            or
            <Radio value="items">Items</Radio>
            <FormControl>
              <Textarea placeholder="Items, one per line" />
            </FormControl>
          </Stack>
        </RadioGroup>
        <hr />

        <ButtonGroup variant="outline" spacing="6">
          <Stack direction="column">
            <Button>Generate all Combinations</Button>
            <Button>Compute Total Combinations</Button>
            <Button>Get Element</Button>
          </Stack>
        </ButtonGroup>
      </Box>
    </>
  );
}
