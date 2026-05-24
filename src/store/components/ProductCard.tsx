import { type JSX } from "react";
import { useNavigate } from "react-router";
import { IProductResponse } from "../../../SillyStoreCommon/dtos/productDtos";
import useAuth from "../../account/services/useAuth";
import frontendConfigs from "../../configs/FrontendConfigs";
import frontendLogger from "../../configs/frontendLogger";
import priceToText from "../../utils/priceToText";
import useJustAdded from "../../utils/services/useJustAdded";
import css from "../css/product-card.module.css";
import useCart from "../services/useCart";

export default function ProductCard({
    product,
}: {
    product: IProductResponse;
}): JSX.Element {
    const { imageSrc, title } = product;
    const maxTitleLength: number = frontendConfigs.limits.titleLength;
    const { emit } = useJustAdded();

    /**
     * If not logged in, should just show prices
     * If you ARE logged in, should add quantity bar to it like in cart-item card thing
     * Incrementing & decrementing should affect cart as well
     * In fact, might want to make it the same structurally - just w/ different css
     *
     * Edit: scratch that - make it so button does diff things based on login status:
     *  Not logged in: => sign in page
     *  Logged in: emit & update cart state
     *
     */
    // const { disabled, text } = buttonInfo;
    const { isLoggedOut } = useAuth();
    const navigate = useNavigate();

    function handleAddToCart(): void {
        if (isLoggedOut()) {
            void navigate(frontendConfigs.absolutePaths.internal.login);
            return;
        }
        emit(product);
    }
    frontendLogger.info("AH", title.length, maxTitleLength);
    const truncatedTitle: string =
        title.length <= maxTitleLength
            ? title
            : title.substring(0, maxTitleLength) + "...";
    return (
        <div className={css.product_card}>
            <div className={css.product_card_img_container}>
                <img
                    className={css.product_card_img}
                    src={imageSrc}
                    alt="image"
                />
            </div>
            <h3 className={css.product_card_title}>{truncatedTitle}</h3>
            <BuyNowButton product={product} />
        </div>
    );
}

function BuyNowButton({ product }: { product: IProductResponse }): JSX.Element {
    const { price } = product;
    const { isLoggedOut } = useAuth();
    const navigate = useNavigate();
    const { localCart, upsertIntoLocalCart } = useCart();
    const { emit } = useJustAdded();
    const disabled: boolean = localCart.some(
        (item) => item.productId === product.id,
    );
    const priceStr: string = priceToText(price);
    const text: string = disabled ? `${priceStr}\n(In Cart)` : priceStr;

    function handleAddToCart() {
        if (isLoggedOut()) {
            void navigate(frontendConfigs.absolutePaths.internal.login);
            return;
        }
        emit(product);
        upsertIntoLocalCart({
            ...product,
            quantity: 1,
            productId: product.id,
        });
    }

    return (
        <button
            className={css.product_card_buy_now}
            disabled={disabled}
            onClick={handleAddToCart}
        >
            {text}
        </button>
    );
}
