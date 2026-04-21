import { Routes, Route } from "react-router";
import LoginPage from "./account/LoginPage";
import RegisterPage from "./account/RegisterPage";
import ErrorPage from "./error/ErrorPage";
import AboutPage from "./info/AboutPage";
import BaseLayout from "./layouts/BaseLayout";
import paths from "./routing/Paths";
import CartPage from "./store/components/CartPage";
import CheckoutSuccessPage from "./store/components/CheckoutSuccessPage";
import LockedOutPage from "./store/components/LockedOutPage";
import StorePage from "./store/components/StorePage";

export default function App() {
    const {
        store: { lockedOut, checkoutSuccess },
        info: { about },
        account: { login, register },
    } = paths;

    return (
        <Routes>
            <Route element={<BaseLayout />}>
                <Route>
                    <Route index element={<StorePage />} />
                    <Route path={about} element={<AboutPage />} />
                </Route>
                <Route path="checkout">
                    <Route index element={<CartPage />} />
                    <Route
                        path={checkoutSuccess}
                        element={<CheckoutSuccessPage />}
                    />
                </Route>
                <Route path="account">
                    <Route path={login} element={<LoginPage />} />
                    <Route path={register} element={<RegisterPage />} />
                </Route>
                <Route path="*" element={<ErrorPage />} />
            </Route>
            <Route path={lockedOut} element={<LockedOutPage />} />;
        </Routes>
    );
}
