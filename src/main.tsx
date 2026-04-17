import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { CookiesProvider } from "react-cookie";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <CookiesProvider defaultSetOptions={{ path: "/" }}>
                <App />
            </CookiesProvider>
        </BrowserRouter>
    </StrictMode>,
);
