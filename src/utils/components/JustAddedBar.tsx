import type { JSX } from "react";
import css from "../css/just-added.module.css";
import useJustAdded from "../services/useJustAdded";

export default function JustAddedBar(): JSX.Element {
    const { product, serialKey } = useJustAdded();
    const message: string = product ? `Added to cart: ${product.title}` : "";
    return (
        <div key={serialKey} className={css.just_added}>
            {message}
        </div>
    );
}
