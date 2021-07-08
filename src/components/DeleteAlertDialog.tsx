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

export function DeleteAlertDialog() {
  const { isOpen, drink, onClose, confirmRemoveDrink } = useAlert();

  const cancelRef = useRef(null);

  const alertDialogBackground = useColorModeValue("gray.100", "gray.700");
  const alertDialogColor = useColorModeValue("gray.700", "gray.100");

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        colorScheme="teal"
      >
        <AlertDialogOverlay />

        <AlertDialogContent backgroundColor={alertDialogBackground}>
          <AlertDialogHeader color={alertDialogColor}>
            Delete Drink?
          </AlertDialogHeader>
          <AlertDialogCloseButton color={alertDialogColor} />
          <AlertDialogBody color={alertDialogColor}>
            Are you sure you want to delete{" "}
            <strong>{drink?.name.toUpperCase()}</strong> ?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No, keep it
            </Button>
            <Button colorScheme="red" ml={3} onClick={confirmRemoveDrink}>
              Yes, remove it
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
