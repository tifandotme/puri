import ReactDOM from "react-dom/client";
// import { StrictMode } from "react";

import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root") as Element;

ReactDOM.createRoot(rootElement).render(
  // <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  // </StrictMode>
);
