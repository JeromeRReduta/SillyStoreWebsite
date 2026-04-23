import type { JSX } from "react";
import css from "./nav.module.css";
import { Link } from "react-router";
import useAuth from "../account/services/useAuth";
import paths from "../routing/Paths";
import frontendConfigs from "../configs/FrontendConfigs";
import { useCookies } from "react-cookie";
import frontendLogger from "../configs/frontendLogger";
import type { TokenResponse } from "../../SillyStoreCommon/dtos/responses/TokenResponse";

export default function Nav(): JSX.Element {
    const { isLoggedIn } = useAuth();
    const [cookies, setCookies, removeCookies] = useCookies<
        "token",
        { token: TokenResponse }
    >(["token"]);
    frontendLogger.debug(cookies.token);
    return (
        <nav className={css.layout_nav}>
            <div className={css.layout_nav_left}>LEFT</div>
            <div className={css.layout_nav_right}>
                {isLoggedIn() ? <SignedInLinks /> : <SignedOutLinks />}
            </div>
        </nav>
    );
}

function SignedInLinks(): JSX.Element {
    const { logout } = useAuth();
    return (
        <>
            <Link className={css.nav_link} to="#" onClick={logout}>
                Logout
            </Link>
        </>
    );
}

function SignedOutLinks(): JSX.Element {
    return (
        <>
            <Link
                className={css.nav_link}
                to={frontendConfigs.absolutePaths.internal.login}
            >
                Sign In
            </Link>
        </>
    );
}
