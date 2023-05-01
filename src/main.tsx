import { inject } from "@vercel/analytics";
//import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

if (import.meta.env.PROD) inject();

const rootElement = document.getElementById("root") as Element;

ReactDOM.createRoot(rootElement).render(
  //<StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  //</StrictMode>
);
