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
  const { isAlertOpen, drink, handleAlertClose, confirmRemoveDrink } =
    useAlert();

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
          <AlertDialogHeader>Delete Drink?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete{" "}
            <strong>{drink?.name.toUpperCase()}</strong> ?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={handleAlertClose}>
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
