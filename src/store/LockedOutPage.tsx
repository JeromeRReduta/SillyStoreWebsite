import type { JSX } from "react";
import css from "./locked-out.module.css";

export default function LockedOutPage({
  forbiddenProduct,
}: {
  forbiddenProduct: "HUMAN SKIN" | "UNETHICALLY SOURCED BONES";
}): JSX.Element {
  // todo: create cookie - locked_out_skin and locked_out_bones
  return (
    <section className={css.locked_out}>
      <h1>WHY WOULD YOU BUY {forbiddenProduct} YOU WEIRDO</h1>
    </section>
  );
}
