import { useEffect, useMemo, useRef, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  useColorModeValue,
  Text,
  InputLeftElement,
  InputGroup,
  Stack,
  Icon,
  useToast,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { FaWallet } from "react-icons/fa";
import { useTranslation } from "next-i18next";

import { useMainMenu } from "../hooks/useMainMenu";
import { useDrink } from "../hooks/useDrink";
import { useLocale } from "../hooks/useLocale";

import { InputMoneyMask } from "./InputMoneyMask";
import { debounce } from "lodash";

export function MainMenu() {
  const [moneyInput, setMoneyInput] = useState(0);
  const isFirstRun = useRef(true);
  const oldValueOfMoneyInput = useRef(0);

  const { isMainMenuOpen, onToggleMainMenu } = useMainMenu();
  const { drinks } = useDrink();
  const { formatMoney, isLiter } = useLocale();
  const toast = useToast();
  const { t } = useTranslation("main_menu");

  const initialRef = useRef(null);

  const modalBackground = useColorModeValue("gray.100", "gray.700");
  const modalTextColor = useColorModeValue("gray.700", "gray.100");

  const totalValueOfDrinks = useMemo(() => {
    return drinks.reduce((accumulator, drink) => {
      return (accumulator += drink.price * drink.quantity);
    }, 0);
  }, [drinks]);

  const remainingValueOfDrinks = useMemo(() => {
    const remainingMoney = moneyInput - totalValueOfDrinks;

    return remainingMoney;
  }, [moneyInput, totalValueOfDrinks]);

  const totalDrinks = useMemo(() => {
    const totalDrinkSize = drinks.reduce((accumulator, drink) => {
      return (accumulator +=
        (isLiter ? drink.size / 1000 : drink.size) * drink.quantity);
    }, 0);

    return totalDrinkSize.toFixed(3);
  }, [drinks, isLiter]);

  useEffect(() => {
    const spendMoneyFromCookies = Cookies.get("drink-count:spend-money");

    if (spendMoneyFromCookies) {
      const spendMoneyFromCookiesParsed = JSON.parse(spendMoneyFromCookies);

      setMoneyInput(spendMoneyFromCookiesParsed);
    }
  }, []);

  useEffect(() => {
    const debounced = debounce(() => {
      Cookies.set("drink-count:spend-money", JSON.stringify(moneyInput));

      if (oldValueOfMoneyInput.current !== moneyInput) {
        if (!isFirstRun.current) {
          toast({
            title: t("toast-success-title"),
            description: t("toast-success-description"),
            status: "success",
            isClosable: true,
            duration: 1750,
          });
        } else {
          isFirstRun.current = false;
        }

        oldValueOfMoneyInput.current = moneyInput;
      }
    }, 1000);

    debounced();

    return debounced.cancel;
  }, [moneyInput, t, toast]);

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isMainMenuOpen}
      onClose={onToggleMainMenu}
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        background={modalBackground}
        color={modalTextColor}
        mx={{ base: 4, md: 0 }}
      >
        <ModalHeader>{t("ModalHeader")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={0}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>{t("input-money")}</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaWallet} color="teal.500" />
                </InputLeftElement>
                <InputMoneyMask
                  moneyInput={moneyInput}
                  setMoneyInput={setMoneyInput}
                  placeholder={t("input-money-placeholder")}
                  initialRef={initialRef}
                  pl={10}
                />
              </InputGroup>
            </FormControl>
            <Text fontWeight="bold">
              {t("text-remaining-money")}:{" "}
              <Text
                as="span"
                fontWeight="normal"
                color={remainingValueOfDrinks < 0 ? "red.400" : "green.500"}
              >
                {formatMoney(remainingValueOfDrinks)}
              </Text>
            </Text>
            <Text fontWeight="bold">
              {t("text-total-price")}:{" "}
              <Text as="span" fontWeight="normal">
                {formatMoney(totalValueOfDrinks)}
              </Text>
            </Text>
            <Text fontWeight="bold">
              {t("text-total-size")}{" "}
              {isLiter ? t("text-total-size-measure") : "FL.OZ"}:{" "}
              <Text as="span" fontWeight="normal">
                {totalDrinks}
              </Text>
            </Text>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={onToggleMainMenu}
            colorScheme="teal"
            variant="outline"
          >
            {t("button-close")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
