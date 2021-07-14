import { ChangeEvent } from "react";
import { Input, InputProps } from "@chakra-ui/react";

import { stringSplice } from "../utils";
import { padEnd } from "lodash";

type InputDrinkSizeMaskProps = InputProps & {
  drinkSizeInput: number;
  setDrinkSizeInput: (drinkSize: number) => void;
};

export function InputDrinkSizeMask({
  drinkSizeInput,
  setDrinkSizeInput,
  ...rest
}: InputDrinkSizeMaskProps) {
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
    const inputValueUnformatted = String(value)
      .trim()
      .replace(/[^0-9]/g, "");

    return stringSplice(padEnd(inputValueUnformatted, 4, "0"), -3, ".");
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
