import { useContext } from "react";
import { CartContextValues } from "../../src/store/components/CartContext";
import MockCartContext from "../data-storage/MockCartContext";

export default function useMockCart(): CartContextValues {
    const values: CartContextValues | null = useContext(MockCartContext);
    if (!values) {
        throw new Error("mock cart needs provider!");
    }
    return values;
}
