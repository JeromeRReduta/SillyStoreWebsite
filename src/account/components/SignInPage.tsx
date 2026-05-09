import type { JSX } from "react";
import { Link, useNavigate } from "react-router";
import css from "../css/sign-in.module.css";
import frontendLogger from "../../configs/frontendLogger";
import paths from "../../routing/Paths";
import frontendConfigs from "../../configs/FrontendConfigs";
import { useCookies } from "react-cookie";
import LabeledTextInput from "../../utils/components/LabeledTextInput";
import useCart from "../../store/services/useCart";
import { ICartItem } from "../../store/entities/ICartItem";
import useAuth from "../services/useAuth";
import {
    ICreateUserRequest,
    IGetUserByCredentialsRequest,
} from "../../../SillyStoreCommon/dtos/userDtos";

type SupportedMethods = "LOGIN" | "REGISTER";

function handleLoginAsync(
    loginAsync: (dto: IGetUserByCredentialsRequest) => Promise<unknown>,
) {
    return async (formData: FormData) => {
        const dto: IGetUserByCredentialsRequest = {
            email: formData.get("email") as string,
            pw: formData.get("pw") as string,
        };
        void (await loginAsync(dto));
    };
}

function handleRegisterAsync(
    registerAsync: (dto: ICreateUserRequest) => Promise<unknown>,
) {
    return async (formData: FormData) => {
        const dto: ICreateUserRequest = {
            username: formData.get("username") as string,
            email: formData.get("email") as string,
            pw: formData.get("pw") as string,
            role: "client",
        };
        void (await registerAsync(dto));
    };
}

export default function SignInPage({
    method,
}: {
    method: SupportedMethods;
}): JSX.Element {
    const { loginAsync, registerAsync } = useAuth();
    const data =
        method === "LOGIN"
            ? {
                  handleSubmit: handleLoginAsync(loginAsync),
                  labelNames: ["Email", "Password"],
                  linkToOther: (
                      <Link
                          to={frontendConfigs.absolutePaths.internal.register}
                      >
                          New? Register here.
                      </Link>
                  ),
              }
            : {
                  handleSubmit: handleRegisterAsync(registerAsync),
                  labelNames: ["Username", "Email", "Password"],
                  linkToOther: (
                      <Link to={frontendConfigs.absolutePaths.internal.login}>
                          Have an account? Login here.
                      </Link>
                  ),
              };
    const { handleSubmit, labelNames, linkToOther } = data;
    return (
        <section className={css.sign_in}>
            <form action={handleSubmit} className={css.sign_in_form}>
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
