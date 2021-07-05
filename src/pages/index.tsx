import Head from "next/head";

import { Header } from "../components/Header";
import { Drink } from "../components/Drink";

export default function Home() {
  return (
    <>
      <Head>
        <title>Drink Count</title>
      </Head>

      <Header />

      <Drink />
    </>
  );
}
