import Head from "next/head";
import { Container, SimpleGrid } from "@chakra-ui/react";

import { useDrink } from "../hooks/useDrink";
import { useLocale } from "../hooks/useLocale";

import { Drink } from "../components/Drink";

export default function Home() {
  const { drinks } = useDrink();
  const { formatMoney } = useLocale();

  const drinksFormatted = drinks.map(({ id, name, price, quantity, size }) => {
    return {
      id,
      name,
      price: formatMoney(price * quantity),
      size: ((size / 1000) * quantity).toFixed(2),
    };
  });

  return (
    <>
      <Head>
        <title>Drink Count</title>
      </Head>

      <Container
        maxW={["container.sm", "container.md", "container.lg", "container.xl"]}
        mt={4}
      >
        <SimpleGrid spacing={4} columns={{ base: 1, sm: 2, md: 3, lg: 4 }}>
          {drinksFormatted.map(drink => (
            <Drink key={drink.id} drink={drink} />
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}
