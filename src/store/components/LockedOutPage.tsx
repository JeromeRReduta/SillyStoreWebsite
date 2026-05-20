import type { JSX } from "react";
import { useNavigate } from "react-router";
import FadeInElem from "../../animated/FadeInElem";
import frontendConfigs from "../../configs/FrontendConfigs";
import useWebsiteCookies from "../../utils/services/useWebsiteCookies";
import css from "../css/locked-out.module.css";

export default function LockedOutPage(): JSX.Element {
    const [{ locked_out }, _setCookie, removeCookie] = useWebsiteCookies();
    const navigate = useNavigate();

    return (
        <section className={css.locked_out}>
            <h1>WHY WOULD YOU BUY {locked_out} YOU WEIRDO</h1>
            <FadeInElem>
                <button
                    className={css.locked_out_button}
                    onClick={() => {
                        removeCookie("locked_out");
                        void navigate(
                            frontendConfigs.absolutePaths.internal.store,
                        );
                    }}
                >
                    "Ok I'm sorry, let me back in"
                </button>
            </FadeInElem>
        </section>
    );
}
