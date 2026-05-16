import { UseMutateFunction, useQueryClient } from "@tanstack/react-query";
import type { JSX } from "react";
import { Link, useNavigate } from "react-router";
import useMockAuth from "../../../mocks/useMockAuth";
import {
    ICreateUserRequest,
    IGetUserByCredentialsRequest,
    TokenResponse,
} from "../../../SillyStoreCommon/dtos/userDtos";
import frontendConfigs from "../../configs/FrontendConfigs";
import frontendLogger from "../../configs/frontendLogger";
import LabeledTextInput from "../../utils/components/LabeledTextInput";
import css from "../css/sign-in.module.css";

type SupportedMethods = "LOGIN" | "REGISTER";

interface ISignInPageData {
    readonly labelNames: string[];
    readonly linkToOther: JSX.Element;
    readonly mutate:
        | UseMutateFunction<TokenResponse, Error, ICreateUserRequest>
        | UseMutateFunction<TokenResponse, Error, IGetUserByCredentialsRequest>;
}

export default function SignInPage({
    method,
}: {
    method: SupportedMethods;
}): JSX.Element {
    const { register, login } = useMockAuth();
    const navigate = useNavigate();

    const { register: registerPath, login: loginPath } =
        frontendConfigs.absolutePaths.internal;
    const { labelNames, linkToOther, mutate }: ISignInPageData =
        method === "LOGIN"
            ? {
                  labelNames: ["Email", "Password"],
                  linkToOther: (
                      <Link to={registerPath}>New? Register here.</Link>
                  ),
                  mutate: login,
              }
            : {
                  labelNames: ["Username", "Email", "Password"],
                  linkToOther: (
                      <Link to={loginPath}>Have an account? Login here.</Link>
                  ),
                  mutate: register,
              };

    function handleSignIn(formData: FormData): void {
        const dto: ICreateUserRequest | IGetUserByCredentialsRequest = {
            username: formData.get("username") as string,
            email: formData.get("email") as string,
            pw: formData.get("name") as string,
            role: "client",
        };
        mutate(dto, {
            onSuccess: () => {
                frontendLogger.debug("refreshing cart...");
                void navigate(frontendConfigs.absolutePaths.internal.store);
            },
        });
    }

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
