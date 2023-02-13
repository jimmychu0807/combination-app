import { useEffect, Dispatch } from 'react';
import {
  Alert,
  AlertIcon,
  AlertDescription,
  Button,
  CloseButton,
  Flex,
  FormControl,
  Heading,
  Stack,
  Textarea,
  useClipboard,
  useDisclosure,
} from '@chakra-ui/react';

import styles from './OutputPane.module.scss';

interface OutputPaneProps {
  output: string;
  setOutput: Dispatch<string>;
  errMsg: string;
  setErrMsg: Dispatch<string>;
}

export default function OutputPane(props: OutputPaneProps) {
  const { output, setOutput, errMsg, setErrMsg } = props;
  const { onCopy, setValue } = useClipboard('');
  const { onClose } = useDisclosure({ defaultIsOpen: false });

  useEffect(() => {
    setValue(output);
  }, [output]);

  function closeError() {
    setErrMsg('');
    onClose();
  }

  return (
    <>
      <Stack direction="column" spacing={4}>
        <Heading as="h3" size="lg">
          Result
        </Heading>
        {errMsg.length > 0 && (
          <Alert status="error">
            <AlertIcon boxSize="4" />
            <AlertDescription maxW="md">{errMsg}</AlertDescription>
            <CloseButton
              alignSelf="flex-start"
              position="relative"
              right={-1}
              top={-1}
              onClick={closeError}
            />
          </Alert>
        )}
        <Flex direction="column">
          <Button alignSelf="end" size="xs" my={1} width={14} onClick={onCopy}>
            COPY
          </Button>
          <FormControl>
            <Textarea
              className={styles.textarea}
              isReadOnly={true}
              rows={25}
              height="auto"
              placeholder="Result output"
              value={output}
              size="sm"
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
