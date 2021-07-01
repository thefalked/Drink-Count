import { Container, Flex, Image, useColorModeValue } from "@chakra-ui/react";

export function Header() {
  const formBackground = useColorModeValue("teal.300", "gray.700");

  return (
    <Container
      maxW={["container.sm", "container.md", "container.lg", "container.xl"]}
    >
      <Flex
        align="center"
        justifyContent="center"
        py={4}
        mt={4}
        background={formBackground}
        borderRadius="10"
      >
        <Image src="/logo.svg" alt="Logo" h={10} />
      </Flex>
    </Container>
  );
}
