import { useEffect, Dispatch } from 'react';
import {
  Flex,
  Heading,
  FormControl,
  Stack,
  Textarea,
  Button,
  useClipboard,
} from '@chakra-ui/react';

interface OutputPaneProps {
  output: string;
  setOutput: Dispatch<string>;
}

export default function OutputPane(props: OutputPaneProps) {
  const { output, setOutput } = props;
  const { onCopy, setValue } = useClipboard('');

  useEffect(() => {
    setValue(output);
  }, [output]);

  return (
    <>
      <Stack direction="column" spacing={4}>
        <Heading as="h3" size="lg">
          Result
        </Heading>
        <Flex direction="column">
          <Button alignSelf="end" size="xs" my={1} width={14} onClick={onCopy}>
            COPY
          </Button>
          <FormControl>
            <Textarea
              isReadOnly={true}
              rows={25}
              height="auto"
              placeholder="Result output"
              value={output}
            />
          </FormControl>
        </Flex>
        <Button variant="outline" onClick={() => setOutput('')}>
          Clear result
        </Button>
      </Stack>
    </>
  );
}
