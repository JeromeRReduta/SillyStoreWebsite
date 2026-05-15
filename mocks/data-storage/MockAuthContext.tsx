import { createContext } from "react";
import { AuthContextValues } from "../../src/account/data-storage/AuthContext";

const MockAuthContext = createContext<AuthContextValues | null>(null);
export default MockAuthContext;
