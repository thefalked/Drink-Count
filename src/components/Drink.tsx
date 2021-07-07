import { memo } from "react";
import lodash from "lodash";
import {
  Box,
  Flex,
  Image,
  Text,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";

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
  const formBackground = useColorModeValue("teal.400", "gray.700");
  const [isBiggerThan425] = useMediaQuery("(min-width: 425px)");

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
      >
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
          Litros: {drink.size}L
        </Text>
        <Text color="gray.50" display="block" textAlign="center">
          Valor{isBiggerThan425 && ": "}
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
