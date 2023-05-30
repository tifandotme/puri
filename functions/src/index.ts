import * as admin from "firebase-admin";
import { onCall } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2/options";
import serviceAccount from "./service-account-key.json";

setGlobalOptions({ maxInstances: 10 });

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL:
    "https://puri-systems-default-rtdb.asia-southeast1.firebasedatabase.app",
});

export const subscribeToTopic = onCall<{ token: string; userUid: string }>(
  async (req) => {
    const { token, userUid } = req.data;

    const ref = admin.database(app).ref(`users/${userUid}`).child("division");
    const division = (await ref.get()).val() as "logistik" | "sales";

    try {
      const messaging = admin.messaging(app);
      const response = await messaging.subscribeToTopic(token, division);

      return {
        text: `Subscribed to ${division} topic`,
        response: response,
      };
    } catch (error) {
      return {
        text: "Error subscribing to topic",
        error: error,
      };
    }
  }
);

export const sendOrderStatus = onCall<{ customer: string }>(async (req) => {
  const { customer } = req.data;

  const message: admin.messaging.MessagingPayload = {
    notification: {
      title: `Pesanan selesai`,
      body: `Pesanan untuk ${customer} telah sampai tujuan.`,
    },
  };

  const messaging = admin.messaging(app);
  const response = await messaging.sendToTopic("sales", message);

  return response;
});

// export const helloWorld = onRequest((req, res) => {
//   logger.info("Hello logs! F yeah", { structuredData: true });
//   res.send("Hello from Firebase!");
// });
