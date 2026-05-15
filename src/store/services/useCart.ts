import { useContext } from "react";
import CartContext, { CartContextValues } from "../components/CartContext";

export default function useCart(): CartContextValues {
    const values: CartContextValues | null = useContext(CartContext);
    if (!values) {
        throw new Error("cart provider required");
    }
    return values;
}
