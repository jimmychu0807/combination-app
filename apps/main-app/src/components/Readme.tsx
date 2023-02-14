import { Card, CardBody, Flex, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import ReactMarkdown from 'react-markdown';

import styles from './Readme.module.scss';

const content = `
Combination generation is a math concept. Given an \`n\` and \`k\`, how many combinations of \`k\` can be picked from \`n\` elements, irrespective of the order (i.e. [\`1\`, \`2\`, \`3\`] is regarded the same as [\`3\`, \`1\`, \`2\`]), also what are the actual combination sets?

As an example, with n = 5, and k = 3, the number of combinations is **10**, and the combinations are:

\`[0, 1, 2], [0, 1, 3], [0, 1, 4], [0, 2, 3], [0, 2, 4], [0, 3, 4], [1, 2, 3], [1, 2, 4], [1, 3, 4], [2, 3, 4]\``;

function Readme() {
  return (
    <Card>
      <CardBody className={ styles.topCard }>
        <ReactMarkdown>{content}</ReactMarkdown>
        <Link href="https://github.com/jimmychu0807/combination-app" isExternal>
          Source code and more can be read here
          <ExternalLinkIcon mx="2px" />
        </Link>
      </CardBody>
    </Card>
  );
}

export default Readme;
