import type { JSX } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router";
import { TokenResponse } from "../../SillyStoreCommon/dtos/userDtos";
import useAuth from "../account/services/useAuth";
import frontendConfigs from "../configs/FrontendConfigs";
import frontendLogger from "../configs/frontendLogger";
import css from "./nav.module.css";
import ShoppingCartSvg from "./shopping-cart.svg?react";

export default function Nav(): JSX.Element {
    const [cookies, _setCookies, _removeCookies] = useCookies<
        "token",
        { token: TokenResponse }
    >(["token"]);
    frontendLogger.debug(cookies.token);
    return (
        <nav className={css.layout_nav}>
            <LeftLinks />
            <RightLinks />
        </nav>
    );
}

function LeftLinks(): JSX.Element {
    return (
        <section className={css.nav_left_links}>
            <Link
                className={css.nav_link}
                to={frontendConfigs.absolutePaths.internal.store}
            >
                SILLY STORE
            </Link>
            <Link
                className={css.nav_link}
                to={frontendConfigs.absolutePaths.internal.about}
            >
                About
            </Link>
        </section>
    );
}

function RightLinks(): JSX.Element {
    const { isLoggedIn, logout } = useAuth();
    const { login, cart } = frontendConfigs.absolutePaths.internal;

    const accountLinks: JSX.Element = isLoggedIn() ? (
        <>
            <Link className={css.nav_link} to="#" onClick={logout}>
                Logout
            </Link>
        </>
    ) : (
        <>
            <Link className={css.nav_link} to={login}>
                Sign In
            </Link>
        </>
    );
    return (
        <section className={css.nav_right_links}>
            {accountLinks}
            <Link to={cart}>
                <ShoppingCartSvg
                    className={`${css.nav_link} ${css.nav_cart}`}
                />
            </Link>
        </section>
    );
}
