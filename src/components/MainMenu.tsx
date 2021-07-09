import { KeyboardEvent, useRef, useState } from "react";
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

  const { isMainMenuOpen, onToggleMainMenu } = useMainMenu();
  const initialRef = useRef(null);

  const modalBackground = useColorModeValue("gray.100", "gray.700");
  const modalTextColor = useColorModeValue("gray.700", "gray.100");

  function money(money: number) {
    const moneyFormatted = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(money);

    return moneyFormatted;
  }

  function removeFormat(event: KeyboardEvent<HTMLInputElement>) {
    console.log(event.key);

    const { defaultValue } = event.target as HTMLInputElement;
    console.log(defaultValue);

    const defaultValueUnformatted = defaultValue.replace(/[^0-9]/g, "");

    const withpoint = [
      defaultValueUnformatted.slice(0, -2),
      ".",
      defaultValueUnformatted.slice(-2),
    ].join("");

    if (event.key !== "Backspace") {
    }

    // const withfixed = (
    //   Number(
    //     money
    //       .replace(/[^0-9\.\,]/g, "")
    //       .replaceAll(".", "")
    //       .replace(",", ".")
    //   ) * 10
    // ).toFixed(2);

    console.log("with fixed", newValue);

    setMoneyInput(Number(newValue));
  }

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
              onKeyUp={event => removeFormat(event)}
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
