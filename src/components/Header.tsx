import NextLink from "next/link";
import {
  Button,
  Container,
  Flex,
  Text,
  Link,
  SimpleGrid,
  Image,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { FaGithub, FaSun, FaMoon } from "react-icons/fa";

export function Header() {
  const { toggleColorMode, colorMode } = useColorMode();

  const formBackground = useColorModeValue("teal.300", "gray.700");

  return (
    <Container
      maxW={["container.sm", "container.md", "container.lg", "container.xl"]}
    >
      <SimpleGrid
        p={4}
        mt={4}
        background={formBackground}
        borderRadius="10"
        columns={3}
      >
        <Flex alignItems="center" justifyContent="flex-start">
          <Button colorScheme="teal" variant="ghost" onClick={toggleColorMode}>
            {colorMode == "light" ? (
              <Icon as={FaMoon} boxSize={6} color="gray.50" />
            ) : (
              <Icon as={FaSun} boxSize={6} color="gray.50" />
            )}
          </Button>
        </Flex>

        <Flex alignItems="center" justifyContent="center">
          <Image src="/logo.svg" alt="Logo" h={10} />
        </Flex>

        <Flex alignItems="center" justifyContent="flex-end">
          <NextLink href="https://github.com/thefalked/" passHref>
            <Link isExternal color="gray.50" display="flex" textDecor="none">
              <Icon as={FaGithub} boxSize={8} color="gray.50" />
              <Text
                fontSize="xl"
                fontWeight="bold"
                textDecor="none"
                display={{ base: "none", md: "inline" }}
              >
                /TheFalkeD
              </Text>
            </Link>
          </NextLink>
        </Flex>
      </SimpleGrid>
    </Container>
  );
}
