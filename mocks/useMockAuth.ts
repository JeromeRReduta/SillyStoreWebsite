import { useContext } from "react";
import { AuthContextValues } from "../src/account/data-storage/AuthContext";
import MockAuthContext from "./data-storage/MockAuthContext";

export default function useMockAuth(): AuthContextValues {
    const values: AuthContextValues | null = useContext(MockAuthContext);
    if (!values) {
        throw new Error("needs mock provider!");
    }
    return values;
}
