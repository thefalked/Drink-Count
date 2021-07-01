import {
  Flex,
  Heading,
  Input,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Head from "next/head";

import { Header } from "../components/Header";

export default function Home() {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");

  return (
    <>
      <Head>
        <title>Drink Count</title>
      </Head>
      <Header />
      <Flex mt="5" align="center" justifyContent="center">
        <Flex direction="column" background={formBackground} p={12} rounded={6}>
          <Heading mb={6}>Log in</Heading>
          <Input
            type="email"
            placeholder="youremail@email.com"
            variant="filled"
            mb={3}
          />
          <Input
            type="password"
            placeholder="********"
            variant="filled"
            mb={3}
          />
          <Button mb={6} colorScheme="teal">
            Log in
          </Button>
          <Button onClick={toggleColorMode}>Toggle Color Mode</Button>
        </Flex>
      </Flex>
    </>
  );
}
