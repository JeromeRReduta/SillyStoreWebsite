import type { JSX } from "react";
import css from "./nav.module.css";

export default function Nav(): JSX.Element {
    return (
        <nav className={css.layout_nav}>
            <div className={css.layout_nav_left}>LEFT</div>
            <div className={css.layout_nav_right}>RIGHT</div>
        </nav>
    );
}
