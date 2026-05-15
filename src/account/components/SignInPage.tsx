import type { JSX } from "react";
import { Link, useNavigate } from "react-router";
import css from "../css/sign-in.module.css";
import frontendConfigs from "../../configs/FrontendConfigs";
import LabeledTextInput from "../../utils/components/LabeledTextInput";
import {
    ICreateUserRequest,
    IGetUserByCredentialsRequest,
} from "../../../SillyStoreCommon/dtos/userDtos";
import useMockSignIn from "../../../mocks/hooks/useMockSignIn";
import { MutationFunctionContext } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

type SupportedMethods = "LOGIN" | "REGISTER";

interface SignInPageData {
    readonly labelNames: string[];
    readonly linkToOther: JSX.Element;
}

export default function SignInPage({
    method,
}: {
    method: SupportedMethods;
}): JSX.Element {
    const { mutate: signIn } = useMockSignIn(method);
    const navigate = useNavigate();
    const [_cookies, setCookies, _removeCookies] = useCookies<
        "token",
        { token: string }
    >(["token"]);

    function handleSignIn(formData: FormData): void {
        const dto: ICreateUserRequest | IGetUserByCredentialsRequest = {
            username: formData.get("username") as string,
            email: formData.get("email") as string,
            pw: formData.get("name") as string,
            role: "client",
        };
        signIn(dto, {
            onSuccess: function (
                data: string,
                _variables: ICreateUserRequest | IGetUserByCredentialsRequest,
                _onMutateResult: unknown,
                _context: MutationFunctionContext,
            ): void {
                setCookies("token", data);
                void navigate(frontendConfigs.absolutePaths.internal.store);
            },
        });
    }

    const { register, login } = frontendConfigs.absolutePaths.internal;
    const { labelNames, linkToOther }: SignInPageData =
        method === "LOGIN"
            ? {
                  labelNames: ["Email", "Password"],
                  linkToOther: <Link to={register}>New? Register here.</Link>,
              }
            : {
                  labelNames: ["Username", "Email", "Password"],
                  linkToOther: (
                      <Link to={login}>Have an account? Login here.</Link>
                  ),
              };

    return (
        <section className={css.sign_in}>
            <form action={handleSignIn} className={css.sign_in_form}>
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
            <div className={css.sign_in_link_to_other}>{linkToOther}</div>
        </section>
    );
}
