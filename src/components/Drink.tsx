import {
  Flex,
  Heading,
  Input,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

export function Drink() {
  const formBackground = useColorModeValue("gray.100", "gray.700");

  return (
    <Flex mt="5" align="center" justifyContent="center">
      <Flex direction="column" background={formBackground} p={12} rounded={6}>
        <Heading mb={6}>Log in</Heading>
        <Input
          type="email"
          placeholder="youremail@email.com"
          variant="filled"
          mb={3}
        />
        <Input type="password" placeholder="********" variant="filled" mb={3} />
        <Button mb={6} colorScheme="teal">
          Log in
        </Button>
      </Flex>
    </Flex>
  );
}
