import type { JSX } from "react";
import css from "./nav.module.css";
import { Link } from "react-router";
import useAuth from "../account/services/useAuth";
import frontendConfigs from "../configs/FrontendConfigs";
import { useCookies } from "react-cookie";
import frontendLogger from "../configs/frontendLogger";
import type { TokenResponse } from "../../SillyStoreCommon/dtos/responses/TokenResponse";
import JustAddedBar from "../utils/JustAddedBar";

export default function Nav(): JSX.Element {
    const [cookies, _setCookies, _removeCookies] = useCookies<
        "token",
        { token: TokenResponse }
    >(["token"]);
    frontendLogger.debug(cookies.token);
    return (
        <nav className={css.layout_nav}>
            <LeftLinks />
            <JustAddedBar />
            <RightLinks />
        </nav>
    );
}

function LeftLinks(): JSX.Element {
    return (
        <>
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
        </>
    );
}

function RightLinks(): JSX.Element {
    const { isLoggedIn, logout } = useAuth();
    const accountLinks: JSX.Element = isLoggedIn() ? (
        <>
            <Link className={css.nav_link} to="#" onClick={logout}>
                Logout
            </Link>
        </>
    ) : (
        <>
            <Link
                className={css.nav_link}
                to={frontendConfigs.absolutePaths.internal.login}
            >
                Sign In
            </Link>
        </>
    );
    return <>{accountLinks}</>;
}
