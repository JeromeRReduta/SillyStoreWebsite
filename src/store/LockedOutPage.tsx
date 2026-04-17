import type { JSX } from "react";
import css from "./locked-out.module.css";

export default function LockedOutPage(): JSX.Element {
  // todo: create cookie - locked-out
  return (
    <section className={css.locked_out}>
      <h1>WHY WOULD YOU BUY UNETHICALLY SOURCED BONES YOU WEIRDO</h1>
    </section>
  );
}
