import { loggerEnvironment } from "tslog";
import { requireNumber } from "../../SillyStoreCommon/configs/ConfigValidation";

console.log("ENVIRONMENT", import.meta.env);
console.log(import.meta.env.VITE_MIN_LOG_LEVEL);

export interface IFrontendConfigs {
    readonly logging: {
        readonly minLogLevel: number;
    };
    readonly absolutePaths: {
        readonly internal: Record<string, string>;
        readonly external: Record<string, string>;
    };
    readonly queryKeys: Record<string, string>;
    // readonly port: number; // is defining port useful here?
}

const frontendConfigs: IFrontendConfigs = {
    logging: {
        minLogLevel: requireNumber(
            "MIN LOG LEVEL",
            import.meta.env.VITE_MIN_LOG_LEVEL,
        ),
    },
    absolutePaths: {
        internal: {
            about: "/info/about",
            store: "/",
            cart: "/checkout",
            checkoutSucess: "/checkout/success",
            lockedOut: "/no",
            login: "/accounts/login",
            register: "/accounts/register",
        },
        external: {
            portfolio: "https://jeromerreduta.netlify.app",
            github: "https://github.com/JeromeRReduta/SillyStore",
        },
    },
    queryKeys: {
        allProducts: "ALL_PRODUCTS",
        allOwnedOrders: "ALL_OWNED_ORDERS",
    },
};

export default frontendConfigs;
