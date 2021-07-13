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
  Tooltip,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { FaGithub, FaSun, FaMoon } from "react-icons/fa";
import { useTranslation } from "next-i18next";

export function Header() {
  const { toggleColorMode, colorMode } = useColorMode();
  const { t } = useTranslation("header");

  const formBackground = useColorModeValue("teal.300", "gray.700");
  const buttonBackground = useColorModeValue("teal.400", "gray.800");

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
          <Tooltip
            hasArrow
            label={`${t("theme")}${
              colorMode == "light" ? t("dark") : t("light")
            }`}
            bg="teal.400"
            color="gray.50"
            fontSize="md"
            placement="right"
          >
            <Button
              colorScheme="teal"
              variant="ghost"
              onClick={toggleColorMode}
              _hover={{ backgroundColor: buttonBackground }}
            >
              {colorMode == "light" ? (
                <Icon as={FaMoon} boxSize={6} color="gray.50" />
              ) : (
                <Icon as={FaSun} boxSize={6} color="gray.50" />
              )}
            </Button>
          </Tooltip>
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
