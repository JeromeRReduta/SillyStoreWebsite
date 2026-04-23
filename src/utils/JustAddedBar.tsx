import type { JSX } from "react";
import useJustAdded from "./useJustAdded";
import css from "./just-added.module.css";

export default function JustAddedBar(): JSX.Element {
    const { product, serialKey } = useJustAdded();
    const message: string = product ? `Added to cart: ${product.title}` : "";
    return (
        <div key={serialKey} className={css.just_added}>
            {message}
        </div>
    );
}
