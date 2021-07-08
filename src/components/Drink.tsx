import { memo, useEffect, useState } from "react";
import { isEqual } from "lodash";
import {
  Flex,
  Image,
  Text,
  useColorModeValue,
  useMediaQuery,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { useAlert } from "../hooks/useAlert";

type Drink = {
  id: number;
  name: string;
  size: string;
  price: string;
};

type DrinkProps = {
  drink: Drink;
};

function DrinkComponent({ drink }: DrinkProps) {
  // Fix for Next.js hydration
  const [enableMediaQuery, setEnableMediaQuery] = useState(false);
  const { colorMode } = useColorMode();

  const formBackground = useColorModeValue("teal.400", "gray.700");

  const [isBiggerThan425] = useMediaQuery("(min-width: 425px)");
  const [isBiggerThan375] = useMediaQuery("(min-width: 375px)");
  const [isSmallerThan1024] = useMediaQuery("(max-width: 1024px)");

  const { openAlert } = useAlert();

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
    <Flex align="center" justifyContent="center">
      <Flex
        direction="column"
        alignItems="center"
        background={formBackground}
        p={6}
        rounded={6}
        w="100%"
        position="relative"
      >
        <IconButton
          aria-label="Delete Drink"
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
          onClick={() => openAlert({ id: drink.id, name: drink.name })}
        />
        <Image
          alt={drink.name}
          src={`/logos/${getImage()}`}
          borderRadius="full"
          boxSize="96px"
          background="gray.100"
          color="teal.400"
          mb={4}
          objectFit="contain"
        />
        <Text color="gray.50" display="block" mb={2}>
          Liters: {drink.size}L
        </Text>
        {enableMediaQuery && isBiggerThan425 ? (
          <Text color="gray.50" display="block" textAlign="center">
            Price: {drink.price}
          </Text>
        ) : (
          <Flex direction="column">
            <Text color="gray.50">Price</Text>
            <Text color="gray.50">{drink.price}</Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export const Drink = memo(DrinkComponent, (prevProps, nextProps) => {
  return isEqual(prevProps.drink, nextProps.drink);
});
