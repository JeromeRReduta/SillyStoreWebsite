import type { JSX } from "react";
import { Link, useNavigate } from "react-router";
import css from "../css/sign-in.module.css";
import frontendLogger from "../../configs/frontendLogger";
import paths from "../../routing/Paths";
import frontendConfigs from "../../configs/FrontendConfigs";
import { useCookies } from "react-cookie";
import LabeledTextInput from "../../utils/components/LabeledTextInput";
import useCart from "../../store/services/useCart";
import mockProduct from "../../../mocks/MockProduct";
import { ICartItem } from "../../store/entities/ICartItem";

type SupportedMethods = "LOGIN" | "REGISTER";

export default function SignInPage({
    method,
}: {
    method: SupportedMethods;
}): JSX.Element {
    const { signIn, handleSubmit } = MockSignInData();
    const labelNames: string[] = ["Email", "Username", "Password"];
    return (
        <section className={css.sign_in}>
            <SignInForm
                action={signIn}
                handleSubmit={handleSubmit}
                labelNames={labelNames}
            />
            <LinkToOther method={method} />
        </section>
    );
}

function MockSignInData(): {
    signIn: (formData: FormData) => void;
    handleSubmit: () => void;
} {
    const navigate = useNavigate();
    const {
        data: cart,
        status,
        error,
    } = useCart(async () => {
        return Array.from({ length: 10 }, (_, i) => {
            return { ...mockProduct(i), quantity: i } as ICartItem;
        });
    });
    const [_cookies, setCookies, _removeCookies] = useCookies<
        "token",
        { token: "token" }
    >(["token"]);

    function signIn(formData: FormData): void {
        frontendLogger.debug("signing in!");
        const entries = formData.entries();
        for (const entry of entries) {
            frontendLogger.debug(entry);
        }
        onSignIn();
    }

    function handleSubmit(): void {
        void (async (): Promise<void> => {
            await navigate(frontendConfigs.absolutePaths.internal.store);
        })();
    }

    function onSignIn(): void {
        setCookies("token", "bababooey");
        // have auth context - when you set token cookie, run effect: update cart
    }
    return { signIn, handleSubmit };
}

interface SignInFormInfo {
    readonly action: (formData: FormData) => void | Promise<void>;
    readonly labelNames: string[];
    readonly handleSubmit: React.SubmitEventHandler<HTMLFormElement>;
}
function SignInForm({
    action,
    labelNames,
    handleSubmit,
}: SignInFormInfo): JSX.Element {
    return (
        <form
            action={action}
            onSubmit={handleSubmit}
            className={css.sign_in_form}
        >
            {labelNames.map((name) => (
                <LabeledTextInput
                    label={name}
                    text={name}
                    autoComplete="off"
                    required={true}
                    key={name}
                />
            ))}
            <button className={css.sign_in_submit_button}>Submit</button>
        </form>
    );
}

function LinkToOther({ method }: { method: SupportedMethods }): JSX.Element {
    return method === "LOGIN" ? (
        <div className={css.sign_in_link_to_other}>
            New? Register <Link to={"../" + paths.account.register}>here</Link>.
        </div>
    ) : (
        <div className={css.sign_in_link_to_other}>
            Have an account? Login{" "}
            <Link to={"../" + paths.account.login}>here</Link>.
        </div>
    );
}
