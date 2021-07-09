import { Container, VStack, IconButton, Tooltip } from "@chakra-ui/react";
import { AddIcon, SettingsIcon } from "@chakra-ui/icons";

import { useDrink } from "../hooks/useDrink";
import { useMainMenu } from "../hooks/useMainMenu";

export function BottomNavigator() {
  const { createNewDrink } = useDrink();
  const { onToggleMainMenu } = useMainMenu();

  return (
    <Container
      maxW={["container.sm", "container.md", "container.lg", "container.xl"]}
      w="100%"
      position="fixed"
      right="0"
      left="0"
      bottom={"0"}
    >
      <VStack
        spacing={4}
        position="absolute"
        bottom="0"
        right={{ base: 0, xl: "-55px" }}
        mb={4}
        mr={4}
      >
        <Tooltip
          hasArrow
          label="Open Menu"
          bg="teal.400"
          color="gray.50"
          fontSize="md"
          placement="left"
        >
          <IconButton
            color="teal.700"
            backgroundColor="brand.500"
            _active={{ backgroundColor: "teal.400", color: "gray.50" }}
            _hover={{ backgroundColor: "teal.400", color: "gray.50" }}
            borderRadius="md"
            icon={<SettingsIcon />}
            aria-label="Menu"
            size="lg"
            onClick={onToggleMainMenu}
          />
        </Tooltip>
        <Tooltip
          hasArrow
          label="Add a new drink"
          bg="teal.400"
          color="gray.50"
          fontSize="md"
          placement="left"
        >
          <IconButton
            color="teal.700"
            backgroundColor="brand.500"
            _active={{ backgroundColor: "teal.400", color: "gray.50" }}
            _hover={{ backgroundColor: "teal.400", color: "gray.50" }}
            borderRadius="md"
            icon={<AddIcon />}
            aria-label="Add Drink"
            size="lg"
            onClick={createNewDrink}
          />
        </Tooltip>
      </VStack>
    </Container>
  );
}
