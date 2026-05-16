import { useCookies } from "react-cookie";
import css from "../css/locked-out.module.css";
import type { JSX } from "react";
import FadeInElem from "../../animated/FadeInElem";
import frontendConfigs from "../../configs/FrontendConfigs";
import { useNavigate } from "react-router";

export default function LockedOutPage(): JSX.Element {
    const [cookies, _setCookie, removeCookie] = useCookies<
        "locked_out",
        { locked_out: string }
    >(["locked_out"]);
    const navigate = useNavigate();

    const forbiddenProduct: string | undefined = cookies.locked_out;
    return (
        <section className={css.locked_out}>
            <h1>WHY WOULD YOU BUY {forbiddenProduct} YOU WEIRDO</h1>
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
