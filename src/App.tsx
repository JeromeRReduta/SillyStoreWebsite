import "./App.css";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route>
          <Route index element={<StorePage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
        <Route path="checkout">
          <Route index element={<CartPage />} />
          <Route path="success" element={<CheckoutSuccessPage />} />
          <Route path="no" element={<LockedOutPage />} />
        </Route>
        <Route path="account">
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
