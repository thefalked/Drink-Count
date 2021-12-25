import Head from "next/head";
import { Checkbox, Container, SimpleGrid } from "@chakra-ui/react";
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
  const { drinks, retrieveDrinks } = useDrink();
  const { setMoneyFormat, formatMoney, setIsLiter } = useLocale();
  const { t } = useTranslation("common");

  const drinksFormatted = drinks.map(
    ({ id, name, price, quantity, measure, size }) => {
      return {
        id,
        name,
        price: formatMoney(price * quantity),
        quantity,
        size:
          locale === "pt-BR"
            ? ((size / 1000) * quantity).toFixed(3)
            : (size * quantity).toFixed(3),
        measure,
      };
    }
  );

  useEffect(() => {
    setIsLiter(locale === "pt-BR");

    const currency = locale === "pt-BR" ? "BRL" : "USD";

    setMoneyFormat({
      locale,
      currency,
    });

    retrieveDrinks(locale);
  }, [locale, setIsLiter, setMoneyFormat, retrieveDrinks]);

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
        <Checkbox></Checkbox>
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
        "share_context",
      ])),
      host,
      locale,
    },
  };
}
