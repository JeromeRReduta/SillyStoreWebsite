import "./App.css";
import { Route, Routes } from "react-router";
import paths from "./routing/Paths";

function App() {
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
          <Route path={checkoutSuccess} element={<CheckoutSuccessPage />} />
          <Route path={lockedOut} element={<LockedOutPage />} />
        </Route>
        <Route path="account">
          <Route path={login} element={<LoginPage />} />
          <Route path={register} element={<RegisterPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
