import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  FormControl,
  FormLabel,
  InputLeftElement,
  Icon,
  InputGroup,
  Button,
  useColorModeValue,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Text,
  Input,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { IoMdBeer, IoMdPricetags } from "react-icons/io";
import { BiRuler, BiRename } from "react-icons/bi";

import type { Drink } from "../contexts/DrinkContext";

import { useDrinkModal } from "../hooks/useDrinkModal";
import { useLocale } from "../hooks/useLocale";

import { InputMoneyMask } from "./InputMoneyMask";

import { stringCapitalize } from "../utils";

const DRINK_NAMES = ["Heineken", "Budweiser"];
const DRINK_SIZES = [1000, 600, 550, 355, 350, 300];

export function DrinkModal() {
  const [moneyInput, setMoneyInput] = useState(0);
  const [drinkQuantity, setDrinkQuantity] = useState(0);

  const [drinkName, setDrinkName] = useState("");
  const [drinkNamePersonalized, setDrinkNamePersonalized] = useState("");

  const [drinkSize, setDrinkSize] = useState("");
  const [drinkSizePersonalized, setDrinkSizePersonalized] = useState(0);

  const modalBackground = useColorModeValue("gray.100", "gray.700");
  const modalTextColor = useColorModeValue("gray.700", "gray.100");

  const initialRef = useRef(null);

  const {
    drink,
    isDrinkModalOpen,
    handleCloseModal,
    finalRefDrink,
    handleChangeDrinkModal,
  } = useDrinkModal();

  const { formatMoney } = useLocale();

  function totalDrinkPrice(): string {
    return formatMoney(moneyInput * drinkQuantity);
  }

  function totalDrinkSize() {
    if (drinkSize !== "personalized") {
      return ((Number(drinkSize) / 1000) * drinkQuantity).toFixed(2);
    } else {
      return (drinkSizePersonalized * drinkQuantity).toFixed(2);
    }
  }

  function handleChangeDrink() {
    if (drink) {
      const drinkChanged: Drink = {
        id: drink.id,
        name: drinkName !== "personalized" ? drinkName : drinkNamePersonalized,
        price: moneyInput,
        quantity: drinkQuantity,
        size:
          drinkSize !== "personalized"
            ? Number(drinkSize)
            : drinkSizePersonalized * 1000,
      };

      handleChangeDrinkModal(drinkChanged);
    }
  }

  useEffect(() => {
    if (drink) {
      const drinkNameCapitalized = stringCapitalize(drink.name);

      if (DRINK_NAMES.includes(drinkNameCapitalized)) {
        setDrinkName(drinkNameCapitalized);
        setDrinkNamePersonalized("");
      } else if (drinkNameCapitalized === "") {
        setDrinkName("");
        setDrinkNamePersonalized("");
      } else {
        setDrinkName("personalized");
        setDrinkNamePersonalized(drink.name);
      }

      setMoneyInput(drink.price);

      if (DRINK_SIZES.includes(drink.size)) {
        setDrinkSize(String(drink.size));
        setDrinkSizePersonalized(0);
      } else if (drink.size === 0) {
        setDrinkSize("");
        setDrinkSizePersonalized(0);
      } else {
        setDrinkSize("personalized");
        setDrinkSizePersonalized(drink.size);
      }

      setDrinkQuantity(drink.quantity);
    }
  }, [drink]);

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRefDrink}
      isOpen={isDrinkModalOpen}
      onClose={handleCloseModal}
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        background={modalBackground}
        color={modalTextColor}
        mx={{ base: 4, md: 0 }}
      >
        <ModalHeader>Drink</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={0}>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Drink Name</FormLabel>
              <Select
                placeholder="Select your drink"
                onChange={event => setDrinkName(event.target.value)}
                value={drinkName}
                ref={initialRef}
              >
                <option value="personalized">Personalized</option>
                {DRINK_NAMES.map(name => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </Select>
            </FormControl>
            {drinkName === "personalized" && (
              <FormControl>
                <FormLabel>Drink Name Personalized</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={BiRename} color="teal.500" />
                  </InputLeftElement>
                  <Input
                    onChange={event =>
                      setDrinkNamePersonalized(event.target.value)
                    }
                    value={drinkNamePersonalized}
                  />
                </InputGroup>
              </FormControl>
            )}
            <FormControl>
              <FormLabel>Drink Size</FormLabel>
              <Select
                placeholder="Select the size of your drink"
                onChange={event => setDrinkSize(event.target.value)}
                value={drinkSize}
              >
                <option value="personalized">Personalized</option>
                <option value="1000">Litrão (1L)</option>
                <option value="600">Garrafa (600ml)</option>
                <option value="550">Latão (550ml)</option>
                <option value="355">Long Neck (355ml)</option>
                <option value="350">Lata (350ml)</option>
                <option value="300">Garrafinha (300ml)</option>
              </Select>
            </FormControl>
            {drinkSize === "personalized" && (
              <FormControl>
                <FormLabel>Drink Size Personalized</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={BiRuler} color="teal.500" />
                  </InputLeftElement>
                  <NumberInput
                    value={drinkSizePersonalized}
                    onChange={(_valueString, valueNumber) =>
                      setDrinkSizePersonalized(valueNumber)
                    }
                    defaultValue={0.1}
                    precision={3}
                    min={0.001}
                    step={0.1}
                    w="100%"
                  >
                    <NumberInputField pl={10} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </InputGroup>
              </FormControl>
            )}
            <FormControl>
              <FormLabel>Drink Quantity</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={IoMdBeer} color="teal.500" />
                </InputLeftElement>
                <NumberInput
                  onChange={(_stringValue, numberValue) =>
                    setDrinkQuantity(numberValue)
                  }
                  value={drinkQuantity}
                  defaultValue={1}
                  step={1}
                  min={1}
                  w="100%"
                >
                  <NumberInputField pl={10} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Drink Cost</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={IoMdPricetags} color="teal.500" />
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
              Total of liters:{" "}
              <Text as="span" fontWeight="normal">
                {totalDrinkSize()}L
              </Text>
            </Text>
            <Text fontWeight="bold">
              Price Total:{" "}
              <Text as="span" fontWeight="normal">
                {totalDrinkPrice()}
              </Text>
            </Text>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={handleCloseModal}
            colorScheme="teal"
            variant="outline"
            mr={3}
          >
            Close
          </Button>
          <Button onClick={handleChangeDrink} colorScheme="teal">
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
