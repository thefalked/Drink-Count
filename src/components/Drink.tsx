import {
  Flex,
  Image,
  Text,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";

export function Drink() {
  const formBackground = useColorModeValue("teal.400", "gray.700");
  const [isBiggerThan425] = useMediaQuery("(min-width: 425px)");

  const liters = "2.0L";
  const totalPrice = "R$ 1.121,00";

  const drinks = {
    heineken: "heineken.png",
    budweise: "budweise.png",
    default: "default.png",
  };

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
          alt="Heineken"
          src={`/logos/${drinks["heineken"]}`}
          borderRadius="full"
          boxSize="96px"
          background="gray.100"
          color="teal.400"
          mb={4}
          objectFit="contain"
        />
        <Text color="gray.50" display="block" mb={2}>
          Litros: {liters}
        </Text>
        <Text color="gray.50" display="block" textAlign="center">
          Valor{isBiggerThan425 ? ":" : <br />} {totalPrice}
        </Text>
      </Flex>
    </Flex>
  );
}
