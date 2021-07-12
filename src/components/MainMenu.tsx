import { ChangeEvent, useEffect, useRef, useState } from "react";
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
  Input,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

import { useMainMenu } from "../hooks/useMainMenu";

export function MainMenu() {
  const [moneyInput, setMoneyInput] = useState(0);
  const [moneyFormat, setMoneyFormat] = useState({
    locale: "en-US",
    currency: "USD",
  });

  const { isMainMenuOpen, onToggleMainMenu } = useMainMenu();
  const initialRef = useRef(null);

  const modalBackground = useColorModeValue("gray.100", "gray.700");
  const modalTextColor = useColorModeValue("gray.700", "gray.100");

  function money(money: number) {
    const moneyFormatted = new Intl.NumberFormat(moneyFormat.locale, {
      style: "currency",
      currency: moneyFormat.currency,
    }).format(money);

    return moneyFormatted;
  }

  function stringSplice(
    value: string,
    position: number,
    valueToInsert: string
  ): string {
    return [
      value.slice(0, position),
      valueToInsert,
      value.slice(position),
    ].join("");
  }

  function removeFormat(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target as HTMLInputElement;

    const inputValueUnformatted = value.replace(/[^0-9]/g, "");

    const valueWithDot = stringSplice(inputValueUnformatted, -2, ".");

    setMoneyInput(Number(valueWithDot));
  }

  useEffect(() => {
    const locale = Intl.NumberFormat().resolvedOptions().locale ?? "pt-BR";
    const currency = locale === "en-US" ? "USD" : "BRL";

    setMoneyFormat({
      locale,
      currency,
    });
  }, []);

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isMainMenuOpen}
      onClose={onToggleMainMenu}
      isCentered
    >
      <ModalOverlay />
      <ModalContent background={modalBackground} color={modalTextColor}>
        <ModalHeader>Main Menu</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Money to spend ?</FormLabel>
            <Input
              placeholder="Money Here"
              onChange={event => removeFormat(event)}
              value={money(moneyInput)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onToggleMainMenu}>Cancel</Button>
          <Button colorScheme="blue" mr={3}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
