import { useContext } from "react";
import type { AuthContextValues } from "../data-storage/AuthContext";
import AuthContext from "../data-storage/AuthContext";

export default function useAuth(): AuthContextValues {
    const context: AuthContextValues | null = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth requires AuthProvider");
    }
    return context;
}
