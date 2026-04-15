// <Routes>
//   <Route element={<BaseLayout />}>
//     <Route>
//       <Route index element={<StorePage />} />
//       <Route path="about" element={<AboutPage />} />
//     </Route>
//     <Route path="checkout">
//       <Route index element={<CartPage />} />
//       <Route path="success" element={<CheckoutSuccessPage />} />
//       <Route path="no" element={<LockedOutPage />} />
//     </Route>
//     <Route path="account">
//       <Route path="login" element={<LoginPage />} />
//       <Route path="register" element={<RegisterPage />} />
//     </Route>
//     <Route path="*" element={<ErrorPage />} />
//   </Route>
// </Routes>

const paths: Record<string, Record<string, string>> = {
  info: {
    about: "",
  },
  store: {
    base: "",
    cart: "",
    checkoutSuccess: "success",
    lockedOut: "no",
  },
  account: {
    login: "login",
    register: "register",
  },
};
export default paths;
