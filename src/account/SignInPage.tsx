import type { JSX } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router";
import css from "./sign-in.module.css";
import paths from "../routing/Paths";
import registerAsync from "./RegisterAsync";
import loginAsync from "./LoginAsync";

type SupportedMethods = "LOGIN" | "REGISTER";
interface SupportedCookies {
    token?: string;
}

export default function SignInPage({ method }: { method: SupportedMethods }): JSX.Element {
    // const [_cookies, setCookies, _removeCookies] = useCookies<keyof SupportedCookies, SupportedCookies>(["token"]);
    function Content(): JSX.Element {
        return method === "LOGIN"
            ? <>
                <LoginForm />
                <LinkToRegisterPage />
            </>
            : <>
                <RegisterForm />
                <LinkToLoginPage />
            </>
    }
    return <section className={css.sign_in}>
        <Content />
    </section>

}


function LoginForm(): JSX.Element {

    return <form className={css.sign_in_form} action={async (formData) => { await loginAsync(formData) }}>


    </form>
}

function LinkToRegisterPage(): JSX.Element {
    return (
        <div className={css.sign_in_link_to_other}>
            New? Register <Link to={"../" + paths.account.register}>here</Link>.
        </div>
    );
}

function RegisterForm(): JSX.Element {
    return <form className={css.sign_in_form} action={async (formData) => { await registerAsync(formData) }}>


    </form>

}

function LinkToLoginPage(): JSX.Element {
    return (
        <div className={css.sign_in_link_to_other}>
            Have an account? Login <Link to={"../" + paths.account.login}>here</Link>.
        </div>
    );
}

