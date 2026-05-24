import { useEffect, useEffectEvent, type JSX } from "react";
import { Link, useNavigate } from "react-router";
import { ICartItemResponse } from "../../../SillyStoreCommon/dtos/cartItemDtos";
import useAuth from "../../account/services/useAuth";
import frontendConfigs from "../../configs/FrontendConfigs";
import frontendLogger from "../../configs/frontendLogger";
import FlatList from "../../utils/components/FlatList";
import useWebsiteCookies from "../../utils/services/useWebsiteCookies";
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
    const { localCart } = useCart();

    const { purchaseAsync } = useCart();
    function sendMessageOrPunish(): void {
        const badItemNamesInCart: string[] = localCart
            .map((item) => item.title)
            .filter(
                (title) =>
                    title === "34 Square Feet of Human Skin" ||
                    title === "Unethically Sourced Bones",
            );
        if (badItemNamesInCart.length === 0) {
            alert(
                "Purchase confirmed! Your order will arrive in [FOREVER] [YEARS].",
            );
            return;
        }
        const lockedOutValue = badItemNamesInCart.join(" AND ");
        setCookie("locked_out", lockedOutValue);
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
