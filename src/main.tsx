import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./account/data-storage/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={new QueryClient()}>
                <CookiesProvider defaultSetOptions={{ path: "/" }}>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </CookiesProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </StrictMode>,
);
