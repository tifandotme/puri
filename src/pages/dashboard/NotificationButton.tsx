import { Button, useToast } from "@chakra-ui/react";
import { ref, runTransaction } from "firebase/database";
import { getToken } from "firebase/messaging";
import { useState } from "react";
import { MdOutlineNotificationAdd } from "react-icons/md";
import { auth, database, messaging } from "../../config/firebase";

export function NotificationButton({ ...props }: { [key: string]: any }) {
  const toast = useToast();
  const [isNotifHidden, setIsNotifHidden] = useState(
    ["denied", "granted"].includes(Notification.permission)
  );

  const requestNotification = () => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        setIsNotifHidden(true);

        getToken(messaging, {
          vapidKey:
            "BHewbe4EkolWmFVaUDr-gITWtGGUAk5t4qPRVDF4MQdPXMfTWvijKK5ScVF2WDt3sroMmu8jc_9d-n1FAkPSj2w",
        }).then(async (currentToken) => {
          await runTransaction(
            ref(database, `users/${auth?.currentUser?.uid}/token`),
            (data: string[] | null) => {
              if (data === null) {
                return [currentToken];
              }

              if (data.includes(currentToken)) {
                return data;
              }

              return [...data, currentToken];
            }
          );
        });
      } else {
        setIsNotifHidden(true);

        if (!toast.isActive("notif")) {
          toast({
            id: "notif",
            title: "Notifikasi tidak diizinkan",
            description:
              "Notifikasi seperti status pesanan tidak akan diterima.",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top",
            size: "sm",
          });
        }
      }
    });
  };

  return (
    <Button
      display={isNotifHidden ? "none" : "flex"}
      leftIcon={<MdOutlineNotificationAdd size={18} />}
      size="sm"
      variant="outline"
      onClick={requestNotification}
      borderRadius="full"
      {...props}
    >
      Izinkan Notifikasi
    </Button>
  );
}
