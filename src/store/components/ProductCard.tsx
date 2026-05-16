import css from "../css/product-card.module.css";
import { useEffect, useEffectEvent, useState, type JSX } from "react";
import frontendConfigs from "../../configs/FrontendConfigs";
import useJustAdded from "../../utils/services/useJustAdded";
import { IProductResponse } from "../../../SillyStoreCommon/dtos/productDtos";
import useAuth from "../../account/services/useAuth";
import { useNavigate } from "react-router";
import useMockCart from "../../../mocks/hooks/useMockCart";
import useCart from "../services/useCart";
import { ICartItemResponse } from "../../../SillyStoreCommon/dtos/cartItemDtos";

export default function ProductCard({
    product,
}: {
    product: IProductResponse;
}): JSX.Element {
    const { imageSrc, title, description, price } = product;
    const descriptionLength: number = frontendConfigs.limits.descriptionLength;
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
    const { updateCartItemQuantity } = useCart();

    function handleAddToCart(): void {
        if (isLoggedOut()) {
            void navigate(frontendConfigs.absolutePaths.internal.login);
            return;
        }
        emit(product);
        // setButtonInfo({
        //     disabled: true,
        //     text: `$${price.toFixed(2)} (in cart)`,
        // });
    }
    const truncatedDescription: string =
        description.length < descriptionLength
            ? description
            : description.substring(0, descriptionLength) + "...";
    return (
        <div className={css.product_card}>
            <div className={css.product_card_img_container}>
                <img
                    className={css.product_card_img}
                    src={imageSrc}
                    alt="image"
                />
            </div>
            <h3 className={css.product_card_title}>{title}</h3>
            {/* <div className={css.product_card_description}>
                {truncatedDescription}
            </div> */}
            <BuyNowButton product={product} />
        </div>
    );
}
interface IButtonInfo {
    readonly disabled: boolean;
    readonly text: string;
    // readonly onClick: (() => void) | undefined;
}
function BuyNowButton({ product }: { product: IProductResponse }): JSX.Element {
    const { id, price } = product;
    const { isLoggedIn, isLoggedOut } = useAuth();
    const navigate = useNavigate();
    const { data, updateCartItemQuantity } = useCart();
    const { emit } = useJustAdded();
    // const [buttonInfo, setButtonInfo] = useState<IButtonInfo>({
    //     disabled: false,
    //     text: "",
    //     onClick: undefined,
    // });

    const isInPendingCart =
        isLoggedIn() &&
        !!data &&
        data.some((cartItem: ICartItemResponse) => id === cartItem.productId);

    const initButtonState: IButtonInfo = isInPendingCart
        ? {
              disabled: true,
              text: `$${price.toFixed(2)} (IN CART)`,
          }
        : {
              disabled: false,
              text: `$${price.toFixed(2)}`,
          };

    const [{ disabled, text }, setButtonInfo] =
        useState<IButtonInfo>(initButtonState);
    // const updateButton = useEffectEvent(() => {
    //     if (isLoggedOut()) {
    //         setButtonInfo({
    //             disabled: false,
    //             text: `$${price.toFixed(2)}`,
    //             onClick: () => {
    //                 void navigate(frontendConfigs.absolutePaths.internal.login);
    //             },
    //         });
    //     } else if (
    //         !data?.some((item: ICartItemResponse) => item.productId === id)
    //     ) {
    //         setButtonInfo({
    //             disabled: false,
    //             text: `$${price.toFixed(2)}`,
    //             onClick: () => {
    //                 updateCartItemQuantity(id, 1);
    //                 setButtonInfo({
    //                     disabled: true,
    //                     text: `$${price.toFixed(2)} (In Cart)`,
    //                     onClick: undefined,
    //                 });
    //             },
    //         });
    //     } else {
    //         // base case: item already exists in your cart
    //         setButtonInfo({
    //             disabled: true,
    //             text: `$${price.toFixed(2)} (In Cart)`,
    //             onClick: undefined,
    //         });
    //     }
    // });
    // useEffect(() => {updateButton()}, [data]);

    function handleAddToCart() {
        if (isLoggedOut()) {
            void navigate(frontendConfigs.absolutePaths.internal.login);
            return;
        }
        setButtonInfo({
            disabled: true,
            text: `$${price.toFixed(2)}\n(In Cart)`,
        });
        emit(product);
        updateCartItemQuantity(id, 1);
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
