import type { JSX } from "react";
import { Outlet } from "react-router";
import Nav from "../nav/Nav";
import css from "./base-layout.module.css";

export default function BaseLayout(): JSX.Element {
  return (
    <section className={css.layout_base}>
      <header className={css.layout_header}>
        <Nav />
      </header>
      <main className={css.layout_main}>
        <Outlet />
      </main>
    </section>
  );
}
