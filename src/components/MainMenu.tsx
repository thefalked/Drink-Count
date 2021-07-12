import { useMemo, useRef, useState } from "react";
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
} from "@chakra-ui/react";
import { FaWallet } from "react-icons/fa";

import { useMainMenu } from "../hooks/useMainMenu";
import { useDrink } from "../hooks/useDrink";
import { useLocale } from "../hooks/useLocale";

import { InputMoneyMask } from "./InputMoneyMask";

export function MainMenu() {
  const [moneyInput, setMoneyInput] = useState(0);

  const { isMainMenuOpen, onToggleMainMenu } = useMainMenu();
  const { drinks } = useDrink();
  const { formatMoney } = useLocale();

  const initialRef = useRef(null);

  const modalBackground = useColorModeValue("gray.100", "gray.700");
  const modalTextColor = useColorModeValue("gray.700", "gray.100");

  const remainingValueOfDrinks = useMemo(() => {
    const totalValueOfDrinks = drinks.reduce((accumulator, drink) => {
      return (accumulator += drink.price);
    }, 0);

    const remainingMoney = moneyInput - totalValueOfDrinks;

    return formatMoney(remainingMoney);
  }, [drinks, moneyInput, formatMoney]);

  const totalDrinks = useMemo(() => {
    const totalDrinkSize = drinks.reduce((accumulator, drink) => {
      return (accumulator += drink.size);
    }, 0);

    return totalDrinkSize.toFixed(2);
  }, [drinks]);

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
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Money to spend ?</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaWallet} color="teal.500" />
                </InputLeftElement>
                <InputMoneyMask
                  moneyInput={moneyInput}
                  setMoneyInput={setMoneyInput}
                  placeholder="type your money here"
                  pl={10}
                />
              </InputGroup>
            </FormControl>
            <Text fontWeight="bold">
              Remaining Money:{" "}
              <Text as="span" fontWeight="normal">
                {remainingValueOfDrinks}
              </Text>
            </Text>
            <Text fontWeight="bold">
              Total of Liters:{" "}
              <Text as="span" fontWeight="normal">
                {totalDrinks}L
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
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
