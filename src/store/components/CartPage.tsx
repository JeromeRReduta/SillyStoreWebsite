import { useState, type JSX } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router";
import { ICartItemResponse } from "../../../SillyStoreCommon/dtos/cartItemDtos";
import useMockCart from "../../../mocks/hooks/useMockCart";
import frontendConfigs from "../../configs/FrontendConfigs";
import frontendLogger from "../../configs/frontendLogger";
import ErrorComponent from "../../utils/components/Error";
import FlatList from "../../utils/components/FlatList";
import Loading from "../../utils/components/Loading";
import css from "../css/cart.module.css";
import CartItemCard from "./CartItemCard";
import useAuth from "../../account/services/useAuth";

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
    const [_cookies, setCookies, _removeCookies] = useCookies<
        "locked_out",
        { locked_out: string }
    >(["locked_out"]);
    const { isLoggedOut } = useAuth();
    const navigate = useNavigate();
    const { data: cart, status, error, purchase } = useMockCart();
    const [disabled, setDisabled] = useState<boolean>(false);
    const [buttonText, setButtonText] = useState<string>("Buy");

    function handlePurchase(): void {
        purchase();
        setDisabled(true);
        setButtonText(
            "Your purchase has been sent! Enjoy your order in [FOREVER] business days!",
        );

        const isUrBad = Math.random() < 0.5;
        frontendLogger.debug("bad roll? ", isUrBad);
        if (isUrBad) {
            setCookies("locked_out", "BOTTLE OF BAD LUCK");
            void navigate(frontendConfigs.absolutePaths.internal.lockedOut);
        }
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

            <button
                className={css.cart_purchase}
                disabled={disabled}
                onClick={handlePurchase}
            >
                {buttonText}
            </button>
        </>
    );
}
