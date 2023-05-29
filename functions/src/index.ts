/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// import { initializeApp } from 'firebase-admin/app';

// const app = initializeApp();

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs! F yeah", {structuredData: true});
  response.send("Hello from Firebase! Wohoo!ss");
});

// subscribe registration token to topic
// export const subscribeToTopic = onRequest(async (request, response) => {
//   const {token, topic} = request.body;
//   await admin.messaging().subscribeToTopic(token, topic);
//   response.send(`subscribed to ${topic}`);
// }
