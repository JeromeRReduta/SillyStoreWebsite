import type { JSX } from "react";
import useGetAllProducts from "./useGetAllProducts";
import frontendLogger from "../configs/FrontendLogger";

export default function StorePage(/** TODO - props */): JSX.Element {
    const { data, status } = useGetAllProducts();
    frontendLogger.debug("DATA: ", data);
    frontendLogger.debug("STATUS: ", status);
    return <div>StorePage</div>;
}
