import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./account/data-storage/AuthProvider.tsx";
import JustAddedProvider from "./utils/components/JustAddedProvider.tsx";
import MockServices from "../mocks/MockServices.ts";
import {
    ICreateUserRequest,
    IGetUserByCredentialsRequest,
} from "../SillyStoreCommon/dtos/userDtos.ts";
import MockAuthProvider from "../mocks/components/MockAuthProvider.tsx";
import MockCartProvider from "../mocks/components/MockCartProvider.tsx";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={new QueryClient()}>
                <CookiesProvider defaultSetOptions={{ path: "/" }}>
                    <MockCartProvider>
                        <MockAuthProvider>
                            <JustAddedProvider>
                                <App />
                            </JustAddedProvider>
                        </MockAuthProvider>
                    </MockCartProvider>
                </CookiesProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </StrictMode>,
);
