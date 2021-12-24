import { memo, useEffect, useRef, useState } from "react";
import { isEqual } from "lodash";
import {
  Flex,
  Image,
  Text,
  useColorModeValue,
  useMediaQuery,
  IconButton,
  useColorMode,
  Tooltip,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useTranslation } from "next-i18next";

import { useAlert } from "../hooks/useAlert";
import { useDrinkModal } from "../hooks/useDrinkModal";

type Drink = {
  id: number;
  name: string;
  size: string;
  quantity: number;
  measure: "oz" | "liters";
  price: string;
};

type DrinkProps = {
  drink: Drink;
};

function DrinkComponent({ drink }: DrinkProps) {
  // Fix for Next.js hydration
  const [enableMediaQuery, setEnableMediaQuery] = useState(false);

  const finalModalRef = useRef(null);

  const { colorMode } = useColorMode();
  const { openAlert } = useAlert();
  const { openDrinkModal } = useDrinkModal();
  const { t } = useTranslation("drink_card");

  const cardBackground = useColorModeValue("teal.400", "gray.700");

  const [isBiggerThan375] = useMediaQuery("(min-width: 375px)");
  const [isSmallerThan1024] = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    setEnableMediaQuery(true);
  }, []);

  function getImage() {
    switch (drink.name.toLocaleLowerCase()) {
      case "heineken": {
        return "heineken.png";
      }
      case "budweiser": {
        return "budweiser.png";
      }
      default: {
        return "default.png";
      }
    }
  }

  return (
    <Flex
      align="center"
      justifyContent="center"
      _hover={{ cursor: "pointer" }}
      onClick={() => openDrinkModal(drink.id, finalModalRef)}
      aria-label={t("aria-label")}
      ref={finalModalRef}
    >
      <Flex
        direction="column"
        alignItems="center"
        background={cardBackground}
        p={[6, 5, 5, 5]}
        rounded={6}
        w="100%"
        position="relative"
      >
        <Tooltip
          hasArrow
          label={t("tooltip-remove-button-label")}
          bg="teal.600"
          color="gray.50"
          fontSize="md"
          placement="top"
        >
          <IconButton
            aria-label={t("remove-button-aria-label")}
            colorScheme={colorMode === "light" ? "teal" : "gray"}
            rounded={6}
            icon={<DeleteIcon />}
            position="absolute"
            right={{
              base: enableMediaQuery && isBiggerThan375 ? 2 : 1,
              md: 3,
              lg: "6",
            }}
            top={{
              base: enableMediaQuery && isBiggerThan375 ? 2 : 1,
              md: 3,
              lg: "6",
            }}
            size={enableMediaQuery && isSmallerThan1024 ? "sm" : "md"}
            onClick={e => {
              openAlert({ id: drink.id, name: drink.name });
              e.stopPropagation();
            }}
          />
        </Tooltip>
        <Image
          alt={`${drink.name} logo`}
          src={`/logos/${getImage()}`}
          borderRadius="full"
          boxSize="96px"
          background="white"
          color="teal.400"
          mb={4}
          objectFit="contain"
        />
        <Text
          color="gray.50"
          display="block"
          mb={2}
          fontWeight="medium"
          fontSize="14"
        >
          {drink.measure === "liters" ? t("text-measure") : "FL.OZ"}:{" "}
          <Text as="span" fontWeight="normal">
            {drink.size}
          </Text>
        </Text>
        <Text
          color="gray.50"
          display="block"
          mb={2}
          fontWeight="medium"
          fontSize="14"
        >
          {t("text-quantity")}:{" "}
          <Text as="span" fontWeight="normal">
            {drink.quantity}
          </Text>
        </Text>
        <Text
          color="gray.50"
          textAlign="center"
          fontWeight="medium"
          fontSize="13"
        >
          {t("text-price")}:{" "}
          <Text as="span" fontWeight="normal">
            {drink.price}
          </Text>
        </Text>
      </Flex>
    </Flex>
  );
}

export const Drink = memo(DrinkComponent, (prevProps, nextProps) => {
  return isEqual(prevProps.drink, nextProps.drink);
});
