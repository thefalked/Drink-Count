import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

import { useAlert } from "../hooks/useAlert";
import { useTranslation } from "next-i18next";

export function DeleteAlertDialog() {
  const { isAlertOpen, drink, handleAlertClose, confirmRemoveDrink } =
    useAlert();
  const { t } = useTranslation("delete_alert_dialog");

  const cancelRef = useRef(null);

  const alertDialogBackground = useColorModeValue("gray.100", "gray.700");
  const alertDialogColor = useColorModeValue("gray.700", "gray.100");

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={handleAlertClose}
        isOpen={isAlertOpen}
        isCentered
        colorScheme="teal"
      >
        <AlertDialogOverlay />

        <AlertDialogContent
          backgroundColor={alertDialogBackground}
          color={alertDialogColor}
        >
          <AlertDialogHeader>{t("AlertDialogHeader")}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {t("AlertDialogBody")} <strong>{drink?.name.toUpperCase()}</strong>{" "}
            ?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={handleAlertClose}>
              {t("AlertDialogFooter-cancel")}
            </Button>
            <Button colorScheme="red" ml={3} onClick={confirmRemoveDrink}>
              {t("AlertDialogFooter-confirm")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
