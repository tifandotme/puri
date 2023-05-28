import { inject } from "@vercel/analytics";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

if (import.meta.env.PROD) inject({ mode: "production" });

const rootElement = document.getElementById("root") as Element;

ReactDOM.createRoot(rootElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
