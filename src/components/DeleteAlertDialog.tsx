import { useRef, useState } from "react";
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

export function DeleteAlertDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);

  const alertDialogBackground = useColorModeValue("brand.500", "gray.700");

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Show Alert</Button>
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
          <AlertDialogHeader color="gray.700">Delete Drink?</AlertDialogHeader>
          <AlertDialogCloseButton color="gray.700" />
          <AlertDialogBody color="gray.700">
            Are you sure you want to delete this drink?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" ml={3}>
              Remove
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
