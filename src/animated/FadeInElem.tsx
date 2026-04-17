import type { JSX } from "react";
import css from "./fade-in-elem.module.css";

export default function FadeInElem({ children }: { children: JSX.Element | JSX.Element[] }): JSX.Element {
    return <div className={css.fade_in_elem}>{children}</div>
}