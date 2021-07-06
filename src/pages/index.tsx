import Head from "next/head";
import { Container, SimpleGrid } from "@chakra-ui/react";

import { Header } from "../components/Header";
import { Drink } from "../components/Drink";
import { BottomNavigator } from "../components/BottomNavigator";

export default function Home() {
  return (
    <>
      <Head>
        <title>Drink Count</title>
      </Head>

      <Header />

      <Container
        maxW={["container.sm", "container.md", "container.lg", "container.xl"]}
        mt={4}
      >
        <SimpleGrid spacing={4} columns={{ base: 1, sm: 2, md: 3, lg: 4 }}>
          <Drink />
          <Drink />
          <Drink />
          <Drink />
        </SimpleGrid>
      </Container>

      <BottomNavigator />
    </>
  );
}
