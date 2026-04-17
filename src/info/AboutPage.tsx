import type { JSX } from "react";
import css from "./about.module.css"
import { Link } from "react-router";
import paths from "../routing/Paths";

export default function AboutPage(): JSX.Element {
    const { external: { portfolio, github } } = paths
    return (
        <section className={css.about}>
            <div className={css.about_intro}>
                This is a fake e-commerce store made by <Link to={portfolio}>Jerome Reduta</Link>.
                It's built around the idea of a store that sells weird and frankly insane things no
                person should ever buy.
                This site lets you create an account, view items, add them to cart, and
                "check out" - since it's a fake site though there's no actual payment processing.
            </div>
            <nav className={css.about_links}>
                <Link to={github}>Source Code</Link>
                <Link to={portfolio}>Portfolio</Link>
            </nav>
        </section>
    );

}
