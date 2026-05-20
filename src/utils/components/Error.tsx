import type { JSX } from "react";
import css from "../css/error.module.css";

export default function ErrorComponent({
    message = "Sorry, something wrong!",
}: {
    message?: string;
}): JSX.Element {
    return (
        <section className={css.error}>
            <img
                src="/sad_bear.jpg"
                alt="sad bear bro"
                width="100px"
                height="100px"
            />
            <div>{message}</div>
        </section>
    );
}
