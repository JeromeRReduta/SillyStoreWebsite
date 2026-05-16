import { createContext } from "react";
import { CartContextValues } from "../../src/store/components/CartContext";

const MockCartContext = createContext<CartContextValues | null>(null);
export default MockCartContext;
