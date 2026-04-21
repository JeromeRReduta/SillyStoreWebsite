import type { JSX } from "react";
import type { IProductResponse } from "../../../SillyStoreCommon/dtos/responses/IProductResponse";
import css from "../css/product-card.module.css"

export default function ProductCard({
    product
}: { product: IProductResponse }): JSX.Element {
    const { id, imageSrc, title, description, price } = product;
    return <div className={css.product_card}>STUB: {title}</div>
}
