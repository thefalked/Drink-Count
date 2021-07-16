import { ChangeEvent, MutableRefObject } from "react";
import { Input, InputProps } from "@chakra-ui/react";

import { stringSplice } from "../utils";
import { useLocale } from "../hooks/useLocale";

type InputMoneyMaskProps = InputProps & {
  moneyInput: number;
  setMoneyInput: (money: number) => void;
  initialRef: MutableRefObject<null>;
};

export function InputMoneyMask({
  moneyInput,
  setMoneyInput,
  initialRef,
  ...rest
}: InputMoneyMaskProps) {
  const { formatMoney } = useLocale();

  function removeFormat(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target as HTMLInputElement;

    const inputValueUnformatted = value.trim().replace(/[^0-9]/g, "");

    if (inputValueUnformatted === "") {
      return setMoneyInput(0);
    }

    const valueWithDot = stringSplice(inputValueUnformatted, -2, ".");

    setMoneyInput(Number(valueWithDot));
  }

  return (
    <Input
      pattern="[0-9]*"
      inputMode="numeric"
      onChange={event => removeFormat(event)}
      value={formatMoney(moneyInput)}
      ref={initialRef}
      {...rest}
    />
  );
}
