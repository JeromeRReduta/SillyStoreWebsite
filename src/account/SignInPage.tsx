import type { JSX } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router";
import css from "./sign-in.module.css";
import paths from "../routing/Paths";
import registerAsync from "./RegisterAsync";
import loginAsync from "./LoginAsync";
import LabeledTextInput from "../utils/LabeledTextInput";

type SupportedMethods = "LOGIN" | "REGISTER";


export default function SignInPage({ method }: { method: SupportedMethods }): JSX.Element {
    return <section className={css.sign_in}>
        <SignInForm method={method} />
        <LinkToOther method={method} />
    </section>

}

function SignInForm({ method }: { method: SupportedMethods }): JSX.Element {
    const handleSignInAsync: (formData: FormData) => Promise<void> = method === "LOGIN"
        ? loginAsync
        : registerAsync;
    return <form className={css.sign_in_form} action={async (formData) => handleSignInAsync(formData)}>
        <LabeledTextInput
            required={true}
            label="email"
            text="Email"
            autoComplete="off"
        />
        <LabeledTextInput
            required={true}
            label="username"
            text="Username"
            autoComplete="off"
        />
        <LabeledTextInput
            required={true}
            label="password"
            text="Password"
            autoComplete="off"
        />
    </form>
}

function LinkToOther({ method }: { method: SupportedMethods }): JSX.Element {
    return method === "LOGIN"
        ? <div className={css.sign_in_link_to_other}>
            New? Register <Link to={"../" + paths.account.register}>here</Link>.
        </div>
        : <div className={css.sign_in_link_to_other}>
            Have an account? Login <Link to={"../" + paths.account.login}>here</Link>.
        </div>
};



