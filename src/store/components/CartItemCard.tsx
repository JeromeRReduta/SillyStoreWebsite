import type { JSX } from "react";
import css from "../css/cart-item-card.module.css";
import type { ICartItem } from "../entities/ICartItem";

export default function CartItemCard({
    cartItem: { imageSrc, title, description, price, quantity },
}: {
    cartItem: ICartItem;
}): JSX.Element {
    return (
        <section className={css.cart_item_card}>
            <div>{imageSrc}</div>
            <div>{title}</div>
            <div>{description}</div>
            <div>{price}</div>
            <div>{quantity}</div>
        </section>
    );
}
