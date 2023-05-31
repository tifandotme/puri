/* eslint-disable no-undef */
// Scripts for firebase and firebase messaging
// prettier-ignore
importScripts("https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js");
// prettier-ignore
importScripts("https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js");

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyD6eq4vdO_B0ivZN5oa68W97f_hSd0lMuk",
  projectId: "puri-systems",
  authDomain: "puri-systems.firebaseapp.com",
  storageBucket: "puri-systems.appspot.com",
  messagingSenderId: "684555146850",
  appId: "1:684555146850:web:158162497d3aff2b73233b",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  // const notificationTitle = payload.notification.title;
  // const notificationOptions = {
  //   body: payload.notification.body,
  // };

  // self.registration.showNotification(notificationTitle, notificationOptions);
});
