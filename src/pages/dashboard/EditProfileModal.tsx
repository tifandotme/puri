import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { User as UserAuth, updateProfile } from "firebase/auth";
import { child, get, ref, update } from "firebase/database";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { database } from "../../config/firebase";
import { capitalizeWords } from "../../utils/misc";

type EditProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userAuth: UserAuth;
};

/**
 * Modal to show edit profile form
 */
const EditProfileModal = memo(function DM({
  isOpen,
  onClose,
  userAuth,
}: EditProfileModalProps) {
  const toast = useToast({
    duration: 3000,
  });

  const [user, setUser] = useState<User | undefined>(undefined);
  useEffect(() => {
    if (isOpen) return;

    get(child(ref(database, "users"), `${userAuth.uid}`)).then((snapshot) => {
      setUser(snapshot.val() as User);
    });
  }, [userAuth, isOpen]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<EditUserForm>({
    defaultValues: user,
  });

  // reset field when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        reset();
      }, 700);
    }
  }, [isOpen]);

  const onSubmit = handleSubmit(async (data) => {
    await update(child(ref(database, "users"), `${userAuth.uid}`), data);
    await updateProfile(userAuth, {
      displayName: `${data.firstName} ${data.lastName}`,
    });

    toast({
      title: "Profil berhasil diperbarui",
      status: "success",
    });

    onClose();
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", sm: "md" }}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalBody>
            <Stack w="full" px="6">
              <Text>
                Halo, <strong>{userAuth.displayName}</strong>!
                <br />
                <br />
                Email Anda: <strong>{userAuth.email}</strong> <br />
                Divisi Anda:{" "}
                <strong>{user && capitalizeWords(user.division)}</strong>
                <br />
                <br />
                Untuk mengubah nama, silakan isi form di bawah ini.
              </Text>

              <InputGroup>
                <InputLeftAddon border="0" bg="white" w="40">
                  Nama Depan
                </InputLeftAddon>
                <Input
                  variant="flushed"
                  type="text"
                  {...register("firstName")}
                  defaultValue={user?.firstName}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon border="0" bg="white" w="40">
                  Nama Belakang
                </InputLeftAddon>
                <Input
                  variant="flushed"
                  type="text"
                  {...register("lastName")}
                  defaultValue={user?.lastName}
                />
              </InputGroup>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Stack
              direction={{ base: "column", sm: "row" }}
              w="full"
              mt="10"
              justifyContent="flex-end"
            >
              <Button
                variant="outline"
                onClick={onClose}
                colorScheme="gray"
                w="full"
                maxW={{ base: "sm", sm: "24" }}
              >
                Tutup
              </Button>

              <Button
                type="submit"
                colorScheme="green"
                isLoading={isSubmitting}
                isDisabled={!isDirty}
                w="full"
                maxW={{ base: "sm", sm: "24" }}
              >
                Simpan
              </Button>
            </Stack>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
});

export default EditProfileModal;
