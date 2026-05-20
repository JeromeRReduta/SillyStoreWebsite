import { useEffect, useEffectEvent, useState, type JSX } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router";
import { ICartItemResponse } from "../../../SillyStoreCommon/dtos/cartItemDtos";
import frontendConfigs from "../../configs/FrontendConfigs";
import frontendLogger from "../../configs/frontendLogger";
import ErrorComponent from "../../utils/components/Error";
import FlatList from "../../utils/components/FlatList";
import Loading from "../../utils/components/Loading";
import css from "../css/cart.module.css";
import CartItemCard from "./CartItemCard";
import useAuth from "../../account/services/useAuth";
import useCart from "../services/useCart";
import useWebsiteCookies from "../../utils/services/useWebsiteCookies";

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
    const { isLoggedOut } = useAuth();
    const { localCart, status } = useCart();
    const navigate = useNavigate();
    const [{ locked_out }, _setCookie, _removeCookie] = useWebsiteCookies();

    const goToBadPlace = useEffectEvent(() => {
        if (locked_out) {
            void navigate(frontendConfigs.absolutePaths.internal.lockedOut);
        }
    });
    useEffect(() => {
        goToBadPlace();
    }, [locked_out]);

    frontendLogger.debug("THING: ", localCart);
    frontendLogger.debug("THING: ", status);
    if (isLoggedOut()) {
        return (
            <div className={css.cart_not_logged_in}>
                <Link to={frontendConfigs.absolutePaths.internal.login}>
                    Sign in to access your cart!
                </Link>
            </div>
        );
    }

    // if (status === "error") {
    //     return (
    //         <ErrorComponent
    //             message={`Sorry, something went wrong: ${error?.message ?? ""}`}
    //         />
    //     );
    // }
    // if (status === "pending") {
    //     return <Loading message={"Fetching cart..."} />;
    // }

    if (localCart.length === 0) {
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
                data={localCart}
                listClassName={css.cart_list}
                listItemClassName={css.cart_list_item}
                renderItem={(cartItem: Omit<ICartItemResponse, "orderId">) => (
                    <CartItemCard cartItem={cartItem} />
                )}
                keyExtractor={(cartItem: Omit<ICartItemResponse, "orderId">) =>
                    cartItem.productId
                }
            />
            <PurchaseButton />
        </>
    );
}

function PurchaseButton(): JSX.Element {
    const [_cookies, setCookie, _removeCookie] = useWebsiteCookies();

    const { purchaseAsync } = useCart();
    function sendMessageOrPunish(): void {
        if (Math.random() < 1 / 3) {
            setCookie("locked_out", "BOTTLE OF BAD LUCK");
        } else {
            alert(
                "Thanks for purchasing! Your order will arrive in [FOREVER] [HOURS]",
            );
        }
    }
    function handlePurchase(): void {
        void (async () => {
            await purchaseAsync();
            sendMessageOrPunish();
        })();
    }
    return (
        <button className={css.cart_purchase} onClick={handlePurchase}>
            Purchase
        </button>
    );
}
