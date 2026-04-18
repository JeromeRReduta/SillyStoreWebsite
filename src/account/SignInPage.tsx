import type { JSX } from "react";
import { Link, useNavigate } from "react-router";
import css from "./sign-in.module.css";
import paths from "../routing/Paths";
import LabeledTextInput from "../utils/LabeledTextInput";

type SupportedMethods = "LOGIN" | "REGISTER";


export default function SignInPage({ method }: { method: SupportedMethods }): JSX.Element {
    const navigate = useNavigate();
    // const action: (formData: FormData) => Promise<void> = method === "LOGIN" ? loginAsync : registerAsync;
    const action: (formData: FormData) => Promise<void> = mockSignIn;
    const onSubmit: () => void = () => navigate("/" + paths.store.base);
    const labelNames: string[] = ["Email", "Username", "Password"];

    return <section className={css.sign_in}>
        <SignInForm action={action} onSubmit={onSubmit} labelNames={labelNames} />
        <LinkToOther method={method} />
    </section>

}


async function mockSignIn(formData: FormData): Promise<void> { // TODO: delete?
    console.log("signing in!");
    const entries = formData.entries();
    for (const entry of entries) {
        console.log(entry)
    }
}

interface SignInFormInfo {
    readonly action: (formData: FormData) => void | Promise<void>;
    readonly labelNames: string[];
    readonly onSubmit: () => void | Promise<void>;
}

function SignInForm({ action, labelNames, onSubmit }: SignInFormInfo): JSX.Element {
    return <form
        action={action}
        onSubmit={onSubmit}
        className={css.sign_in_form}
    >
        {labelNames.map((name) =>
            <LabeledTextInput
                label={name}
                text={name}
                autoComplete="off"
                required={true}
                key={name}
            />
        )}
        <button className={css.sign_in_submit_button}>Submit</button>
    </form >
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



