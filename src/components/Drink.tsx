import { memo } from "react";
import lodash from "lodash";
import {
  Box,
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
  const { colorMode } = useColorMode();

  const formBackground = useColorModeValue("teal.400", "gray.700");

  const [isBiggerThan425] = useMediaQuery("(min-width: 425px)");
  const [isBiggerThan375] = useMediaQuery("(min-width: 375px)");
  const [isSmallerThan1024] = useMediaQuery("(max-width: 1024px)");

  const { openAlert } = useAlert();

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
          right={{ base: isBiggerThan375 ? 2 : 1, md: 3, lg: "6" }}
          top={{ base: isBiggerThan375 ? 2 : 1, md: 3, lg: "6" }}
          size={isSmallerThan1024 ? "sm" : "md"}
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
        <Text color="gray.50" display="block" textAlign="center">
          Price{isBiggerThan425 && ": "}
          <Box as="span" display={isBiggerThan425 ? "inline" : "block"}>
            {drink.price}
          </Box>
        </Text>
      </Flex>
    </Flex>
  );
}

export const Drink = memo(DrinkComponent, (prevProps, nextProps) => {
  return lodash.isEqual(prevProps.drink, nextProps.drink);
});
