<p align="center">
  <picture>
    <img
      alt="Logo"
      src="./src/assets/logo.png"
      width="130px"
    />
  </picture>
</p>
<br/>

**Puri** is an Order Management System developed for a logistics company in Semarang. The application successfully transformed the customer order processing workflow, replacing the outdated physical whiteboard-based system with a modern web-based solution. This transition enabled real-time data display and push notifications, facilitating seamless coordination between the sales and logistics divisions.

<!--
Self note:
puri.systems will expire on Sunday 3th of February 2024. When that happens, change to puri.tifan.me
-->

## Features

- Dashboard
- Add new customers and orders
- Modify/remove customers and orders
- See data changes in real-time and receive push notifications when it does
- PWA-compliant, so the app is installable

## Tech Stack

**Client**: React, Chakra UI, React Router, React Hook Form, React Select, TanStack Table

**Server**: Firebase (Authentication, Realtime Database, Cloud Messaging, Cloud Functions)

## Usage

If you want to try out this demo app, follow this instructions:

1. Visit [puri.systems](https://puri.systems)
   > A popup will appear prompting you to choose to log in from either **logistik** or **sales** demo account
2. Login with a **logistik** account.
3. Open up another browser window (or another device if you can). Repeat step 1-2, but this time, choose to login with a **sales** account.
4. Allow notification by pressing the bell icon on top-left.
5. From a **sales** account, you have the ability to create/modify entries, be it customers or orders. Create/modify as you like!
6. From a **logistik** account, you can't modify entries, but you can change the order status. Try changing one of the switch.
7. From **sales** account perspective, in real-time they will receive push notifications.

> Notification type will differ depending on whether the window is in focus or minimized. When in focus, an in-app notification will appear, conversely, a system push notification will appear when window is not in focus

## Run Locally

<details>
<summary>Click to open</summary>
<br/>

Make sure you have these programs installed: Git, Node, Java SDK (for firebase emulator), pnpm

Clone repository

```bash
git clone https://github.com/tifandotme/puri
```

Install dependencies

```bash
pnpm install
```

Run development server

```bash
pnpm run dev
```

Run Firebase Emulator

```bash
pnpm run emulator
```

Access at http://localhost:3000

<!-- Before running a local development server for this project, you need to modify a few things:

### `src/config/firebase.ts`

Provide your own Firebase configuration from **Firebase Console > Project settings > General**

```typescript
const firebaseConfig: FirebaseOptions = {
  apiKey: "API_KEY",
  projectId: "PROJECT_ID",
  authDomain: "AUTH_DOMAIN",
  storageBucket: "STORAGE_BUCKET",
  messagingSenderId: "MESSAGING_ID",
  appId: "APP_ID",
  databaseURL: "DATABASE_URL",
};
```

### `functions/src/config/index.ts`

Provide your own service account key from **Firebase Console > Project settings > Service accounts** in order for Firebase Admin SDK to work.

```typescript
import serviceAccount from "./service-account-key.json";
``` -->

</details>

## License

[MIT](https://github.com/tifandotme/puri/blob/master/LICENSE/)
