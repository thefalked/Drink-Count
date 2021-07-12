import Head from "next/head";
import { useEffect, useState } from "react";
import { Container, SimpleGrid } from "@chakra-ui/react";

import { Drink } from "../components/Drink";

import { useDrink } from "../hooks/useDrink";

export default function Home() {
  const { drinks } = useDrink();
  const [moneyFormat, setMoneyFormat] = useState({
    locale: "en-US",
    currency: "USD",
  });

  const drinksFormatted = drinks.map(({ id, name, price, size }) => {
    return {
      id,
      name,
      price: new Intl.NumberFormat(moneyFormat.locale, {
        style: "currency",
        currency: moneyFormat.currency,
      }).format(price),
      size: size.toFixed(2),
    };
  });

  useEffect(() => {
    const locale = Intl.NumberFormat().resolvedOptions().locale ?? "pt-BR";
    const currency = locale === "en-US" ? "USD" : "BRL";

    setMoneyFormat({
      locale,
      currency,
    });
  }, []);

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
