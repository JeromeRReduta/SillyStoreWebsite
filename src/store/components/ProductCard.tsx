import css from "../css/product-card.module.css";
import type { IProductResponse } from "../../../SillyStoreCommon/dtos/responses/IProductResponse";
import type { JSX } from "react";
import frontendConfigs from "../../configs/FrontendConfigs";

export default function ProductCard({
    product,
}: {
    product: IProductResponse;
}): JSX.Element {
    const { imageSrc, title, description, price } = product;
    const descriptionLength: number = frontendConfigs.limits.descriptionLength;
    const truncatedDescription: string =
        description.length < descriptionLength
            ? description
            : description.substring(0, descriptionLength) + "...";
    return (
        <div className={css.product_card}>
            <div className={css.product_card_title}>{title}</div>
            <div className={css.product_card_img_container}>
                <img
                    className={css.product_card_img}
                    src={imageSrc}
                    alt="image"
                />
            </div>
            <div className={css.product_card_description}>
                {truncatedDescription}
            </div>
            <div className={css.product_card_price}>${price}</div>
        </div>
    );
}
