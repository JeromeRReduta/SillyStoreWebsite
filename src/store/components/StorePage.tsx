import type { JSX } from "react";
import { IProductResponse } from "../../../SillyStoreCommon/dtos/productDtos";
import frontendLogger from "../../configs/frontendLogger";
import ErrorComponent from "../../utils/components/Error";
import FlatList from "../../utils/components/FlatList";
import JustAddedBar from "../../utils/components/JustAddedBar";
import Loading from "../../utils/components/Loading";
import css from "../css/store-page.module.css";
import useCart from "../services/useCart";
import useGetAllProducts from "../services/useGetAllProducts";
import ProductCard from "./ProductCard";

export default function StorePage(): JSX.Element {
    const { data: remoteProducts, status, error } = useGetAllProducts();
    const { localCart } = useCart();
    frontendLogger.info("local cart: ", localCart);
    if (status === "error") {
        return (
            <ErrorComponent
                message={`Sorry, something went wrong: ${error.message}`}
            />
        );
    }
    if (status === "pending") {
        return <Loading message={`Loading products for you...`} />;
    }
    // success case
    return (
        <>
            <JustAddedBar />
            <FlatList
                listClassName={css.product_list}
                listItemClassName={css.product_list_item}
                data={remoteProducts}
                renderItem={(product: IProductResponse) => (
                    <ProductCard product={product} />
                )}
                keyExtractor={(product: IProductResponse) => product.id}
            />
        </>
    );
}
