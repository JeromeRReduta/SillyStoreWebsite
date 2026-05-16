import type { JSX } from "react";
import css from "../css/cart-item-card.module.css";
import { ICartItem } from "../../../SillyStoreCommon/domain-objects/CartItem";
import ArrowSvg from "../../assets/right-arrow.svg?react";

// TODO - holy shit refactor this & css
export default function CartItemCard({
    cartItem: { imageSrc, price, quantity, title },
}: {
    cartItem: ICartItem;
}): JSX.Element {
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
                <div className={css.cart_item_card_decrement_arrow}>
                    <ArrowSvg />
                </div>
                <div className={css.cart_item_card_quantity}>{quantity}</div>
                <div className={css.cart_item_card_increment_arrow}>
                    <ArrowSvg />
                </div>
            </div>
            <div className={css.cart_item_card_price}>{price}</div>
        </section>
    );
}
