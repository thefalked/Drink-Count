import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";
import { Input, InputProps } from "@chakra-ui/react";
import { ceil, floor, padEnd } from "lodash";

import { useLocale } from "../hooks/useLocale";

import { stringSplice } from "../utils";
import { useDrink } from "../hooks/useDrink";

type InputDrinkSizeMaskProps = InputProps & {
  drinkSizeInput: number;
  setDrinkSizeInput: Dispatch<SetStateAction<number>>;
};

export function InputDrinkSizeMask({
  drinkSizeInput,
  setDrinkSizeInput,
  ...rest
}: InputDrinkSizeMaskProps) {
  const { isLiter } = useLocale();
  const { findDrink, changeDrink } = useDrink();

  function removeFormat(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target as HTMLInputElement;

    const inputValueUnformatted = value.trim().replace(/[^0-9]/g, "");

    if (inputValueUnformatted === "") {
      return setDrinkSizeInput(0);
    }

    const valueWithDot = stringSplice(inputValueUnformatted, -3, ".");

    setDrinkSizeInput(Number(valueWithDot));
  }

  function formatDrinkSize(value: number): string {
    const inputValueUnformatted = String(value).replace(/[^0-9]/g, "");

    const numberOfDecimal = 3;

    // Rounds UP the value and get it's length + numbers of decimal.
    const minOfDecimal = String(ceil(value)).length + numberOfDecimal;

    return stringSplice(
      padEnd(inputValueUnformatted, minOfDecimal, "0"),
      -3,
      "."
    );
  }

  return (
    <Input
      pattern="[0-9]*"
      inputMode="numeric"
      onChange={event => removeFormat(event)}
      value={formatDrinkSize(drinkSizeInput)}
      {...rest}
    />
  );
}
