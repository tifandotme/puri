<!-- <p align="right">
  <picture>
    <img
      alt="GitHub commit activity"
      src="https://img.shields.io/github/commit-activity/m/tifandotme/puri"
    />
  </picture>
</p> -->
<p align="left">
  <picture>
    <img
      alt="Logo"
      src="https://raw.githubusercontent.com/tifandotme/puri/master/src/assets/logo.png"
      width="130px"
    />
  </picture>
</p>

**Puri** is an Order Management System created as part of my Bachelor's thesis, which [PT. WPU](http://ptwpu.com) utilizes to manage customer orders and internal processing.

<!--
puri.systems expires on Sunday 3th of February 2024

[puri-systems.web.app](https://puri-systems.web.app)
-->

## Stack

- **Libraries**: React, Chakra UI, React Router, React Hook Form, React Select, TanStack Table
- **Backend** Firebase (Authentication, Realtime Database, Cloud Messaging, Cloud Functions)
- **Hosting**: Vercel

## Run Locally

<details>
<summary>Click to open</summary>
<br/>

```bash
pnpm add -g firebase-tools

git clone https://github.com/tifandotme/puri
cd puri
pnpm install

pnpm run dev
firebase emulators:start --only auth,functions,database --import=./firebase-emulator --export-on-exit
```

Before running a local development server for this project, you need to modify a few things:

### `src/config/firebase.ts`

Provice your own Firebase configuration from **Firebase Console > Project settings > General**

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
```

</details>

## License

[MIT](https://github.com/tifandotme/puri/blob/master/LICENSE/)
