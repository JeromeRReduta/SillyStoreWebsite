import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { CookiesProvider } from "react-cookie";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import MockAuthProvider from "../mocks/components/MockAuthProvider.tsx";
import MockCartProvider from "../mocks/components/MockCartProvider.tsx";
import App from "./App.tsx";
import JustAddedProvider from "./utils/components/JustAddedProvider.tsx";
import AuthProvider from "./account/data-storage/AuthProvider.tsx";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={new QueryClient()}>
                <CookiesProvider defaultSetOptions={{ path: "/" }}>
                    <MockCartProvider>
                        <AuthProvider>
                            <JustAddedProvider>
                                <App />
                            </JustAddedProvider>
                        </AuthProvider>
                    </MockCartProvider>
                </CookiesProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </StrictMode>,
);
