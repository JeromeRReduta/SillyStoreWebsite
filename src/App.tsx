import { Routes, Route } from "react-router";
import LoginPage from "./account/components/LoginPage";
import RegisterPage from "./account/components/RegisterPage";
import ErrorPage from "./error/ErrorPage";
import AboutPage from "./info/AboutPage";
import BaseLayout from "./layouts/BaseLayout";
import CartPage from "./store/components/CartPage";
import CheckoutSuccessPage from "./store/components/CheckoutSuccessPage";
import LockedOutPage from "./store/components/LockedOutPage";
import StorePage from "./store/components/StorePage";
import frontendConfigs from "./configs/FrontendConfigs";

export default function App() {
    const { about, checkoutSuccess, lockedOut, login, register } =
        frontendConfigs.absolutePaths.internal;

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
