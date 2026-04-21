import css from "../css/product-card.module.css";
import type { IProductResponse } from "../../../SillyStoreCommon/dtos/responses/IProductResponse";
import type { JSX } from "react";


export default function ProductCard({
    product
}: { product: IProductResponse }): JSX.Element {
    const { id, imageSrc, title, description, price } = product;
    return <div className={css.product_card}>STUB: {title}</div>
}
