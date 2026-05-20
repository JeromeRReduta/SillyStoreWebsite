import type { JSX } from "react";
import { ICartItemResponse } from "../../../SillyStoreCommon/dtos/cartItemDtos";
import ArrowSvg from "../../assets/right-arrow.svg?react";
import css from "../css/cart-item-card.module.css";
import useCart from "../services/useCart";

export default function CartItemCard({
    cartItem: { imageSrc, price, productId, quantity, title },
}: {
    cartItem: Omit<ICartItemResponse, "orderId">;
}): JSX.Element {
    const { adjustProductQuantity } = useCart();

    return (
        <section className={css.cart_item_card}>
            <div className={css.cart_item_card_img_container}>
                <img
                    className={css.cart_item_card_img}
                    src={imageSrc}
                    alt={title}
                />
            </div>
            <h1 className={css.cart_item_card_title}>{title}</h1>
            <div className={css.cart_item_card_quantity_bar}>
                <div
                    className={css.cart_item_card_decrement_arrow}
                    onClick={() => {
                        adjustProductQuantity(productId, -1);
                    }}
                >
                    <ArrowSvg />
                </div>
                <div className={css.cart_item_card_quantity}>{quantity}</div>
                <div
                    className={css.cart_item_card_increment_arrow}
                    onClick={() => {
                        adjustProductQuantity(productId, 1);
                    }}
                >
                    <ArrowSvg />
                </div>
            </div>
            <div className={css.cart_item_card_price}>{price}</div>
        </section>
    );
}
