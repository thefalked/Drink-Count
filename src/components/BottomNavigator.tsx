import { Container, VStack, IconButton, Tooltip } from "@chakra-ui/react";
import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import { FaShare } from "react-icons/fa";
import { useTranslation } from "next-i18next";

import { useDrink } from "../hooks/useDrink";
import { useMainMenu } from "../hooks/useMainMenu";
import { useShare } from "../hooks/useShare";

export function BottomNavigator() {
  const { createNewDrink } = useDrink();
  const { shareDrinks, hasDrinksToShare } = useShare();
  const { onToggleMainMenu } = useMainMenu();
  const { t } = useTranslation("bottom_navigator");

  return (
    <Container
      maxW={["container.sm", "container.md", "container.lg", "container.xl"]}
      w="100%"
      position="fixed"
      right="0"
      left="0"
      bottom="0"
    >
      <VStack
        spacing={4}
        position="absolute"
        bottom="1rem"
        left={{ base: 0, md: "initial" }}
        right={{ md: 0, xl: "-55px" }}
        mb={4}
        mr={{ md: 4 }}
        ml={{ base: 4, md: 0 }}
      >
        {hasDrinksToShare() && (
          <Tooltip
            hasArrow
            label={t("tooltip-share-label")}
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
              icon={<FaShare />}
              aria-label={t("icon-share-aria-label")}
              size="lg"
              onClick={shareDrinks}
            />
          </Tooltip>
        )}
        <Tooltip
          hasArrow
          label={t("tooltip-menu-label")}
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
            icon={<HamburgerIcon />}
            aria-label={t("icon-menu-aria-label")}
            size="lg"
            onClick={onToggleMainMenu}
          />
        </Tooltip>
        <Tooltip
          hasArrow
          label={t("toolti-new-drink-label")}
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
            aria-label={t("icon-new-drink-aria-label")}
            size="lg"
            onClick={createNewDrink}
          />
        </Tooltip>
      </VStack>
    </Container>
  );
}
