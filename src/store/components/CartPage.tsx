import type { JSX } from "react";
import mockProduct from "../../mocks/MockProduct";
import ErrorComponent from "../../utils/components/Error";
import Loading from "../../utils/components/Loading";
import FlatList from "../../utils/components/FlatList";
import type { IProductResponse } from "../../../SillyStoreCommon/dtos/responses/IProductResponse";
import css from "../css/cart.module.css";
import useCart from "../services/useCart";
import CartItemCard from "./CartItemCard";

export default function CartPage(): JSX.Element {
    const {
        data: cart,
        status,
        error,
    } = useCart(async () => {
        return Array.from({ length: 10 }, (_, i) => {
            return { ...mockProduct(i), quantity: i };
        });
    });

    if (status === "error") {
        return (
            <ErrorComponent
                message={`Sorry, something went wrong: ${error.message}`}
            />
        );
    }
    if (status === "pending") {
        return <Loading message={"Fetching cart..."} />;
    }
    // success case:
    return (
        <>
            <FlatList
                data={cart}
                listClassName={css.cart_list}
                listItemClassName={css.cart_list_item}
                renderItem={(
                    cartItem: IProductResponse & { quantity: number },
                ) => <CartItemCard cartItem={cartItem} />}
                keyExtractor={(
                    cartItem: IProductResponse & { quantity: number },
                ) => cartItem.id}
            />
        </>
    );
}
