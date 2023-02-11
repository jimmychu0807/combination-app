import { Flex, Heading, FormControl, Stack, Textarea, Button } from '@chakra-ui/react';

interface OutputPaneProps {
  output: string;
}

export default function OutputPane(props: OutputPaneProps) {
  const { output } = props;
  return (
    <>
      <Stack direction="column" spacing={4}>
        <Heading as="h3" size="lg">
          Result
        </Heading>
        <Flex direction="column">
          <Button alignSelf="end" size="xs" my={1} width={14}>
            COPY
          </Button>
          <FormControl>
            <Textarea rows={25} height="auto" placeholder="Result output" value={output} />
          </FormControl>
        </Flex>
        <Button variant="outline">Clear result</Button>
      </Stack>
    </>
  );
}
