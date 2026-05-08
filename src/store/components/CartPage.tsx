import type { JSX } from "react";
import mockProduct from "../../../mocks/MockProduct";
import ErrorComponent from "../../utils/components/Error";
import Loading from "../../utils/components/Loading";
import FlatList from "../../utils/components/FlatList";
import type { IProductResponse } from "../../../SillyStoreCommon/dtos/responses/IProductResponse";
import css from "../css/cart.module.css";
import useCart from "../services/useCart";
import CartItemCard from "./CartItemCard";

/** TODO:
 *
 *
 * Backend:
 * * orders should have new column: status = "pending" | "completed" | "canceled"
 * * make unique index pending_order ON table orders (user_id) WHERE (status = "PENDING")
 * * make way to get user's pending order (or return null if entity not found)
 * Frontend:
 * * make useMutation for cart data - 1 usemutation/action:
 * * useMutation: change user token, run query again - run when user logs in or out
 * * useMutation: update values in db - run when user logs out or when we finalize order
 *      - should be able to update both the values of order-products (i.e. cart items) and
 *          the order status
 *
 *
 *
 */
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
