import { Button, ButtonProps, useToast } from "@chakra-ui/react";
import { httpsCallable } from "firebase/functions";
import { getToken } from "firebase/messaging";
import { useState } from "react";
import { MdOutlineNotificationAdd } from "react-icons/md";
import { auth, functions, messaging } from "../../config/firebase";

export function NotificationButton({ ...props }: ButtonProps) {
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
          // write to database at /users
          // await runTransaction(
          //   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          //   ref(database, `users/${auth.currentUser!.uid}/notificationTokens`),
          //   (data: string[] | null) => {
          //     if (data === null) {
          //       return [currentToken];
          //     }

          //     if (data.includes(currentToken)) {
          //       return data;
          //     }

          //     return [...data, currentToken];
          //   }
          // );

          // call function to subscribe to topic
          const subscribeToTopic = httpsCallable(functions, "subscribeToTopic");

          const response = await subscribeToTopic({
            token: currentToken,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            userUid: auth.currentUser!.uid,
          });

          console.log(response);
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
      isDisabled={!auth.currentUser}
      display={isNotifHidden ? "none" : "flex"}
      leftIcon={<MdOutlineNotificationAdd size={20} />}
      variant="outline"
      onClick={requestNotification}
      borderRadius="full"
      {...props}
    >
      Izinkan Notifikasi
    </Button>
  );
}
