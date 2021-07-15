import Head from "next/head";
import { Container, SimpleGrid } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import type { GetServerSidePropsContext } from "next";

import { useDrink } from "../hooks/useDrink";
import { useLocale } from "../hooks/useLocale";

import { Drink } from "../components/Drink";
import { useEffect } from "react";

type HomeProps = {
  host: string;
  locale: "en" | "pt-BR";
};

export default function Home({ host, locale }: HomeProps) {
  const { drinks } = useDrink();
  const { setMoneyFormat, formatMoney, setIsLiter } = useLocale();
  const { t } = useTranslation("common");

  const drinksFormatted = drinks.map(({ id, name, price, quantity, size }) => {
    return {
      id,
      name,
      price: formatMoney(price * quantity),
      size: ((size / 1000) * quantity).toFixed(3),
    };
  });

  useEffect(() => {
    setIsLiter(locale === "pt-BR");

    const currency = locale === "pt-BR" ? "BRL" : "USD";

    setMoneyFormat({
      locale,
      currency,
    });
  }, [locale, setIsLiter, setMoneyFormat]);

  return (
    <>
      <Head>
        <meta property="og:title" content={t("title")} />
        <meta property="og:description" content={t("og-description")} />
        <meta property="og:url" content={host} />
        <meta property="og:type" content="website" />

        <title>{t("title")}</title>
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

export async function getServerSideProps({
  locale = "en",
  req: {
    headers: { host },
  },
}: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "header",
        "drink",
        "drink_card",
        "bottom_navigator",
        "delete_alert_dialog",
        "main_menu",
        "drink_modal",
      ])),
      host,
      locale,
    },
  };
}
