import type { JSX } from "react";
import ErrorComponent from "../../utils/components/Error";
import Loading from "../../utils/components/Loading";
import FlatList from "../../utils/components/FlatList";
import css from "../css/cart.module.css";
import CartItemCard from "./CartItemCard";
import { ICartItemResponse } from "../../../SillyStoreCommon/dtos/cartItemDtos";
import useMockGetPendingCart from "../../../mocks/hooks/useMockGetPendingCart";
import { data, Link } from "react-router";
import frontendConfigs from "../../configs/FrontendConfigs";
import useMockAuth from "../../../mocks/useMockAuth";
import useMockCart from "../../../mocks/hooks/useMockCart";
import frontendLogger from "../../configs/frontendLogger";

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
    const { isLoggedOut } = useMockAuth();
    const { data: cart, status, error, purchaseAsync } = useMockCart();

    function handlePurchase(): void {
        void (async () => {
            await purchaseAsync();
        })();
    }

    if (isLoggedOut()) {
        return (
            <div className={css.cart_not_logged_in}>
                <Link to={frontendConfigs.absolutePaths.internal.login}>
                    Sign in to access your cart!
                </Link>
            </div>
        );
    }
    if (status === "error") {
        return (
            <ErrorComponent
                message={`Sorry, something went wrong: ${error?.message ?? ""}`}
            />
        );
    }
    if (status === "pending" || cart === undefined) {
        return <Loading message={"Fetching cart..."} />;
    }
    if (cart.length === 0) {
        return (
            <>
                <div className={css.cart_empty}>
                    Add items to your cart to see them here.
                </div>
            </>
        );
    }
    // success case:
    return (
        <>
            <FlatList
                data={cart}
                listClassName={css.cart_list}
                listItemClassName={css.cart_list_item}
                renderItem={(cartItem: ICartItemResponse) => (
                    <CartItemCard cartItem={cartItem} />
                )}
                keyExtractor={(cartItem: ICartItemResponse) =>
                    cartItem.productId
                }
            />

            <button className={css.cart_purchase} onClick={handlePurchase}>
                Buy
            </button>
        </>
    );
}
