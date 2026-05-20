import type { JSX } from "react";
import css from "./error.module.css";

export default function ErrorPage(): JSX.Element {
    return (
        <section className={css.error_page}>
            <div>
                <img
                    width="200px"
                    height="200px"
                    src="/cat-stock-img.jpg"
                    alt="stock cat photo"
                />
            </div>
            <div>You've made a routing error! Now you get stock cat photo.</div>
        </section>
    );
}
