import { ChangeEvent } from "react";
import { Input, InputProps } from "@chakra-ui/react";

import { stringSplice } from "../utils";
import { useLocale } from "../hooks/useLocale";

type InputMoneyMaskProps = InputProps & {
  moneyInput: number;
  setMoneyInput: (money: number) => void;
};

export function InputMoneyMask({
  moneyInput,
  setMoneyInput,
  ...rest
}: InputMoneyMaskProps) {
  const { formatMoney } = useLocale();

  function removeFormat(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target as HTMLInputElement;

    const inputValueUnformatted = value.replace(/[^0-9]/g, "");

    const valueWithDot = stringSplice(inputValueUnformatted, -2, ".");

    setMoneyInput(Number(valueWithDot));
  }

  return (
    <Input
      pattern="[0-9]*"
      inputmode="numeric"
      onChange={event => removeFormat(event)}
      value={formatMoney(moneyInput)}
      {...rest}
    />
  );
}
